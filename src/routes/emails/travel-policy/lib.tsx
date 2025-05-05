import { FastifyInstance } from 'fastify';
import React from 'react';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { get, snakeCase } from 'lodash-es';
import { z } from 'zod';
import { renderAsync } from '@react-email/render';
import { TENANT } from '~/src/shared/config/index.ts';
import { responseCodes } from '~/src/shared/lib/schema/index.ts';

const HeadersSchema = z.object({
  'x-tenant': z.enum([TENANT.B2B_KZ]),
});

type Options<T> = {
  url: string;
  renderComponent: React.FC<{
    data: T;
  }>;
  bodySchema: z.ZodType<T>;
  description?: string;
};

export function registerEmailRoute<T>(
  fastify: FastifyInstance,
  options: Options<T>
) {
  const { statsd } = fastify;

  fastify.withTypeProvider<ZodTypeProvider>().route({
    url: options.url,
    method: 'POST',
    schema: {
      tags: ['EMAIL'],
      description: options.description,
      produces: ['text/html'],
      headers: HeadersSchema,
      body: options.bodySchema,
      response: {
        200: z.unknown(),
        400: responseCodes['400'],
        500: responseCodes['500'],
      },
    },
    async handler(req, reply) {
      reply.header('content-type', 'text/html');

      try {
        const html = await renderAsync(
          <options.renderComponent data={req.body as T} />,
          {
            pretty: __DEV__,
          }
        );

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
      const formattedUrl = snakeCase(options.url.replaceAll('/', ' ')).trim();
      const endpoint = `${formattedUrl}_${snakeCase(req.headers['x-tenant'])}`;
      const code = `http_${reply.statusCode}`;

      const incrementMetric = `internal.endpoint.${endpoint}.${code}.count`;
      const timingMetric = `internal.endpoint.${endpoint}.latency`;

      statsd.increment(incrementMetric);
      statsd.timing(timingMetric, Math.round(reply.getResponseTime()));

      done();
    },
  });
}
