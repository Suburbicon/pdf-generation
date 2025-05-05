import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const ContactsSchema = z.object({
  email: z.string(),
  phone_number: z.string().optional(),
});

const StationSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const SaleStartParamsRequestSchema = z.object({
  station_from: StationSchema,
  station_to: StationSchema,
  departure_date: NaiveDatetime,
  notification_date: NaiveDatetime,
  car_variants: z.array(z.number()).optional(),
  contacts: ContactsSchema,
});

export type SaleStartParamsRequestSchemaType = z.infer<
  typeof SaleStartParamsRequestSchema
>;
