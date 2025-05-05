import { z } from 'zod';

export const PdfBusinessTripWritRequestSchema = z.object({
  organization_name: z.string(),
  document_number: z.string().optional().nullable(),
  document_date: z.string(),
  employee_number: z.string().optional().nullable(),
  employee_full_name: z.string(),
  department: z.string().optional().nullable(),
  position: z.string(),
  destination: z.string(),
  duration_days: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  purpose: z.string(),
  funding_source: z.string().optional().nullable(),
  manager_position: z.string().optional().nullable(),
  per_diem: z.number().optional().nullable(),
});

export type PdfBusinessTripWritRequestSchemaType = z.infer<
  typeof PdfBusinessTripWritRequestSchema
>;
