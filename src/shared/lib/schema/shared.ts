import { z } from 'zod';

// unaware of timezone info datetime, ignores tz e.g. +06:00 or -0200
export const NaiveDatetime = z
  .string()
  .transform(value => value.replace(/[-+]\d{2}:\d{2}$|[+-]\d{4}$/, ''))
  .pipe(z.coerce.date());
