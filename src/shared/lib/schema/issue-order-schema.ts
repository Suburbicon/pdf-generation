import { z } from 'zod';

const Passengers = z
  .object({
    base: z.string(),
    costs: z.any(),
    taxes: z.string(),
    total: z.string(),
    quantity: z.number(),
    modifiers: z.any(),
  })
  .nullable();

const Direction = z.object({
  airport_name: z.string(),
  airport_code: z.string(),
  city_name: z.string(),
  city_code: z.string(),
  at: z.object({
    iso_format: z.string(),
    formatted: z.object({
      date: z.string(),
      time: z.string(),
      translated: z.object({
        day: z.string(),
        month: z.string(),
        weekday: z.string(),
        year: z.string(),
      }),
    }),
  }),
  terminal: z.string().nullable().optional(),
});

const Segment = z.object({
  idx: z.number(),
  arr: Direction,
  dep: Direction,
  airline: z.object({
    name: z.string(),
    code: z.string(),
  }),
  display_airline: z.object({
    name: z.string(),
    code: z.string(),
  }),
  flight_number: z.string(),
  baggage: z.object({
    unit: z.string(),
    value: z.number(),
  }),
  luggage: z
    .object({
      size: z.string().nullable().optional(),
      unit: z.string(),
      value: z.number(),
    })
    .nullable(),
  baggage_formatted: z.string(),
  fare: z.object({
    basis: z.string(),
    class: z.string(),
    seats: z.number(),
  }),
  cabin: z.object({
    class: z.string(),
    details: z.array(z.string()).nullable().optional(),
  }),
  duration: z.string(),
  equipment: z.object({
    code: z.string(),
    name: z.string().nullable(),
  }),
});

export const IssueOrderSchema = z.object({
  order: z.object({
    id: z.string(),
    total: z.string(),
    total_currency: z.string(),
    email: z.string(),
    phone: z.string(),
    user_id: z.string(),
    expires_at: z.string(),
    number: z.string(),
    created_at: z.string(),
  }),
  bookings: z.array(
    z.object({
      fare_family: z.object({
        id: z.number().nullable().optional(),
        code: z.string().nullable().optional(),
        name: z.string().nullable().optional(),
        price: z
          .object({
            amount: z.string(),
            currency: z.string(),
          })
          .optional(),
        pricing: z
          .object({
            base: z.string(),
            extra: z.string(),
            taxes: z.string(),
            total: z.string(),
            currency: z.string(),
            passengers: z.object({
              ADT: Passengers,
              CHD: Passengers,
              INF: Passengers,
              YTH: Passengers,
            }),
          })
          .optional(),
        category: z.string().optional(),
        fare_basis: z.string().optional(),
        fare_class: z.string().optional(),
        descriptions: z
          .array(
            z.object({
              name: z.string(),
              type: z.string(),
              state: z.string(),
            })
          )
          .optional(),
        grouped_descriptions: z
          .object({
            INCLUDE: z.array(
              z.object({
                name: z.string(),
                type: z.string(),
                state: z.string(),
              })
            ),
            CHARGABLE: z.array(
              z.object({
                name: z.string(),
                type: z.string(),
                state: z.string(),
              })
            ),
          })
          .optional(),
      }),
      passengers: z.array(
        z.object({
          dob: z.string(),
          idx: z.number(),
          type: z.string(),
          gender: z.string(),
          prefix: z.string(),
          document: z.object({
            type: z.string(),
            number: z.string(),
            expires_at: z.string(),
          }),
          full_name: z.string(),
          last_name: z.string(),
          first_name: z.string(),
          citizenship: z.object({
            code: z.string(),
            code_alpha_3: z.string(),
          }),
          prefixed_full_name: z.string(),
        })
      ),
      validating_airlines: z.array(z.string()),
      flight_type: z.string(),
      is_domestic: z.boolean(),
      provider_reference: z.string(),
      total: z.string(),
      currency: z.string(),
      ancillaries: z.array(z.string()),
      exchanges: z.array(z.string()),
      segments: z.array(Segment),
      flights: z.array(
        z.object({
          duration: z.object({
            formatted: z.string(),
            minutes: z.number(),
          }),
          segments: z.array(Segment),
          exchange_label: z.string().nullable().optional(),
        })
      ),
      is_charter: z.boolean().nullable().optional(),
      id: z.string(),
      ticketing_at: z.string().nullable().optional(),
      warnings: z.array(z.string()).nullable().optional(),
      passengers_count: z
        .object({
          adt: z.number(),
          chd: z.number(),
          inf: z.number(),
        })
        .nullable()
        .optional(),
    })
  ),
  passengers: z.array(
    z.object({
      dob: z.string(),
      idx: z.number(),
      iin: z.string().nullable().optional(),
      type: z.string(),
      gender: z.string(),
      prefix: z.string(),
      document: z.object({
        type: z.string(),
        number: z.string(),
        expires_at: z.string(),
      }),
      full_name: z.string(),
      last_name: z.string(),
      first_name: z.string(),
      citizenship: z.object({
        code: z.string(),
        code_alpha_3: z.string(),
      }),
      prefixed_full_name: z.string(),
      ticket_documents: z.array(
        z.object({
          type: z.string(),
          number: z.string(),
          segments: z.array(z.number()),
          pricing_idx: z.number(),
          passenger_idx: z.number(),
          airline_reference: z.string().nullable().optional(),
        })
      ),
      ticket_numbers: z.string(),
      type_full: z.string(),
    })
  ),
  products: z
    .array(
      z.object({
        type: z.string().nullable().optional(),
        name: z.string(),
        total: z.string(),
        provider_reference: z.string().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
  bill: z.object({
    id: z.string(),
    number: z.string(),
    amount: z.string(),
    currency: z.string(),
    payment_provider: z.string(),
    status: z.string(),
  }),
});

export type IssueOrderSchemaType = z.infer<typeof IssueOrderSchema>;
