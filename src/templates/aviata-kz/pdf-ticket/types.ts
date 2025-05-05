/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-use-before-define */

export namespace PdfTicketContextSpec {
  export type Entity = {
    orderNumber: string;
    dataPerPax: Array<{
      pax: Pax.Entity;
      flights: Array<Flight.Entity>;
    }>;
    pricing: Pricing.Entity;
    validatingAirlines: Array<string>;
    ancillaryBaggage: Array<Ancillary.Baggage>;
    isRT: boolean;
    legalInfo: Array<Legal.Entity>;
  };

  export namespace Legal {
    export type Entity = {
      name: string;
      bin: string;
      document: string;
    };
  }

  export namespace Pax {
    export type Entity = {
      fullName: string;
      type: string;
      typeText: string;
      dateOfBirth: string;
      document: string;
    };
  }

  export namespace Flight {
    export type Entity = {
      orig: string;
      dest: string;
      segments: Array<Segment.Entity>;
      firstSegmentDepAt: Date;
    };
  }

  export namespace Segment {
    export type Entity = {
      index: number;
      duration: string;
      flightNumber: string;
      cabinClass: string;
      airlineLogoSrc: string;
      stops: Array<Stop> | null;
      connection: Connection | null;
      orig: Location;
      dest: Location;
      ticketNumber: string | null;
      pnr: string;
      fare?: Fare;
      isCharter: boolean;
    };

    export type Stop = {
      city: string;
      duration: string;
    };

    export type Connection = {
      city: string;
      duration: string;
      isGuaranteedByAirline: boolean;
    };

    export type Location = {
      time: string;
      date: string;
      city: string;
      airport: string;
      airportCode: string;
      terminal: string | null;
    };

    export type Fare = {
      name: string;
      includedFeatures?: Array<string>;
      chargeableFeatures?: Array<string>;
    };
  }
  export namespace Pricing {
    export type Entity = {
      totalVAT: string | null;
      totalPrice: string;
      tickets: Array<Item>;
      products: Array<Item>;
    };

    export type Item = {
      title: string;
      price?: string;
      count: number;
      amount: string;
    };
  }

  export namespace Ancillary {
    export type Baggage = {
      passenger: string;
      itinerary: string;
      category: 'HAND_LUGGAGE' | 'BAGGAGE';
      baggage: string;
    };
  }
}
