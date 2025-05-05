import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { AviataB2BLogo } from '~/src/shared/ui/aviata-b2b-logo/index.tsx';
import { usePdfTicketContext } from '../context.tsx';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[450],
  },
  numberBadge: {
    marginTop: CSS.px(8),
    backgroundColor: theme.colors.gray[150],
    padding: CSS.px(10),
    borderRadius: CSS.px(12),
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
    fontWeight: theme.fontWeight.bold,
  },
});

export const Header: React.FC<WithStyle> = ({ style = {} }) => {
  const context = usePdfTicketContext();
  const { t } = useTranslation();

  return (
    <View fixed style={[styles.root, style]}>
      <AviataB2BLogo width={200} />
      <View>
        <Text>{t('order-number')}</Text>
        <View style={styles.numberBadge}>
          <Text>{context.orderNumber}</Text>
        </View>
      </View>
    </View>
  );
};
