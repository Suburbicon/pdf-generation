import { z } from 'zod';

export const PdfHotelTicketRequestSchema = z.object({
  order: z.object({
    number: z.string(),
    locale: z.string().optional().nullable(),
  }),
  dict: z.object({
    cities: z.record(
      z.object({
        name: z.string(),
        country: z.object({
          name: z.string(),
        }),
      })
    ),
  }),
  booking: z.object({
    number: z.string(),
    hotel: z.object({
      name: z.string(),
      location: z
        .object({
          latitude: z.string(),
          longitude: z.string(),
        })
        .optional()
        .nullable(),
      address: z.string().optional().nullable(),
      amenities: z
        .array(
          z.object({
            type: z.string(),
            value: z.string(),
          })
        )
        .optional()
        .nullable(),
      checkin_date: z.string(),
      checkout_date: z.string(),
      phone: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
    }),
    rooms: z.array(
      z.object({
        name: z.string(),
        images: z.array(z.string()),
      })
    ),
  }),
  guests: z.array(
    z.object({
      full_name: z.string(),
      type: z.string(),
      dob: z.string(),
      document: z.object({
        number: z.string(),
      }),
    })
  ),
});

export type PdfHotelTicketRequestTypeSchemaType = z.infer<
  typeof PdfHotelTicketRequestSchema
>;
