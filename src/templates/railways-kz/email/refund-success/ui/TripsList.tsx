import { MjmlSpacer } from '@faire/mjml-react';
import { RailwaysSchema } from '~/src/shared/lib/schema/index.ts';
import { TripDetails } from './TripDetails.tsx';

type Props = {
  requestData: RailwaysSchema.RefundSuccessRequestSchemaType;
};

export const TripsList: React.FC<Props> = ({ requestData }) => {
  return (
    <>
      {requestData.trips.map((tripData, index) => (
        <>
          <TripDetails tripData={tripData} />
          {index !== requestData.trips.length - 1 && (
            <MjmlSpacer height="24px" />
          )}
        </>
      ))}
    </>
  );
};
