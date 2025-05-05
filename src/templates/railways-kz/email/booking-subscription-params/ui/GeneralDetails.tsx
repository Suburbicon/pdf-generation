import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { DetailsTable } from './DetailsTable.tsx';

type Props = {
  requestData: RailwaysSchema.BookingSubscriptionParamsRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.departure_date, {
    lng: 'ru',
    template: 'D MMMM',
  });

  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        {requestData.station_from.name} — {requestData.station_to.name} на{' '}
        {departureDate}
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText>
        Вы оформили подписку на лист ожидания свободного места.{' '}
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText>
        Если на {departureDate} появится свободное место, мы забронируем место
        за вас — останется только оплатить.
      </MjmlText>

      <MjmlSpacer height="12px" />

      <DetailsTable requestData={requestData} />
    </SharedUi.Card>
  );
};
