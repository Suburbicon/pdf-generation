import { createContext, useContext } from 'react';
import type { PdfBusinessTripWritContextSpec } from './types.ts';

export const PdfBusinessTripWritContext =
  createContext<PdfBusinessTripWritContextSpec.Entity | null>(null);

export function usePdfBusinessTripWritContext() {
  const context = useContext(PdfBusinessTripWritContext);

  if (context === null) {
    throw new Error('PdfBusinessTripWritContext was not initialized');
  }

  return context;
}
