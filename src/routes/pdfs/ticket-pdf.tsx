import { renderToStream } from '@react-pdf/renderer';
import { FastifyPluginCallback } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { merge, snakeCase } from 'lodash-es';
import { Aviata } from '~/src/templates/aviata-kz/index.tsx';
import { TENANT } from '~/src/shared/config/index.ts';
import { PdfTicketRequestSchema } from '~/src/shared/lib/schema/index.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import React from 'react';
import { B2B } from '~/src/templates/b2b-kz/index.tsx';

const HeadersSchema = z.object({
  'x-tenant': z.enum([TENANT.AVIATA_KZ, TENANT.B2B_KZ]),
});

export const PdfTicket: FastifyPluginCallback = (fastify, _, done) => {
  const { statsd } = fastify;

  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/ticket/render',
    method: 'POST',
    schema: {
      tags: ['PDF'],
      description: 'Render customer PDF route receipt',
      produces: ['application/pdf', 'application/json'],
      body: PdfTicketRequestSchema,
      headers: HeadersSchema,
      response: {
        200: z.unknown(),
        400: z.object({
          statusCode: z.literal(400),
          error: z.literal('Bad Request'),
          issues: z.array(
            z.object({
              code: z.string(),
              expected: z.string(),
              received: z.string(),
              path: z.array(z.string().or(z.number())),
              message: z.string(),
            })
          ),
        }),
        500: z.object({
          statusCode: z.literal(500),
          error: z.literal('Internal Server Error'),
          message: z.string(),
        }),
      },
    },
    async handler(req, reply) {
      const eventId = fastify.Sentry.captureMessage(
        'Incoming request to render pdf ticket',
        {
          tags: {
            order_number: req.body.order.number,
            tenant: req.headers['x-tenant'],
            request_id: req.id,
          },
        }
      );

      req.log.info(
        {
          /**
           * @see https://docs.sentry.io/api/organizations/resolve-an-event-id/
           */
          sentry_event_id: eventId,
          order_number: req.body.order.number,
        },
        'render pdf ticket'
      );

      const onWarning = (warning: AdapterWarning) => {
        fastify.Sentry.captureMessage(warning.message, {
          level: 'warning',
          tags: merge(
            {
              order_number: req.body.order.number,
              tenant: req.headers['x-tenant'],
              request_id: req.id,
            },
            warning.tags
          ),
        });
      };

      const getPdfDocument = (): JSX.Element => {
        switch (req.headers['x-tenant']) {
          case TENANT.AVIATA_KZ:
            return (
              <Aviata.PdfTicket
                rawData={req.body}
                i18n={req.i18n}
                onWarning={onWarning}
              />
            );
          case TENANT.B2B_KZ:
            return (
              <B2B.PdfTicket
                rawData={req.body}
                i18n={req.i18n}
                onWarning={onWarning}
              />
            );
        }
      };

      const document = getPdfDocument();

      reply.header('content-type', 'application/pdf');

      try {
        const stream = await renderToStream(document);
        return reply.send(stream);
      } catch (cause) {
        const error = new Error('ERR_RENDER_PDF_TICKET', { cause });

        fastify.Sentry.captureException(error, {
          tags: {
            order_number: req.body.order.number,
            tenant: req.headers['x-tenant'],
            request_id: req.id,
          },
        });

        return reply.send(error);
      }
    },
    onResponse(req, reply, done) {
      const endpoint = `pdf_ticket_${snakeCase(req.headers['x-tenant'])}`;
      const code = `http_${reply.statusCode}`;

      const incrementMetric = `internal.endpoint.${endpoint}.${code}.count`;
      const timingMetric = `internal.endpoint.${endpoint}.latency`;

      statsd.increment(incrementMetric);
      statsd.timing(timingMetric, Math.round(reply.getResponseTime()));

      done();
    },
  });

  done();
};
