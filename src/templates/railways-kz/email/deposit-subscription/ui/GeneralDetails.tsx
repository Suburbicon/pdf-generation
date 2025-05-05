import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { pluralize } from '@aviatakz/text-fns';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { DetailsTable } from './DetailsTable.tsx';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionRequestSchemaType;
};

export const GeneralDetails: React.FC<Props> = ({ requestData }) => {
  const expiresIn = Math.floor(requestData.order.expires_in / 3600) || 1;
  const expiresInText = `${expiresIn} ${pluralize(expiresIn, [
    'час',
    'часа',
    'часов',
  ])}`;
  const expiresAt = dateLib.format(requestData.order.expires_at, {
    lng: 'ru',
    template: 'D MMMM HH:mm',
  });

  return (
    <SharedUi.Card sizeMode="large">
      <SharedUi.Logo />

      <MjmlSpacer height="20px" />

      <MjmlText fontSize="18px" fontWeight="bold">
        {requestData.type === 'INFO'
          ? 'Места забронированы за вами, осталось только внести доплату'
          : `Держим ваше место еще ${expiresInText} — успейте доплатить за билет`}
      </MjmlText>

      <MjmlSpacer height="16px" />

      {requestData.type === 'INFO' ? (
        <MjmlText>
          Вы оформляли подписку на лист ожидания.
          <br />
          Мы забронировали для вас билеты на поезд {requestData.train.number}.
        </MjmlText>
      ) : (
        <MjmlText>
          Забронировали для вас билеты на поезд {requestData.train.number}.
          <br />
          Без доплаты оставшейся суммы билет аннулируется.
        </MjmlText>
      )}

      <MjmlSpacer height="16px" />

      <MjmlText fontWeight="bold">
        {requestData.type === 'INFO'
          ? `Теперь осталось доплатить оставшуюся сумму до ${expiresAt}.`
          : `На доплату оставшейся части осталось ${expiresInText} — до ${expiresAt}.`}
      </MjmlText>

      <MjmlSpacer height="12px" />

      <DetailsTable requestData={requestData} />

      <MjmlSpacer height="24px" />

      <SharedUi.Button
        text="Доплатить"
        href={`https://aviata.kz/railways/payments/${requestData.order.uuid}`}
      />
    </SharedUi.Card>
  );
};
