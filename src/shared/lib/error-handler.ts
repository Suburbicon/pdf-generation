import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
// @ts-expect-error - no type defs for this export
import { errorResponse } from '@immobiliarelabs/fastify-sentry/utils';

function createErrorHandler(
  app: FastifyInstance
): FastifyInstance['errorHandler'] {
  return (error, request, reply) => {
    request.log.error(error);
    reply.sentryEventId = app.Sentry.captureException(error, {
      tags: {
        request_id: request.id,
      },
    });

    if (error instanceof ZodError) {
      reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        issues: error.issues,
      });
      return;
    }

    reply.status(500);
    errorResponse(error, request, reply);
  };
}

export { createErrorHandler };
