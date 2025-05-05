import { FastifyServerOptions } from 'fastify';

const loggerConfig = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      };
    case 'test':
      return false;
    case 'production':
      return true;
    default:
      return true;
  }
})() satisfies FastifyServerOptions['logger'];

export { loggerConfig };
