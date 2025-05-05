import { z } from 'zod';

export const responseCodes = {
  400: z.object({
    statusCode: z.literal(400),
    error: z.literal('Bad Request'),
    issues: z.array(
      z.object({
        code: z.string(),
        expected: z.string(),
        received: z.string(),
        path: z.array(z.string().or(z.number())),
        message: z.string(),
      })
    ),
  }),
  500: z.object({
    statusCode: z.literal(500),
    error: z.literal('Internal Server Error'),
    message: z.string(),
  }),
};
