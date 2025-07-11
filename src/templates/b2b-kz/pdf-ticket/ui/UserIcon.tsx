import React from 'react';
import { Path, Svg } from '@react-pdf/renderer';
import { CSS } from '~/src/shared/lib/css/index.ts';

export const UserIcon: React.FC = () => {
  return (
    <Svg width={CSS.px(24)} height={CSS.px(24)} viewBox="0 0 24 24">
      <Path
        d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.3639C14.8493 21.8787 9.1508 21.8787 5.6361 18.3639C2.12138 14.8492 2.12138 9.15074 5.6361 5.63604C9.15082 2.12132 14.8493 2.12132 18.364 5.63604"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M13.9891 8.32391C15.0876 9.42245 15.0876 11.2036 13.9891 12.3021C12.8906 13.4006 11.1095 13.4006 10.0109 12.3021C8.91238 11.2036 8.91238 9.42245 10.0109 8.32391C11.1095 7.22537 12.8906 7.22537 13.9891 8.32391"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M17.707 18.958C16.272 17.447 14.248 16.5 12 16.5C9.75203 16.5 7.72803 17.447 6.29303 18.959"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
