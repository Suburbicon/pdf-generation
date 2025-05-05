import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';
import mjml2html from 'mjml';
import { get, snakeCase } from 'lodash-es';
import { renderToStaticMarkup } from 'react-dom/server';
import { TENANT } from '~/src/shared/config/index.ts';

const HeadersSchema = z.object({
  'x-tenant': z.enum([TENANT.RAILWAYS_KZ]),
});

type Options<T> = {
  url: string;
  renderComponent: React.FC<{
    requestData: T;
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
      tags: ['RWS EMAIL'],
      description: options.description,
      produces: ['text/html', 'application/json'],
      body: options.bodySchema,
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
      reply.header('content-type', 'text/html');

      try {
        const mjml = renderToStaticMarkup(
          <options.renderComponent requestData={req.body as T} />
        );
        const { html } = mjml2html(mjml);

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
