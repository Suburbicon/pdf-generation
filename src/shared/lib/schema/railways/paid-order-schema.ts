import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const OrderSchema = z.object({
  number: z.string(),
  pdf_url: z.string(),
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

export const PaidOrderRequestSchema = z.object({
  order: OrderSchema,
  trips: z.array(TripSchema),
});

export type PaidOrderRequestSchemaType = z.infer<typeof PaidOrderRequestSchema>;
