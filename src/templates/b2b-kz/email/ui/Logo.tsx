import { Img } from '@react-email/components';
import React from 'react';
import B2BLogoImage from '~/src/assets/images/aviata-b2b-logo.svg';

export const Logo: React.FC = () => {
  return <Img src={B2BLogoImage} width="166" height="33" />;
};
