import {
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { prettyDuration } from '~/src/shared/lib/duration.ts';
import { railwaysLib } from '~/src/shared/lib/railways.ts';
import { SharedUi } from '../../shared/index.tsx';

type Props = {
  tripData: RailwaysSchema.BookingRequestSchemaType['trips'][0];
  tripsCount: number;
  index: number;
};

export const TripDetails: React.FC<Props> = ({
  tripData,
  tripsCount,
  index,
}) => {
  return (
    <SharedUi.Card sizeMode="medium">
      <MjmlText fontSize="18px" fontWeight="bold">
        {railwaysLib.getTrainPrefix(tripsCount, index)} {tripData.train_number}
      </MjmlText>

      <MjmlSection>
        <MjmlColumn paddingTop="12px" width="60%">
          <MjmlText>Отправление из {tripData.station_from_name}</MjmlText>

          <MjmlSpacer height="4px" />

          <MjmlText color={theme.colors.gray[500]}>
            {dateLib.format(tripData.departure_datetime, {
              lng: 'ru',
              template: 'D MMMM YYYY в HH:mm',
            })}
          </MjmlText>

          <MjmlSpacer height="12px" />

          <MjmlText>Прибытие в {tripData.station_to_name}</MjmlText>

          <MjmlSpacer height="4px" />

          <MjmlText color={theme.colors.gray[500]}>
            {dateLib.format(tripData.arrival_datetime, {
              lng: 'ru',
              template: 'D MMMM YYYY в HH:mm',
            })}
          </MjmlText>
        </MjmlColumn>

        <MjmlColumn paddingTop="12px" width="40%">
          <MjmlText>Время в пути</MjmlText>

          <MjmlSpacer height="4px" />

          <MjmlText color={theme.colors.gray[500]}>
            {prettyDuration(tripData.duration)}
          </MjmlText>

          <MjmlSpacer height="12px" />

          <MjmlText>Вагон</MjmlText>

          <MjmlSpacer height="4px" />

          <MjmlText color={theme.colors.gray[500]}>
            {tripData.car.number}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </SharedUi.Card>
  );
};
