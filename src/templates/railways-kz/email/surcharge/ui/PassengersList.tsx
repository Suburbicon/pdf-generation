import { MjmlSpacer, MjmlText } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { SharedUi } from '../../shared/index.tsx';
import { PassengerDetails } from './PassengerDetails.tsx';

type Props = {
  passengersData: RailwaysSchema.SurchargeRequestSchemaType['trips'][0]['passengers'];
};

export const PassengersList: React.FC<Props> = ({ passengersData }) => {
  return (
    <SharedUi.Card sizeMode="medium">
      <MjmlText fontSize="18px" fontWeight="bold">
        Пассажиры
      </MjmlText>

      <MjmlSpacer height="12px" />

      {passengersData.map((data, index) => (
        <>
          <PassengerDetails passengerData={data} />
          {index !== passengersData.length - 1 && <MjmlSpacer height="12px" />}
        </>
      ))}
    </SharedUi.Card>
  );
};
