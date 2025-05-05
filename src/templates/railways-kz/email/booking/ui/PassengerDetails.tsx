import {
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';

type Props = {
  passengerData: RailwaysSchema.BookingRequestSchemaType['trips'][0]['passengers'][0];
};

export const PassengerDetails: React.FC<Props> = ({ passengerData }) => {
  const fullName = `${passengerData.last_name} ${passengerData.first_name} ${passengerData.patronymic}`;

  return (
    <MjmlSection>
      <MjmlColumn paddingTop="4px" width="60%">
        <MjmlText>{fullName}</MjmlText>

        <MjmlSpacer height="4px" />

        <MjmlText color={theme.colors.gray[500]}>
          № документа {passengerData.document_number}
        </MjmlText>
      </MjmlColumn>
      <MjmlColumn paddingTop="4px" width="40%">
        <MjmlText>Место {passengerData.seat_number}</MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
};
