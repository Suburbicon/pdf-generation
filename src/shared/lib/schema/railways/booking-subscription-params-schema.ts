import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const PassengerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  document_number: z.string(),
});

const ContactsSchema = z.object({
  phone_number: z.string(),
  email: z.string(),
});

const StationSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const BookingSubscriptionParamsRequestSchema = z.object({
  station_from: StationSchema,
  station_to: StationSchema,
  departure_date: NaiveDatetime,
  train_numbers: z.array(z.string()).optional(),
  car_variants: z.array(z.number()).optional(),
  passengers: z.array(PassengerSchema),
  contacts: ContactsSchema,
});

export type BookingSubscriptionParamsRequestSchemaType = z.infer<
  typeof BookingSubscriptionParamsRequestSchema
>;
