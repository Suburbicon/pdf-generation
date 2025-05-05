import {
  MjmlSpacer,
  MjmlText,
  MjmlSection,
  MjmlColumn,
} from '@faire/mjml-react';
import { railwaysLib } from '~/src/shared/lib/railways.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';

type Props = {
  requestData: RailwaysSchema.DepositSubscriptionParamsRequestSchemaType;
};

export const DetailsTable: React.FC<Props> = ({ requestData }) => {
  const trainNumbers = requestData.train_numbers?.join(', ').trim() || 'Любой';
  const carVariants =
    requestData.car_variants
      ?.map(id => railwaysLib.getCarVariantTitle(id))
      .join(', ')
      .trim() || 'Любой';

  return (
    <>
      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Поезд</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{trainNumbers}</MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Тип вагона</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{carVariants}</MjmlText>
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
