import {
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { TicketDetails } from './TicketDetails.tsx';

type Props = {
  tripData: RailwaysSchema.RefundSuccessRequestSchemaType['trips'][0];
};

export const TripDetails: React.FC<Props> = ({ tripData }) => {
  return (
    <SharedUi.Card sizeMode="medium">
      <MjmlText fontSize="18px" fontWeight="bold">
        Направление
      </MjmlText>
      <MjmlSpacer height="4px" />
      <MjmlSection>
        <MjmlColumn paddingTop="12px" width="60%">
          <MjmlText>
            {tripData.station_from_name} — {tripData.station_to_name}
          </MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="12px" width="40%">
          <MjmlText color={theme.colors.gray[500]}>
            Поезд {tripData.train_number}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <MjmlSpacer height="24px" />
      <MjmlText fontSize="18px" fontWeight="bold">
        Номер билета
      </MjmlText>
      <MjmlSpacer height="4px" />
      {tripData.tickets.map((ticketData, index) => (
        <>
          <TicketDetails ticketData={ticketData} />
          {index !== tripData.tickets.length - 1 && (
            <MjmlSpacer height="16px" />
          )}
        </>
      ))}
    </SharedUi.Card>
  );
};
