import { MjmlText, MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';

type Props = {
  requestData: RailwaysSchema.RefundSuccessRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        Номер заказа {requestData.order_number}
      </MjmlText>
      <MjmlSpacer height="16px" />
      <MjmlText>
        Мы получили и обработали вашу заявку на возврат билетов.
      </MjmlText>
      <MjmlSpacer height="16px" />
      <MjmlText>
        Деньги отправили на вашу карту, с которой вы оплачивали билеты, они
        поступят в течение 10 рабочих дней.
      </MjmlText>
    </SharedUi.Card>
  );
};
