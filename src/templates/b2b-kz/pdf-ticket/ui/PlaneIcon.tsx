import { Path, Svg } from '@react-pdf/renderer';
import React from 'react';
import { CSS } from '~/src/shared/lib/css/index.ts';

export const PlaneIcon: React.FC = () => {
  return (
    <Svg width={CSS.px(24)} height={CSS.px(24)} viewBox="0 0 24 24">
      <Path
        stroke-linecap="round"
        stroke-width="1.5"
        stroke="#202122"
        d="M2 18h7"
      />
      <Path
        stroke-linecap="round"
        stroke-width="1.5"
        stroke="#202122"
        d="M4.636 12.636 2 10l1.553-.776a.998.998 0 0 1 .894 0L6 10l3.192-1.977-4.192-4L8 3l5 3 4.707-2.69a2 2 0 0 1 2.933 1.252v0a2 2 0 0 1-.912 2.201l-8.403 5.042a1.999 1.999 0 0 1-.7.258l-5.118.853a1.004 1.004 0 0 1-.871-.28Z"
        clip-rule="evenodd"
      />
      <Path
        stroke-linecap="round"
        stroke-width="1.5"
        stroke="#202122"
        d="M17.5 22a4.5 4.5 0 0 1-4.5-4.499c0-2.434 2.07-4.503 4.504-4.501a4.5 4.5 0 0 1-.004 9"
      />
      <Path
        stroke-linecap="round"
        stroke-width="1.5"
        stroke="#202122"
        d="M19.5 16.5 17 19l-1.5-1.5"
      />
    </Svg>
  );
};
