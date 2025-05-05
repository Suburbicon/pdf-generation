import { FastifyPluginCallback } from 'fastify';
import React from 'react';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { get, snakeCase } from 'lodash-es';
import { z } from 'zod';
import { renderAsync } from '@react-email/render';
import { TENANT } from '~/src/shared/config/index.ts';
import { responseCodes } from '~/src/shared/lib/schema/index.ts';
import { B2B } from '../../templates/b2b-kz/email/index.tsx';

const HeadersSchema = z.object({
  'x-tenant': z.enum([TENANT.B2B_KZ]),
});

export const emailCommonRoute: FastifyPluginCallback = (fastify, _, done) => {
  const { statsd } = fastify;

  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: '/common/render',
    method: 'POST',
    schema: {
      tags: ['EMAIL'],
      description: 'Render customer Email receipt',
      produces: ['text/html'],
      headers: HeadersSchema,
      body: z.object({
        title: z.string(),
        text: z.string(),
        additional: z.string().optional(),
      }),
      response: {
        200: z.unknown(),
        400: responseCodes['400'],
        500: responseCodes['500'],
      },
    },
    async handler(req, reply) {
      reply.header('content-type', 'text/html');

      try {
        const getServiceEmail = (): React.ReactElement => {
          switch (req.headers['x-tenant']) {
            case TENANT.B2B_KZ:
              return (
                <B2B.CommonEmail
                  title={req.body.title}
                  text={req.body.text}
                  additional={req.body.additional}
                />
              );
            default:
              return <p>Нет писем</p>;
          }
        };
        const html = await renderAsync(getServiceEmail(), {
          pretty: __DEV__,
        });

        return reply.send(html);
      } catch (cause) {
        const message = `ERR_RENDER_EMAIL: ${
          get(cause, 'message') ?? 'unknown'
        }`;
        const error = new Error(message, { cause });

        fastify.Sentry.captureException(error, {
          tags: {
            tenant: req.headers['x-tenant'],
            request_id: req.id,
          },
        });

        return reply.send(error);
      }
    },
    onResponse(req, reply, done) {
      const endpoint = `common_email_${snakeCase(req.headers['x-tenant'])}`;
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
