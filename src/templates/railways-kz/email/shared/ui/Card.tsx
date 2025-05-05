import { MjmlWrapper } from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';

type Props = React.PropsWithChildren & {
  sizeMode: 'large' | 'medium';
};

const SIZE_MODE_MAP: Record<
  Props['sizeMode'],
  React.ComponentProps<typeof MjmlWrapper>
> = {
  large: { padding: '24px 16px' },
  medium: { padding: '16px' },
};

export const Card: React.FC<Props> = ({ sizeMode, children }) => {
  return (
    <MjmlWrapper
      backgroundColor={theme.colors.white}
      borderRadius="12px"
      {...SIZE_MODE_MAP[sizeMode]}
    >
      {children}
    </MjmlWrapper>
  );
};
