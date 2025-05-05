import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { SharedUi } from '../shared/index.tsx';

type Props = {
  requestData: RailwaysSchema.FreeSeatRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
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
    <SharedUi.Wrapper preview={`Появилось место на ${departureDate}`}>
      <SharedUi.Card sizeMode="large">
        <SharedUi.Logo />

        <MjmlSpacer height="20px" />

        <MjmlText fontSize="18px" fontWeight="bold">
          Появилось место на {departureDate}
        </MjmlText>

        <MjmlSpacer height="16px" />

        <MjmlText>
          Вы оформляли подписку на свободные места. На {departureDate} есть
          место в поезде.
        </MjmlText>

        <MjmlSpacer height="16px" />

        <MjmlText>
          Место свободно на момент отправки письма, рекомендуем поторопиться,
          пока другие не заняли.
        </MjmlText>

        <MjmlSpacer height="16px" />

        <SharedUi.Button text="Забронировать место" href={searchLink.href} />
      </SharedUi.Card>
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
