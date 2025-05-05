import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const OrderSchema = z.object({
  number: z.string(),
  uuid: z.string(),
  price: z.number(),
  expires_at: NaiveDatetime,
});

const CarSchema = z.object({
  number: z.number(),
  variant: z.number(),
});

const PassengerSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  document_number: z.string(),
  seat_number: z.number(),
});

const TripSchema = z.object({
  train_number: z.string(),
  car: CarSchema,
  station_from_name: z.string(),
  station_to_name: z.string(),
  duration: z.string(),
  departure_datetime: NaiveDatetime,
  arrival_datetime: NaiveDatetime,
  passengers: z.array(PassengerSchema),
});

export const BookingRequestSchema = z.object({
  order: OrderSchema,
  trips: z.array(TripSchema),
});

export type BookingRequestSchemaType = z.infer<typeof BookingRequestSchema>;
