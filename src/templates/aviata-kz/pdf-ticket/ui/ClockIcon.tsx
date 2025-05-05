import { Path, Svg } from '@react-pdf/renderer';
import React from 'react';
import { CSS } from '~/src/shared/lib/css/index.ts';

export const ClockIcon: React.FC = () => {
  return (
    <Svg width={CSS.px(24)} height={CSS.px(24)} viewBox="0 0 24 24">
      <Path
        d="m16.641 16-4.922-2.936V6.736"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M18.364 5.636A9 9 0 1 1 5.636 18.364 9 9 0 0 1 18.364 5.636"
        stroke="#202122"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
};
