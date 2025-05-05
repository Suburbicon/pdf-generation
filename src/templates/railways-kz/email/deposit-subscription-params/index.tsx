import { MjmlSpacer } from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { PassengersList } from './ui/PassengersList.tsx';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionParamsRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Wrapper
      preview={
        requestData.type === 'INFO'
          ? 'Вы оформили подписку на свободные места! 🚅🟡'
          : 'Возвращаем деньги — билетов не осталось 😥🚅'
      }
    >
      <GeneralDetails requestData={requestData} />
      {requestData.type === 'INFO' && (
        <>
          <MjmlSpacer height="24px" />
          <PassengersList passengersData={requestData.passengers} />
        </>
      )}
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
