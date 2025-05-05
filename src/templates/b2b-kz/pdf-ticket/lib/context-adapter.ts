import { TFunction } from 'i18next';
import {
  first,
  flatMap,
  groupBy,
  isNil,
  isNull,
  isString,
  isUndefined,
  last,
  map,
  partition,
  sumBy,
  uniq,
} from 'lodash-es';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { PdfTicketRequestSchemaType } from '~/src/shared/lib/schema/index.ts';
import type { AdapterWarning } from '~/src/shared/lib/adapter-context.ts';
import { AdapterContext } from '~/src/shared/lib/adapter-context.ts';
import { PdfTicketContextSpec } from '../types.ts';

dayjs.extend(durationPlugin);

type RawBooking = PdfTicketRequestSchemaType['bookings'][0];

type RawBookingFeatures = RawBooking['features'];

type RawSegment =
  PdfTicketRequestSchemaType['bookings'][0]['flights'][0]['segments'][0];

type RawFareFamily = PdfTicketRequestSchemaType['bookings'][0]['fare_family'];

type PaxType = PdfTicketRequestSchemaType['passengers'][0]['type'];

type RawSegmentLocation =
  PdfTicketRequestSchemaType['bookings'][0]['flights'][0]['segments'][0]['dep'];

type RawBaggage = NonNullable<RawSegment['baggage']['free']['ADT']>;

type Dict = PdfTicketRequestSchemaType['dict'];

type Ticket = Omit<
  PdfTicketRequestSchemaType['bookings'][0]['tickets'][0],
  'passenger_idx' | 'segments'
>;

type I18nParams = {
  t: TFunction;
  lng: string;
};

type CollectedFlight = {
  booking_id: string;
  flights: number[];
  pax_idx: number;
};
type CollectedFlights = Array<CollectedFlight>;

const KZT = '₸';

const numberFormat = Intl.NumberFormat('ru');

function formatDateOfBirth(date: string, lng: string) {
  return dateLib.format(new Date(date), {
    template: 'DD MMMM YYYY',
    lng,
  });
}

function formatTime(date: string, lng: string) {
  return dateLib.format(new Date(date), {
    template: 'HH:mm',
    lng,
  });
}

function removeTimezone(date: string) {
  return date.replace(/[+-]\d\d:\d\d$/, '');
}

function getAirportCityName(
  dict: PdfTicketRequestSchemaType['dict'],
  code: string
) {
  return dict.airports[code].city.name;
}

function serializeBaggage(baggage: RawBaggage) {
  return baggage.pc
    ? `${baggage.value} x ${baggage.pc.value} ${baggage.pc.unit}`
    : `${baggage.value} ${baggage.unit}`;
}

function getAirlineLogo(code: string) {
  return `https://aviata.kz/static/airline-logos/149x50/${code}.png`;
}

type FlightMapperMeta = {
  adapterContext: AdapterContext;
  lng: string;
  t: TFunction;
  paxType: PaxType;
  collectedFlights: CollectedFlights;
};

class FlightMapper {
  private data: PdfTicketRequestSchemaType;

  private paxType: PaxType;

  private lng: string;

  private t: TFunction;

  private dict: Dict;

  private adapterContext: AdapterContext;

  private collectedFlights: CollectedFlights;

  constructor(data: PdfTicketRequestSchemaType, meta: FlightMapperMeta) {
    this.adapterContext = meta.adapterContext;
    this.data = data;
    this.dict = data.dict;
    this.paxType = meta.paxType;
    this.lng = meta.lng;
    this.t = meta.t;
    this.collectedFlights = meta.collectedFlights;
  }

  private formatFlightDate(date: string) {
    return dateLib.format(new Date(date), {
      template: 'DD MMMM YYYY',
      lng: this.lng,
    });
  }

  private getLocation(location: RawSegmentLocation) {
    const withoutTimezone = removeTimezone(location.at);

    return {
      time: formatTime(withoutTimezone, this.lng),
      date: this.formatFlightDate(withoutTimezone),
      city: getAirportCityName(this.dict, location.airport),
      airport: this.dict.airports[location.airport].name,
      airportCode: location.airport,
      terminal: location.terminal,
    };
  }

  private getCabinClass(classType: string) {
    switch (classType) {
      case 'Economy':
        return this.t('economy-class');
      case 'Business':
        return this.t('business-class');
      default:
        return '';
    }
  }

