import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlText,
  MjmlWrapper,
  MjmlBreakpoint,
  MjmlAttributes,
  MjmlAll,
  MjmlButton,
  MjmlTitle,
  MjmlPreview,
  MjmlStyle,
  MjmlRaw,
} from '@faire/mjml-react';
import { theme } from '~/src/shared/config/aviata/theme.ts';

type Props = React.PropsWithChildren & {
  preview: string;
};

export const Wrapper: React.FC<Props> = ({ children, preview }) => {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{preview}</MjmlTitle>
        <MjmlPreview>{preview}</MjmlPreview>
        <MjmlRaw>
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <meta name="format-detection" content="telephone=no" />
        </MjmlRaw>
        <MjmlAttributes>
          <MjmlAll padding="0" textAlign="left" />
          <MjmlText lineHeight="160%" fontSize="16px" />
          <MjmlButton fontSize="16px" />
        </MjmlAttributes>
        <MjmlBreakpoint width="500px" />
        <MjmlStyle>{`
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }

          a {
            display: block !important;
          }

          .darkimageWrapper {
            mso-hide: all;
            display: none;
          }
          
          @media (prefers-color-scheme: dark) {
            .lightimage {
              display: none !important;
            }

            .darkimageWrapper,
            .darkimage {
              display: block !important;
            }
          }
        `}</MjmlStyle>
      </MjmlHead>
      <MjmlBody backgroundColor={theme.colors.gray[150]}>
        <MjmlWrapper padding="16px">{children}</MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
};
