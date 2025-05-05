import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const StationSchema = z.object({
  code: z.string(),
  name: z.string(),
});

const ContactsSchema = z.object({
  email: z.string(),
  phone_number: z.string().optional(),
});

export const SaleStartRequestSchema = z.object({
  station_from: StationSchema,
  station_to: StationSchema,
  departure_date: NaiveDatetime,
  car_variants: z.array(z.number()).optional(),
  contacts: ContactsSchema,
});

export type SaleStartRequestSchemaType = z.infer<typeof SaleStartRequestSchema>;
