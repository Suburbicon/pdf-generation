import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';

type Props = {
  requestData: RailwaysSchema.PaidOrderRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        Номер заказа {requestData.order.number}
      </MjmlText>

      <MjmlSpacer height="16px" />

      <SharedUi.Button href={requestData.order.pdf_url} text="Скачать билет" />
    </SharedUi.Card>
  );
};
