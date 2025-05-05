import { randomUUID } from 'node:crypto';
import fastify from 'fastify';
import fastifySentry from '@immobiliarelabs/fastify-sentry';
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod';
import { i18nInstance, i18nextPlugin } from './shared/lib/i18n/index.ts';
import { emailRoutes } from './routes/email.tsx';
import { pdfRoutes } from './routes/pdf.tsx';
import { loggerConfig } from './shared/config/logger.ts';
import { fastifyEnv } from './shared/config/env.ts';
import { createErrorHandler } from './shared/lib/error-handler.ts';
import { statsdPlugin } from './shared/lib/statsd/index.ts';
import { suppressReactDevWarnings } from './shared/lib/react-warning.ts';
import { ping } from './routes/ping.tsx';
import { docs } from './routes/docs.tsx';

suppressReactDevWarnings();

const app = async () => {
  const app = fastify({
    logger: loggerConfig,
    /**
     * @description Incomming request id header used to store consistent logs between services
     */
    requestIdHeader: 'x-correlation-id',
    genReqId: () => randomUUID(),
    disableRequestLogging: !__DEV__,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  const errorHandler = createErrorHandler(app);
  app.setErrorHandler(errorHandler);

  await app.register(fastifyEnv);
  await app.register(statsdPlugin);

  /**
   * @todo https://tracker.yandex.ru/AVIATA-10879
   * 1) Update fastify-sentry, sentry/node
   * 2) Enable tracing
   * 3) Remove package.json#overrides
   */
  await app.register(fastifySentry.default, {
    dsn: app.config.SENTRY_DSN,
    environment: app.config.ENVIRONMENT,
    debug: __DEV__,
    tracesSampleRate: parseFloat(app.config.SENTRY_TRACES_SAMPLE_RATE),
    setErrorHandler: errorHandler === undefined,
  });

  await app.register(docs);
  await app.register(i18nextPlugin, { i18next: i18nInstance });
  await app.register(emailRoutes, { prefix: 'api/v1/email' });
  await app.register(pdfRoutes, { prefix: 'api/v1/pdf' });
  await app.register(ping);

  if (!__DEV__) {
    await app.listen({
      host: app.config.APP_HOST,
      port: app.config.PORT,
    });
  }

  return app;
};

export const viteNodeApp = app();
