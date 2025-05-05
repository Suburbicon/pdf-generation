import { z } from 'zod';

const BaggageSchema = z
  .object({
    unit: z.string(),
    value: z.number(),
    pc: z
      .object({
        value: z.number(),
        unit: z.string(),
      })
      .optional(),
  })
  .nullable();

export const PdfTicketRequestSchema = z.object({
  order: z.object({
    number: z.string(),
  }),
  passengers: z.array(
    z.object({
      full_name: z.string(),
      type: z.enum(['ADT', 'CHD', 'INF', 'YTH']),
      dob: z.string(),
      document: z.object({
        number: z.string(),
      }),
      collected_flights: z.array(
        z.object({
          booking_id: z.string(),
          flights: z.array(z.number()),
          pax_idx: z.number(),
        })
      ),
    })
  ),
  baggage: z.array(
    z.object({
      title: z.string(),
      category: z.enum(['HAND_LUGGAGE', 'BAGGAGE']),
      passenger_idx: z.number(),
      segments: z.array(z.number()).nonempty(),
    })
  ),
  pricing: z.array(
    z.object({
      product_type: z.string(),
      product_id: z.string(),
      amount: z.string(),
      cost: z.string().optional(),
      title: z.string(),
      currency: z.string(),
      vat: z.string().nullable(),
      passenger_idx: z.number().nullable(),
      modifiers: z
        .array(
          z.object({
            type: z.string(),
            amount: z.string(),
          })
        )
        .optional(),
    })
  ),
  bookings: z.array(
    z.object({
      provider_reference: z.string(),
      flight_type: z.string(),
      features: z.object({
        refundable: z.object({
          value: z.boolean(),
        }),
      }),
      fare_family: z
        .object({
          choices: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              descriptions: z.array(
                z.object({
                  name: z.string(),
                  type: z.string(),
                  state: z.string(),
                })
              ),
            })
          ),
          current_id: z.number(),
        })
        .nullable(),
      flights: z.array(
        z.object({
          segments: z
            .array(
              z.object({
                arr: z.object({
                  at: z.string(),
                  airport: z.string(),
                  terminal: z.string().nullable(),
                }),
                dep: z.object({
                  at: z.string(),
                  airport: z.string(),
                  terminal: z.string().nullable(),
                }),
                cabin: z.object({
                  class: z.string(),
                }),
                stops: z
                  .array(
                    z.object({
                      arr_at: z.string(),
                      dep_at: z.string(),
                      airport: z.string(),
                    })
                  )
                  .optional(),
                connection: z
                  .object({
                    guarantor: z.string().nullable(),
                  })
                  .optional()
                  .nullable(),
                airline: z.string(),
                display_airline: z.string(),
                flight_number: z.string(),
                baggage: z.object({
                  free: z.object({
                    ADT: BaggageSchema,
                    CHD: BaggageSchema,
                    INF: BaggageSchema,
                    YTH: BaggageSchema,
                  }),
                }),
                booking_segment_idx: z.number(),
              })
            )
            .nonempty(),
        })
      ),
      tickets: z.array(
        z.object({
          segments: z.array(z.number()).nonempty(),
          passenger_idx: z.number(),
          number: z.string().nullable(),
          airline_reference: z.string(),
        })
      ),
      is_charter: z.boolean(),
      id: z.string(),
    })
  ),
  dict: z.object({
    cities: z.record(
      z.object({
        name: z.string(),
      })
    ),
    airlines: z.record(
      z.object({
        name: z.string(),
        bin: z.string().optional().nullable(),
        document_number: z.string().optional().nullable(),
      })
    ),
    airports: z.record(
      z.object({
        city: z.object({
          name: z.string(),
        }),
        name: z.string(),
      })
    ),
  }),
});

export type PdfTicketRequestSchemaType = z.infer<typeof PdfTicketRequestSchema>;