  private getConnection(segment: RawSegment, nextSegment?: RawSegment) {
    return nextSegment
      ? {
          city: getAirportCityName(this.dict, nextSegment.dep.airport),
          duration: this.getDuration(segment.arr.at, nextSegment.dep.at),
          isGuaranteedByAirline: segment.connection?.guarantor === 'airline',
        }
      : null;
  }

  private getStops(segment: RawSegment) {
    return (
      segment.stops?.map(stop => {
        return {
          duration: this.getDuration(stop.arr_at, stop.dep_at),
          city: getAirportCityName(this.dict, stop.airport),
        };
      }) ?? null
    );
  }

  private getFare(
    fareFamily: RawFareFamily,
    features: RawBookingFeatures,
    segment: RawSegment
  ): PdfTicketContextSpec.Segment.Fare {
    const choice = fareFamily?.choices.find(
      c => c.id === fareFamily.current_id
    );

    if (choice) {
      const descriptions = groupBy(choice.descriptions, d => d.state);

      return {
        name: choice.name,
        includedFeatures: descriptions.INCLUDE?.map(d => d.name),
        chargeableFeatures: descriptions.CHARGABLE?.map(d => d.name),
      };
    }

    /**
     * @description
     * We only check if something is included unlike in mobile apps.
     * Because current design shows only "included/chargeable" features.
     * Thus we can't say that baggage can be bought later
     * or ticket may be refundded with extra payment
     */
    const base = {
      name: this.t('base-fare'),
      includedFeatures: [this.t('hand-luggage')],
    };

    const baggage = segment.baggage.free[this.paxType];

    if (!isNull(baggage) && baggage.value > 0) {
      base.includedFeatures.push(
        this.t('baggage', { value: serializeBaggage(baggage) })
      );
    }

    if (features.refundable.value) {
      base.includedFeatures.push(this.t('refundable'));
    }

    return base;
  }

  private getDuration(d1: string, d2: string) {
    const diff = dayjs(d2).diff(d1);
    const duration = dayjs.duration(diff);

    const days = duration.get('d')
      ? this.t('duration_days', { d: duration.get('d') })
      : '';
    const hours = duration.get('h')
      ? this.t('duration_hours', { h: duration.get('h') })
      : '';
    const minutes = duration.get('m')
      ? this.t('duration_minutes', { m: duration.get('m') })
      : '';

    return `${days} ${hours} ${minutes}`;
  }

  /**
   * @see https://tracker.yandex.ru/AVIATA-11441
   * @description CityTravel might return multiple PNR Numbers.
   * In this case we need to add extra space to enable automatic line break.
   * @example "XAMEQL, VNRVSC, ARAROK"
   */
  private normalizePNR(providerReference: string) {
    if (providerReference.includes(',')) {
      this.adapterContext.addWarning({
        message: 'WARN_MULTI_PNR',
      });

      return providerReference.replace(/,/g, ', ');
    }

    return providerReference;
  }

  private getBookingById(bookingId: string): RawBooking {
    const booking = this.data.bookings.find(b => b.id === bookingId);

    if (isNil(booking)) {
      throw Error('Booking is undefined');
    }

    return booking;
  }

  convert(): Array<PdfTicketContextSpec.Flight.Entity> {
    let overallSegmentIndex = 0;

    const flights = this.collectedFlights.flatMap(collectedFlight => {
      const booking = this.getBookingById(collectedFlight.booking_id);

      return collectedFlight.flights.map(flightIdx => {
        const flight = booking.flights[flightIdx];

        return {
          // @ts-expect-error flight always has segment
          orig: getAirportCityName(
            this.dict,
            first(flight.segments).dep.airport
          ),
          // @ts-expect-error flight always has segment
          dest: getAirportCityName(
            this.dict,
            last(flight.segments).arr.airport
          ),
          // @ts-expect-error flight always has segment
          firstSegmentDepAt: new Date(first(flight.segments).dep.at),

          segments: flight.segments.map((segment, i) => {
            const nextSegment = flight.segments[i + 1];
            const ticket = getTicketFromBookingByPaxIdx(
              booking,
              collectedFlight.pax_idx,
              segment.booking_segment_idx
            );
            const pnr = getPNR(ticket, booking);

            return {
              index: overallSegmentIndex++,
              ticketNumber: ticket.number,
              pnr: this.normalizePNR(pnr),
              duration: this.getDuration(segment.dep.at, segment.arr.at),
              cabinClass: this.getCabinClass(segment.cabin.class),
              flightNumber: `${segment.airline} ${segment.flight_number}`,
              isCharter: booking.is_charter,
              airlineLogoSrc: getAirlineLogo(segment.display_airline),
              fare:
                this.paxType !== 'INF'
                  ? this.getFare(booking.fare_family, booking.features, segment)
                  : undefined,
              stops: this.getStops(segment),
              connection: this.getConnection(segment, nextSegment),
              orig: this.getLocation(segment.dep),
              dest: this.getLocation(segment.arr),
            };
          }),
        };
      });
    });

    return sortFlights(flights);
  }
}

