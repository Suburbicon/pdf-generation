import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { StatsD } from 'hot-shots';

declare module 'fastify' {
  interface FastifyInstance {
    statsd: StatsD;
  }
}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const { config } = fastify;

  // eslint-disable-next-line new-cap
  const client = new StatsD({
    host: config.STATSD_HOST,
    port: config.STATSD_PORT,
    prefix: `${config.STATSD_PREFIX}.`,
  });

  fastify.decorate('statsd', client);

  done();
};

export const statsdPlugin = fp(plugin, {
  fastify: '4.x',
  name: 'fastify-statsd',
});
