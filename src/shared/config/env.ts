import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';

const schema = z.object({
  SENTRY_DSN: z.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: z.string().default('1'),
  ENVIRONMENT: z
    .enum(['production', 'staging', 'development'])
    .default('development'),
  RELEASE: z.string().describe('Use release tag').default('1.0.0'),
  APP_HOST: z
    .string()
    .describe(
      'Use 0.0.0.0 inside Docker. See https://www.fastify.io/docs/latest/Guides/Getting-Started/#note'
    )
    .default('127.0.0.1'),
  PORT: z.coerce.number().default(8000),
  STATSD_PORT: z.coerce.number().default(8125),
  STATSD_HOST: z.string().default('localhost'),
  STATSD_PREFIX: z
    .string()
    .default('platform.yeanot')
    .describe('Required statsd metric prefix. platform.{service_name}'),
});

declare module 'fastify' {
  interface FastifyInstance {
    config: z.infer<typeof schema>;
  }
}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const result = schema.safeParse(process.env);

  if (!result.success) {
    globalThis.console.table(result.error.format());
    done(new Error('Invalid environment configuration'));
    return;
  }

  if (__DEV__) {
    globalThis.console.table(result.data);
  }

  fastify.decorate('config', result.data);
  done();
};

export const fastifyEnv = fp(plugin, {
  fastify: '4.x',
  name: 'fastify-env',
});
