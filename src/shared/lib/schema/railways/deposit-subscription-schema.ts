import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const PassengerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  document_number: z.string(),
  seat_number: z.number(),
});

const ContactsSchema = z.object({
  phone_number: z.string(),
  email: z.string(),
});

const OrderSchema = z.object({
  uuid: z.string(),
  expires_at: NaiveDatetime,
  expires_in: z.number(),
});

const TrainSchema = z.object({
  station_from_name: z.string(),
  station_to_name: z.string(),
  number: z.string(),
  car_variant: z.number(),
  departure_datetime: NaiveDatetime,
});

export const DepositSubscriptionRequestSchema = z.object({
  type: z.enum(['INFO', 'WARNING']),
  order: OrderSchema,
  train: TrainSchema,
  passengers: z.array(PassengerSchema),
  contacts: ContactsSchema,
});

export type DepositSubscriptionRequestSchemaType = z.infer<
  typeof DepositSubscriptionRequestSchema
>;
