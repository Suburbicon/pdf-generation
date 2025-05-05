import { z } from 'zod';

const TicketSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  ticket_number: z.string(),
});

const TripSchema = z.object({
  station_from_name: z.string(),
  station_to_name: z.string(),
  train_number: z.string(),
  tickets: z.array(TicketSchema),
});

export const RefundSuccessRequestSchema = z.object({
  order_number: z.string(),
  trips: z.array(TripSchema),
});

export type RefundSuccessRequestSchemaType = z.infer<
  typeof RefundSuccessRequestSchema
>;
