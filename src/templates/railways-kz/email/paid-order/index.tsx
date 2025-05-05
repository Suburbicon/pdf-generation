import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { TripsList } from './ui/TripsList.tsx';
import { RefundInfo } from './ui/RefundInfo.tsx';

type Props = {
  requestData: RailwaysSchema.PaidOrderRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Wrapper
      preview={`Ваши билеты по заказу ${requestData.order.number}`}
    >
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <TripsList requestData={requestData} />
      <MjmlSpacer height="24px" />
      <RefundInfo />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
