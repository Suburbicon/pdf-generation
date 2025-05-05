import { FastifyPluginCallback } from 'fastify';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { RailwaysEmail } from '~/src/templates/railways-kz/index.tsx';
import { registerEmailRoute } from './lib.tsx';

export const emailRoutes: FastifyPluginCallback = (fastify, options, done) => {
  registerEmailRoute<RailwaysSchema.BookingRequestSchemaType>(fastify, {
    url: '/booking/render',
    bodySchema: RailwaysSchema.BookingRequestSchema,
    renderComponent: RailwaysEmail.BookingEmail,
    description: 'new booking email render',
  });

  registerEmailRoute<RailwaysSchema.BookingSubscriptionParamsRequestSchemaType>(
    fastify,
    {
      url: '/booking-subscription-params/render',
      bodySchema: RailwaysSchema.BookingSubscriptionParamsRequestSchema,
      renderComponent: RailwaysEmail.BookingSubscriptionParamsEmail,
      description: 'booking subscription params email render',
    }
  );

  registerEmailRoute<RailwaysSchema.BookingSubscriptionRequestSchemaType>(
    fastify,
    {
      url: '/booking-subscription/render',
      bodySchema: RailwaysSchema.BookingSubscriptionRequestSchema,
      renderComponent: RailwaysEmail.BookingSubscriptionEmail,
      description: 'booking subscription notification email render',
    }
  );

  registerEmailRoute<RailwaysSchema.FreeSeatRequestSchemaType>(fastify, {
    url: '/free-seat/render',
    bodySchema: RailwaysSchema.FreeSeatRequestSchema,
    renderComponent: RailwaysEmail.FreeSeatEmail,
    description: 'free seat available notification email render',
  });

  registerEmailRoute<RailwaysSchema.PaidOrderRequestSchemaType>(fastify, {
    url: '/paid-order/render',
    bodySchema: RailwaysSchema.PaidOrderRequestSchema,
    renderComponent: RailwaysEmail.PaidOrderEmail,
    description: 'paid order email render',
  });

  registerEmailRoute<RailwaysSchema.RefundSuccessRequestSchemaType>(fastify, {
    url: '/refund-success/render',
    bodySchema: RailwaysSchema.RefundSuccessRequestSchema,
    renderComponent: RailwaysEmail.RefundSuccessEmail,
    description: 'refund success email render',
  });

  registerEmailRoute<RailwaysSchema.SaleStartRequestSchemaType>(fastify, {
    url: '/sale-start/render',
    bodySchema: RailwaysSchema.SaleStartRequestSchema,
    renderComponent: RailwaysEmail.SaleStartEmail,
    description: 'sale start notification email render',
  });

  registerEmailRoute<RailwaysSchema.SaleStartParamsRequestSchemaType>(fastify, {
    url: '/sale-start-params/render',
    bodySchema: RailwaysSchema.SaleStartParamsRequestSchema,
    renderComponent: RailwaysEmail.SaleStartParamsEmail,
    description: 'sale start params email render',
  });

  registerEmailRoute<RailwaysSchema.SurchargeRequestSchemaType>(fastify, {
    url: '/surcharge/render',
    bodySchema: RailwaysSchema.SurchargeRequestSchema,
    renderComponent: RailwaysEmail.SurchargeEmail,
    description: 'surcharge order email render',
  });

  registerEmailRoute<RailwaysSchema.DepositSubscriptionParamsRequestSchemaType>(
    fastify,
    {
      url: '/deposit-subscription-params/render',
      bodySchema: RailwaysSchema.DepositSubscriptionParamsRequestSchema,
      renderComponent: RailwaysEmail.DepositSubscriptionParamsEmail,
      description: 'deposit subscription params email render',
    }
  );

  registerEmailRoute<RailwaysSchema.DepositSubscriptionRequestSchemaType>(
    fastify,
    {
      url: '/deposit-subscription/render',
      bodySchema: RailwaysSchema.DepositSubscriptionRequestSchema,
      renderComponent: RailwaysEmail.DepositSubscriptionEmail,
      description: 'deposit subscription email render',
    }
  );

  done();
};
