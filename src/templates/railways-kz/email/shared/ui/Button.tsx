import { MjmlButton } from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';

type Props = {
  href: string;
  text: string;
};

export const Button: React.FC<Props> = ({ href, text }) => {
  return (
    <MjmlButton
      href={href}
      height="48px"
      backgroundColor={theme.colors.green[600]}
      color={theme.colors.white}
      fontWeight="bold"
      borderRadius="12px"
      width="100%"
      textAlign="center"
    >
      {text}
    </MjmlButton>
  );
};
