import { z } from 'zod';
import { NaiveDatetime } from '../shared.ts';

const StationSchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const FreeSeatRequestSchema = z.object({
  departure_date: NaiveDatetime,
  station_from: StationSchema,
  station_to: StationSchema,
});

export type FreeSeatRequestSchemaType = z.infer<typeof FreeSeatRequestSchema>;
