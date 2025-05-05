import {
  MjmlSpacer,
  MjmlText,
  MjmlSection,
  MjmlColumn,
} from '@faire/mjml-react';
import { railwaysLib } from '~/src/shared/lib/railways.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionRequestSchemaType;
};

export const DetailsTable: React.FC<Props> = ({ requestData }) => {
  return (
    <>
      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Поезд</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{requestData.train.number}</MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Тип вагона</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">
            {railwaysLib.getCarVariantTitle(requestData.train.car_variant)}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Телефон</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">
            {requestData.contacts.phone_number}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Электронная почта</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{requestData.contacts.email}</MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </>
  );
};
