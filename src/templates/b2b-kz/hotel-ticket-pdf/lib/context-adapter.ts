import { TFunction } from 'i18next';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { AdapterContext } from '~/src/shared/lib/adapter-context.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { PdfHotelTicketRequestTypeSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { PdfHotelTicketContextSpec } from '../types.ts';

type I18nParams = {
  t: TFunction;
  lng: string;
};

function formatFullDate(date: string, lng: string) {
  return dateLib.format(new Date(date), {
    template: 'DD MMM YYYY',
    lng,
  });
}

function formatTime(date: string, lng: string) {
  return dateLib.format(new Date(date), {
    template: 'HH:mm',
    lng,
  });
}

function convertRawRequestData(
  data: PdfHotelTicketRequestTypeSchemaType,
  params: I18nParams
): [PdfHotelTicketContextSpec.Entity, Array<AdapterWarning>] {
  const adapterContext = new AdapterContext();
  const { lng, t } = params;

  const converted = {
    order: {
      number: data.order.number,
      locale: data.order.locale,
    },
    dict: data.dict,
    booking: {
      number: data.booking.number,
      hotel: {
        name: data.booking.hotel.name,
        location: data.booking.hotel.location,
        address: data.booking.hotel.address,
        amenities: data.booking.hotel.amenities,
        checkin_date: `${formatFullDate(
          data.booking.hotel.checkin_date,
          lng
        )}, c ${formatTime(data.booking.hotel.checkin_date, lng)}`,
        checkout_date: `${formatFullDate(
          data.booking.hotel.checkout_date,
          lng
        )}, до ${formatTime(data.booking.hotel.checkout_date, lng)}`,
        phone: data.booking.hotel.phone,
        country: data.booking.hotel.city
          ? data.dict.cities[data.booking.hotel.city]?.country.name
          : '',
      },
      rooms: data.booking.rooms,
    },
    guests: data.guests,
  };

  return [converted, adapterContext.getWarnings()];
}

export const contextAdapterLib = {
  convertRawRequestData,
};
