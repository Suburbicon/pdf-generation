import { Path, Svg } from '@react-pdf/renderer';
import React from 'react';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';

type Props = {
  strokeColor?: string;
};

export const WarningIcon: React.FC<Props> = ({
  strokeColor = theme.colors.yellow[600],
}) => {
  return (
    <Svg width={CSS.px(20)} height={CSS.px(20)} viewBox="0 0 20 20">
      <Path
        d="M9.99998 10.9333V7.81668"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99915 13.4375C9.88415 13.4375 9.79082 13.5308 9.79165 13.6458C9.79165 13.7608 9.88498 13.8542 9.99998 13.8542C10.115 13.8542 10.2083 13.7608 10.2083 13.6458C10.2083 13.5308 10.115 13.4375 9.99915 13.4375"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6908 3.44916L18.0733 14.6192C18.815 15.9175 17.8775 17.5333 16.3825 17.5333H3.61751C2.12167 17.5333 1.18417 15.9175 1.92667 14.6192L8.30917 3.44916C9.05667 2.13999 10.9433 2.13999 11.6908 3.44916Z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
