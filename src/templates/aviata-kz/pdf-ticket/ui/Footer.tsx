import { StyleSheet, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { Message } from './Message.tsx';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: CSS.px(20),
    left: CSS.px(32),
    right: CSS.px(32),
  },
  text: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
});

export const Footer: React.FC<WithStyle> = ({ style = {} }) => {
  const { t } = useTranslation();

  return (
    <View fixed style={[styles.root, style]}>
      <Message variant="warn">{t('this-is-not-a-boarding-pass')}</Message>
    </View>
  );
};
