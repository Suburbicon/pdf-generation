import React from 'react';
import { Path, Svg } from '@react-pdf/renderer';
import { CSS } from '~/src/shared/lib/css/index.ts';

export const SupportIcon: React.FC = () => {
  return (
    <Svg width={CSS.px(24)} height={CSS.px(24)} viewBox="0 0 24 24">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 17H18C17.448 17 17 16.552 17 16V11C17 10.448 17.448 10 18 10H19C20.105 10 21 10.895 21 12V15C21 16.105 20.105 17 19 17Z"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 17H5C3.895 17 3 16.105 3 15V12C3 10.895 3.895 10 5 10H6C6.552 10 7 10.448 7 11V16C7 16.552 6.552 17 6 17Z"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.5 10V9.5C18.5 5.91 15.59 3 12 3V3C8.41 3 5.5 5.91 5.5 9.5V10"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.625 21.25H11.375C10.685 21.25 10.125 20.69 10.125 20V20C10.125 19.31 10.685 18.75 11.375 18.75H12.625C13.315 18.75 13.875 19.31 13.875 20V20C13.875 20.69 13.315 21.25 12.625 21.25Z"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.875 20H16C17.105 20 18 19.105 18 18V17"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