function getDataPerPax(
  data: PdfTicketRequestSchemaType,
  params: I18nParams,
  adapterContext: AdapterContext
): PdfTicketContextSpec.Entity['dataPerPax'] {
  const { lng, t } = params;

  return data.passengers.map(p => {
    const flightMapper = new FlightMapper(data, {
      adapterContext,
      paxType: p.type,
      lng,
      t,
      collectedFlights: p.collected_flights,
    });

    return {
      pax: {
        fullName: p.full_name,
        type: p.type,
        typeText: t(`pax-${p.type}`),
        dateOfBirth: formatDateOfBirth(p.dob, lng),
        document: p.document.number,
      },
      flights: flightMapper.convert(),
    };
  });
}

function renderPrice(value: number) {
  return `${numberFormat.format(value)} ${KZT}`;
}

class Pricing {
  constructor(private data: PdfTicketRequestSchemaType) {}

  private getTotal() {
    return sumBy(this.data.pricing, item =>
      item.modifiers
        ? Number(item.cost) + sumBy(item.modifiers, mod => Number(mod.amount))
        : Number(item.amount)
    );
  }

  private getTotalVAT() {
    return sumBy(this.data.pricing, item => Number(item.vat) || 0);
  }

  getPassenger(item: PdfTicketRequestSchemaType['pricing'][number]) {
    const passenger = this.data.passengers.find(pax =>
      pax.collected_flights.some(
        collectedFlight =>
          collectedFlight.booking_id === item.product_id &&
          collectedFlight.pax_idx === item.passenger_idx
      )
    );

    if (isUndefined(passenger)) {
      throw new Error('ERR_PAX_NOT_FOUND');
    }

    return passenger;
  }

  // eslint-disable-next-line class-methods-use-this
  private groupProducts(products: PdfTicketRequestSchemaType['pricing']) {
    const separateProductTypes = new Set([
      'services.exchange',
      'services.add-child',
    ]);
    const productGroups = groupBy(products, item =>
      separateProductTypes.has(item.product_type)
        ? item.product_type
        : `${item.product_type}${item.title}${item.amount}`
    );

    return Object.entries(productGroups).flatMap(([key, group]) => {
      const modifiers = groupBy(
        flatMap(group, product => product.modifiers || []),
        mod => {
          return mod.type;
        }
      );

      const formattedModifiers = Object.entries(modifiers).map(([key, val]) => {
        return {
          title: key,
          count: val.length,
          amount: renderPrice(sumBy(val, el => Number(el.amount))),
        };
      });

      if (separateProductTypes.has(key)) {
        return group.map(product => ({
          amount: renderPrice(Number(product.amount)),
          price: renderPrice(
            Number(product.modifiers ? product.cost : product.amount)
          ),
          title: product.title,
          count: 1,
          modifiers: formattedModifiers || [],
        }));
      }

      const totalAmount = sumBy(group, item =>
        Number(item.modifiers ? item.cost : item.amount)
      );

      return {
        amount: renderPrice(totalAmount),
        price: renderPrice(totalAmount / group.length),
        title: group[0].title,
        count: group.length,
        modifiers: formattedModifiers || [],
      };
    });
  }

