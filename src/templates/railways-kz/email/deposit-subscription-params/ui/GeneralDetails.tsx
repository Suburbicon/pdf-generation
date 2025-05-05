import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { DetailsTable } from './DetailsTable.tsx';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionParamsRequestSchemaType;
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
        {requestData.type === 'INFO'
          ? `Уже ищем билеты на ${departureDate}, ${requestData.station_from.name} — ${requestData.station_to.name}`
          : `Нет свободных мест на ${departureDate}, ${requestData.station_from.name} — ${requestData.station_to.name}`}
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText>
        {requestData.type === 'INFO'
          ? 'Вы оформили подписку на свободные места.'
          : 'Вы оформляли подписку на свободные места. Места не освободились, поэтому мы возвращаем вашу предоплату на тот же счет.'}
      </MjmlText>
      <MjmlSpacer height="16px" />

      <MjmlText>
        {requestData.type === 'INFO'
          ? 'Как только появятся места на поезд, мы забронируем билеты и напишем вам 📨'
          : 'Попробуйте поискать ж/д билеты на соседние даты.'}
      </MjmlText>

      <MjmlSpacer height="12px" />

      {requestData.type === 'INFO' ? (
        <DetailsTable requestData={requestData} />
      ) : (
        <SharedUi.Button
          text="Искать билеты"
          href={'https://aviata.kz/railways/'}
        />
      )}
    </SharedUi.Card>
  );
};
