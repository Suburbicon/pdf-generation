import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { PdfTicketContextSpec } from '../types.ts';

const styles = StyleSheet.create({
  connection: {
    paddingHorizontal: CSS.px(24),
    paddingVertical: CSS.px(12),
    backgroundColor: theme.colors.yellow[200],
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    borderRadius: CSS.px(12),
  },
  connectionText: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
  },
});

type ConnectionProps = {
  connection: PdfTicketContextSpec.Segment.Connection;
} & WithStyle;

export const Connection: React.FC<ConnectionProps> = ({
  connection,
  style = {},
}) => {
  const { t } = useTranslation();

  return (
    <View wrap={false} style={[styles.connection, style]}>
      <View style={{ width: '50%' }}>
        <Text style={styles.connectionText}>
          {t('connection-in', { city: connection.city })}
        </Text>
      </View>
      <View style={{ width: '50%' }}>
        <Text style={styles.connectionText}>{connection.duration}</Text>
      </View>
      <Text style={{ marginTop: CSS.px(8), fontSize: theme.fontSize.sm }}>
        {connection.isGuaranteedByAirline
          ? t('connection-guaranteed-by-airline')
          : t('connection-self')}
      </Text>
    </View>
  );
};
