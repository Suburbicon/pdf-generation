import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { DetailsTable } from './DetailsTable.tsx';

type Props = {
  requestData: RailwaysSchema.BookingSubscriptionRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.train.departure_datetime, {
    lng: 'ru',
    template: 'D MMMM',
  });
  const expiresAt = dateLib.format(requestData.order.expires_at, {
    lng: 'ru',
    template: 'HH:mm',
  });

  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        {requestData.train.station_from_name} —{' '}
        {requestData.train.station_to_name} на {departureDate}
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText>
        Вы оформляли подписку на лист ожидания свободного места.
        <br />
        Появилось место в поезде 051Х и мы забронировали его для вас.
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText fontWeight="bold">
        Бронь нужно оплатить до {expiresAt}, потом она отменится.
      </MjmlText>

      <MjmlSpacer height="12px" />

      <DetailsTable requestData={requestData} />

      <MjmlSpacer height="24px" />

      <SharedUi.Button
        text="Оплатить бронь"
        href={`https://aviata.kz/railways/payments/${requestData.order.uuid}`}
      />
    </SharedUi.Card>
  );
};