  private groupTickets(tickets: PdfTicketRequestSchemaType['pricing']) {
    const productGroups = groupBy(tickets, item => {
      const pax = this.getPassenger(item);
      return `${pax.full_name}${pax.document.number}${item.amount}`;
    });

    return map(productGroups, group => {
      const [item] = group;

      const pax = this.getPassenger(item);

      const modifiers = groupBy(
        flatMap(group, product => product.modifiers || []),
        mod => {
          return mod.type;
        }
      );

      const formattedModifiers = Object.entries(modifiers).map(([key, val]) => {
        return {
          title: key,
          count: val.length,
          amount: renderPrice(sumBy(val, el => Number(el.amount))),
        };
      });

      return {
        title: pax.full_name,
        price: renderPrice(Number(item.modifiers ? item.cost : item.amount)),
        count: group.length,
        amount: renderPrice(
          sumBy(group, item => Number(item.modifiers ? item.cost : item.amount))
        ),
        modifiers: formattedModifiers,
      };
    });
  }

  getPricing(): PdfTicketContextSpec.Pricing.Entity {
    const { data } = this;

    const totalPrice = this.getTotal();
    const totalVAT = this.getTotalVAT();

    const [tickets, products] = partition(
      data.pricing,
      it => it.product_type === 'airflow.booking'
    );

    return {
      totalPrice: renderPrice(totalPrice),
      totalVAT: totalVAT === 0 ? null : renderPrice(totalVAT),
      tickets: this.groupTickets(tickets),
      products: this.groupProducts(products),
    };
  }
}

function getBaggage(
  data: PdfTicketRequestSchemaType
): Array<PdfTicketContextSpec.Ancillary.Baggage> {
  const { dict } = data;
  const flatSegments = data.bookings.flatMap(booking =>
    booking.flights.flatMap(f => f.segments)
  );

  return data.baggage.map(b => {
    const firstSegmentIndex = first(b.segments) as number;
    const lastSegmentIndex = last(b.segments) as number;
    const firstSegment = flatSegments[firstSegmentIndex];
    const lastSegment = flatSegments[lastSegmentIndex];
    const orig = getAirportCityName(dict, firstSegment.dep.airport);
    const dest = getAirportCityName(dict, lastSegment.arr.airport);

    return {
      passenger: data.passengers[b.passenger_idx].full_name,
      itinerary: `${orig} - ${dest}`,
      category: b.category,
      baggage: b.title,
    };
  });
}

function getLegalInfo(data: PdfTicketRequestSchemaType, params: I18nParams) {
  const entities: Array<PdfTicketContextSpec.Legal.Entity> = [];

  for (const code in data.dict.airlines) {
    const airline = data.dict.airlines[code];

    if (isString(airline.bin) && isString(airline.document_number)) {
      entities.push({
        name: params.t('legal.airline', { name: airline.name }),
        bin: airline.bin,
        document: airline.document_number,
      });
    }
  }

  return entities;
}

function convertRawRequestData(
  data: PdfTicketRequestSchemaType,
  params: I18nParams
): [PdfTicketContextSpec.Entity, Array<AdapterWarning>] {
  const adapterContext = new AdapterContext();
  const pricing = new Pricing(data);

  const converted = {
    isRT: data.bookings.some(b => b.flight_type === 'RT'),
    validatingAirlines: uniq(
      data.bookings.flatMap(b =>
        b.flights.flatMap(f => f.segments.map(s => s.display_airline))
      )
    ),
    orderNumber: data.order.number,
    dataPerPax: getDataPerPax(data, params, adapterContext),
    pricing: pricing.getPricing(),
    ancillaryBaggage: getBaggage(data),
    legalInfo: getLegalInfo(data, params),
  };

  return [converted, adapterContext.getWarnings()];
}

function getTicketFromBookingByPaxIdx(
  booking: RawBooking,
  paxIdx: number,
  bookingSegmentIndex: number
): Ticket {
  const ticket = booking.tickets.find(
    t => t.passenger_idx === paxIdx && t.segments.includes(bookingSegmentIndex)
  );

  if (ticket === undefined) {
    throw Error('Ticket is undefined');
  }

  return ticket;
}

function sortFlights(
  flights: Array<PdfTicketContextSpec.Flight.Entity>
): Array<PdfTicketContextSpec.Flight.Entity> {
  return flights.sort((first, second) => {
    return first.firstSegmentDepAt - second.firstSegmentDepAt;
  });
}

/**
 * @description KIWI provider sends own provider reference and not an airline's provider reference,
 * so we added airline_reference to ticket segment, and left provider_reference for backwards compatibility
 * @note For KIWI provider_reference is their own reference not an airline reference
 */
function getPNR(ticket: Ticket, booking: RawBooking): string {
  return ticket.airline_reference || booking.provider_reference;
}

export const contextAdapterLib = {
  convertRawRequestData,
};
