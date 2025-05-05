import { MjmlSection, MjmlColumn, MjmlText } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { theme } from '~/src/shared/config/aviata/theme.ts';

type Props = {
  ticketData: RailwaysSchema.RefundSuccessRequestSchemaType['trips'][0]['tickets'][0];
};

export const TicketDetails: React.FC<Props> = ({ ticketData }) => {
  const fullName = `${ticketData.last_name} ${ticketData.first_name} ${ticketData.patronymic}`;

  return (
    <MjmlSection>
      <MjmlColumn paddingTop="12px" width="60%">
        <MjmlText>{fullName}</MjmlText>
      </MjmlColumn>
      <MjmlColumn paddingTop="12px" width="40%">
        <MjmlText color={theme.colors.gray[500]}>
          {ticketData.ticket_number}
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
};
