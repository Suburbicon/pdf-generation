import { FastifyPluginCallback } from 'fastify';
import {
  emailBookRoute,
  emailCommonRoute,
  emailIssueRoute,
  emailInvoiceRoute,
} from './emails/index.tsx';
import { travelPolicyRoutes } from './emails/travel-policy/index.tsx';
import { railwaysEmailRoutes } from './railways/index.tsx';

export const emailRoutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(emailCommonRoute);
  fastify.register(emailBookRoute);
  fastify.register(emailIssueRoute);
  fastify.register(travelPolicyRoutes);
  fastify.register(emailInvoiceRoute);
  fastify.register(railwaysEmailRoutes, { prefix: 'railways' });

  done();
};
