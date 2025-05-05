/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-use-before-define */

export namespace PdfHotelTicketContextSpec {
  export type Entity = {
    order: {
      number: string;
      locale?: string | null;
    };
    dict: {
      cities: Record<
        string,
        {
          name: string;
          country: {
            name: string;
          };
        }
      >;
    };
    booking: {
      number: string;
      hotel: {
        name: string;
        location?: {
          latitude: string;
          longitude: string;
        } | null;
        address?: string | null;
        amenities?:
          | {
              type: string;
              value: string;
            }[]
          | null;
        checkin_date: string;
        checkout_date: string;
        phone?: string | null;
        country?: string | null;
      };
      rooms: {
        name: string;
        images: string[];
      }[];
    };
    guests: {
      full_name: string;
      type: string;
      dob: string;
      document: {
        number: string;
      };
    }[];
  };
}
