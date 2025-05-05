import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { DetailsTable } from './DetailsTable.tsx';

type Props = {
  requestData: RailwaysSchema.SaleStartRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.departure_date, {
    lng: 'ru',
    template: 'D MMMM',
  });

  const searchLink = new URL('https://aviata.kz/railways/search');
  searchLink.searchParams.append('station_from', requestData.station_from.code);
  searchLink.searchParams.append('station_to', requestData.station_to.code);
  searchLink.searchParams.append(
    'departure_date',
    dateLib.format(requestData.departure_date, {
      lng: 'ru',
      template: 'DD.MM.YYYY',
    })
  );

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
        Вы оформляли подписку на старт продаж. Билеты по направлению{' '}
        {requestData.station_from.name} — {requestData.station_to.name} на{' '}
        {departureDate} уже в наличии.
      </MjmlText>

      <MjmlSpacer height="16px" />

      <MjmlText>
        Успейте занять лучшие места по выгодной цене, каждый день билеты
        дорожают.
      </MjmlText>

      <MjmlSpacer height="12px" />

      <DetailsTable requestData={requestData} />

      <MjmlSpacer height="24px" />

      <SharedUi.Button text="Найти билеты" href={searchLink.href} />
    </SharedUi.Card>
  );
};
