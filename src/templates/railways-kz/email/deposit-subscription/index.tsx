import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { PassengersList } from './ui/PassengersList.tsx';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Wrapper
      preview={
        requestData.type === 'INFO'
          ? `Нашли для вас места в поезде ${requestData.train.number} 🚅💚`
          : 'Внесите доплату до того, как билет сгорит 🚅🕒'
      }
    >
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <PassengersList passengersData={requestData.passengers} />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
