import { createContext, useContext } from 'react';
import type { PdfTicketContextSpec } from './types.ts';

export const PdfTicketContext =
  createContext<PdfTicketContextSpec.Entity | null>(null);

export function usePdfTicketContext() {
  const context = useContext(PdfTicketContext);

  if (context === null) {
    throw new Error('PdfTicketContext was not initialized');
  }

  return context;
}
