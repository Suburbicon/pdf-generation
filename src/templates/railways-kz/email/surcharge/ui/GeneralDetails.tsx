import {
  MjmlSpacer,
  MjmlText,
  MjmlSection,
  MjmlColumn,
} from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { masked } from '~/src/shared/lib/mask.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '~/src/templates/railways-kz/email/shared/index.tsx';

type Props = {
  requestData: RailwaysSchema.SurchargeRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  const description =
    requestData.type === 'INFO' ? (
      <>
        <MjmlText>
          Вы внесли частичную оплату билетов, билеты и места закреплены за вами.
          Осталось оплатить остаток суммы.
        </MjmlText>
        <MjmlSpacer height="16px" />
        <MjmlText>
          Резерв билетов будет отменён, если вы не успеете оплатить остаток
          суммы. При этом, оплаченные 10% не возвращаются.
        </MjmlText>
      </>
    ) : (
      <>
        <MjmlText>
          Напоминаем, что вам нужно оплатить остаток суммы за билеты.
          {requestData.order.phone_number &&
            ` Заказ оформлен на номер телефона ${masked(
              requestData.order.phone_number,
              '+# (###) ###-##-##'
            )}.`}
        </MjmlText>
        <MjmlSpacer height="16px" />
        <MjmlText>
          Резерв билетов будет отменён, если вы не успеете оплатить остаток
          суммы. При этом, оплаченные 10% не возвращаются.
        </MjmlText>
      </>
    );

  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        Номер заказа {requestData.order.number}
      </MjmlText>
      <MjmlSpacer height="16px" />

      {description}

      <MjmlSpacer height="12px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="140px">
          <MjmlText>К оплате</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText color={theme.colors.green[600]} fontWeight="bold">
            {requestData.order.surcharge_price} ₸
          </MjmlText>
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

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="140px">
          <MjmlText>Оплачено</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">
            {requestData.order.paid_price} ₸
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
