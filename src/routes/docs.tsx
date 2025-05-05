import { FastifyPluginAsync } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import fp from 'fastify-plugin';

const plugin: FastifyPluginAsync = async fastify => {
  const { config } = fastify;

  if (!['development', 'staging'].includes(config.ENVIRONMENT)) {
    return;
  }

  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Yet Another Notification (Builder)',
        version: config.RELEASE,
      },
    },
    transform: jsonSchemaTransform,
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/api/docs',
  });
};

export const docs = fp(plugin);
