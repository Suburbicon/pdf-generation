import { createContext, useContext } from 'react';
import type { PdfHotelTicketContextSpec } from './types.ts';

export const PdfHotelTicketContext =
  createContext<PdfHotelTicketContextSpec.Entity | null>(null);

export function usePdfBusinessTripWritContext() {
  const context = useContext(PdfHotelTicketContext);

  if (context === null) {
    throw new Error('PdfHotelTicketContext was not initialized');
  }

  return context;
}
