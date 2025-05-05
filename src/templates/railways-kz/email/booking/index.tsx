import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';
import { TripsList } from './ui/TripsList.tsx';

type Props = {
  requestData: RailwaysSchema.BookingRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Wrapper
      preview={`Оплатите билеты по заказу ${requestData.order.number}`}
    >
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <TripsList requestData={requestData} />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
