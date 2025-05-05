import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { TripDetails } from './TripDetails.tsx';
import { PassengersList } from './PassengersList.tsx';

type Props = {
  requestData: RailwaysSchema.PaidOrderRequestSchemaType;
};

export const TripsList: React.FC<Props> = ({ requestData }) => {
  return (
    <>
      {requestData.trips.map((tripData, index) => (
        <>
          <TripDetails
            tripData={tripData}
            tripsCount={requestData.trips.length}
            index={index}
          />
          <MjmlSpacer height="24px" />
          <PassengersList passengersData={tripData.passengers} />
          {index !== requestData.trips.length - 1 && (
            <MjmlSpacer height="24px" />
          )}
        </>
      ))}
    </>
  );
};
