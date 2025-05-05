import {
  MjmlSpacer,
  MjmlText,
  MjmlSection,
  MjmlColumn,
} from '@faire/mjml-react';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { railwaysLib } from '~/src/shared/lib/railways.ts';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';

type Props = {
  requestData: RailwaysSchema.SaleStartRequestSchemaType;
};

export const DetailsTable: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.departure_date, {
    lng: 'ru',
    template: 'D MMMM',
  });
  const carVariants =
    requestData.car_variants
      ?.map(id => railwaysLib.getCarVariantTitle(id))
      .join(', ')
      .trim() || 'Любой';

  return (
    <>
      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Направление</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">
            {requestData.station_from.name} — {requestData.station_to.name}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSpacer height="8px" />

      <MjmlSection fullWidth>
        <MjmlColumn paddingTop="4px" width="160px">
          <MjmlText>Дата</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{departureDate}</MjmlText>
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
          <MjmlText>Электронная почта</MjmlText>
        </MjmlColumn>
        <MjmlColumn paddingTop="4px">
          <MjmlText fontWeight="bold">{requestData.contacts.email}</MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </>
  );
};
