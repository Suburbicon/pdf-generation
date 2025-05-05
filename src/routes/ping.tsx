import { FastifyPluginCallback } from 'fastify';

export const ping: FastifyPluginCallback = (fastify, _, done) => {
  const { statsd } = fastify;

  fastify.get(
    '/ping',
    {
      schema: {
        produces: ['text/plain'],
      },
    },
    (_, reply) => {
      statsd.increment('internal.endpoint.ping.http_200.count');
      reply.send('pong');
    }
  );

  done();
};
