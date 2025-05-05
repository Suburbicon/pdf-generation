import {
  MjmlSpacer,
  MjmlText,
  MjmlSection,
  MjmlColumn,
} from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '~/src/templates/railways-kz/email/shared/index.tsx';

type Props = {
  requestData: RailwaysSchema.BookingRequestSchemaType;
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
      <MjmlText>
        Вы забронировали билеты, оплатите их до указанного времени.
      </MjmlText>
      <MjmlSpacer height="12px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="140px">
          <MjmlText>К оплате</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText color={theme.colors.green[600]} fontWeight="bold">
            {requestData.order.price} ₸
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="140px">
          <MjmlText>Номер заказа</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{requestData.order.number}</MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="140px">
          <MjmlText>Оплатите до</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">
            {dateLib.format(requestData.order.expires_at, {
              lng: 'ru',
              template: 'HH:mm D MMMM YYYY',
            })}
          </MjmlText>
          <MjmlText color={theme.colors.gray[500]}>
            по времени г. Астана
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="24px" />

      <SharedUi.Button
        href={`https://aviata.kz/railways/payments/${requestData.order.uuid}`}
        text="Оплатить"
      />
    </SharedUi.Card>
  );
};
