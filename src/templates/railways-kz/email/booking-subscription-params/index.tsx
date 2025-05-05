import { MjmlSpacer } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { PassengersList } from './ui/PassengersList.tsx';

type Props = {
  requestData: RailwaysSchema.BookingSubscriptionParamsRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.departure_date, {
    lng: 'ru',
    template: 'D MMMM',
  });

  return (
    <SharedUi.Wrapper
      preview={`Добавили вас в лист ожидания на ${departureDate}`}
    >
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <PassengersList passengersData={requestData.passengers} />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
