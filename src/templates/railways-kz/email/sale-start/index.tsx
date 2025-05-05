import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { dateLib } from '~/src/shared/lib/date/index.ts';
import { SharedUi } from '../shared/index.tsx';
import { GeneralDetails } from './ui/GeneralDetails.tsx';

type Props = {
  requestData: RailwaysSchema.SaleStartRequestSchemaType;
};

export const Email: React.FC<Props> = ({ requestData }) => {
  const departureDate = dateLib.format(requestData.departure_date, {
    lng: 'ru',
    template: 'D MMMM',
  });

  return (
    <SharedUi.Wrapper preview={`Билеты на ${departureDate} уже в продаже`}>
      <GeneralDetails requestData={requestData} />
      <MjmlSpacer height="24px" />
      <SharedUi.Footer />
    </SharedUi.Wrapper>
  );
};
