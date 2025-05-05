import { FastifyPluginCallback } from 'fastify';
import {
  PdfBusinessTripWrit,
  PdfTicket,
  PdfHotelTicket,
} from './pdfs/index.tsx';

export const pdfRoutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(PdfBusinessTripWrit);
  fastify.register(PdfTicket);
  fastify.register(PdfHotelTicket);

  done();
};
