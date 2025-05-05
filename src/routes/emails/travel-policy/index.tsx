import { FastifyPluginCallback } from 'fastify';
import { TravelPolicySchema } from '~/src/shared/lib/schema/index.ts';
import { registerEmailRoute } from './lib.tsx';
import { B2B } from '../../../templates/b2b-kz/email/index.tsx';

export const travelPolicyRoutes: FastifyPluginCallback = (fastify, _, done) => {
  registerEmailRoute<TravelPolicySchema.TravelPolicyCreateSchemaType>(fastify, {
    url: '/travel-policy/create/render',
    bodySchema: TravelPolicySchema.TravelPolicyCreateSchema,
    renderComponent: B2B.TravelPolicyCreateEmail,
    description: 'Render customer Email receipt for create travel policy',
  });

  registerEmailRoute<TravelPolicySchema.TravelPolicyApprovalSchemaType>(
    fastify,
    {
      url: '/travel-policy/approval/render',
      bodySchema: TravelPolicySchema.TravelPolicyApprovalSchema,
      renderComponent: B2B.TravelPolicyApprovalEmail,
      description: 'Render customer Email receipt for approval travel policy',
    }
  );

  registerEmailRoute<TravelPolicySchema.TravelPolicyAddingSchemaType>(fastify, {
    url: '/travel-policy/add-user/render',
    bodySchema: TravelPolicySchema.TravelPolicyAddingSchema,
    renderComponent: B2B.TravelPolicyAddingEmail,
    description:
      'Render customer Email receipt for adding user to travel policy',
  });

  registerEmailRoute<TravelPolicySchema.TravelPolicySendingSchemaType>(
    fastify,
    {
      url: '/travel-policy/send-user/render',
      bodySchema: TravelPolicySchema.TravelPolicySendingSchema,
      renderComponent: B2B.TravelPolicySendingEmail,
      description:
        'Render customer Email receipt for send travel policy to user',
    }
  );

  registerEmailRoute<TravelPolicySchema.TravelPolicyApprovedSchemaType>(
    fastify,
    {
      url: '/travel-policy/approved/render',
      bodySchema: TravelPolicySchema.TravelPolicyApprovedSchema,
      renderComponent: B2B.TravelPolicyApprovedEmail,
      description:
        'Render customer Email receipt for show who approved travel policy',
    }
  );

  registerEmailRoute<TravelPolicySchema.TravelPolicyRejectedSchemaType>(
    fastify,
    {
      url: '/travel-policy/rejected/render',
      bodySchema: TravelPolicySchema.TravelPolicyRejectedSchema,
      renderComponent: B2B.TravelPolicyRejectedEmail,
      description:
        'Render customer Email receipt for show who rejected travel policy',
    }
  );

  done();
};
