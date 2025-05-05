import { MjmlRaw } from '@faire/mjml-react';
import RwLogoImage from '~/src/assets/images/rw-logo.png';
import RwLogoDarkImage from '~/src/assets/images/rw-logo-dark.png';

export const Logo: React.FC = () => {
  return (
    <MjmlRaw>
      <img
        src={RwLogoImage}
        width="160px"
        height="32px"
        style={{ display: 'block' }}
        className="lightimage"
      />
      <div className="darkimageWrapper" style={{ display: 'none' }}>
        <img
          src={RwLogoDarkImage}
          width="160px"
          height="32px"
          style={{ display: 'none' }}
          className="darkimage"
        />
      </div>
    </MjmlRaw>
  );
};
