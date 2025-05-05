import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { PassengersList } from './ui/PassengersList.tsx';

type Props = {
  requestData: RailwaysSchema.BookingSubscriptionRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.train.departure_datetime, {
    lng: 'ru',
    template: 'D MMMM',
  });

  return (
    <SharedUi.Wrapper preview={`Забронировали вам место на ${departureDate}`}>
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <PassengersList passengersData={requestData.passengers} />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
