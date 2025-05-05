import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { theme } from '~/src/shared/config/b2b/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { usePdfTicketContext } from '../context.tsx';

const styles = StyleSheet.create({
  root: {
    paddingVertical: CSS.px(20),
    paddingHorizontal: CSS.px(24),
    fontSize: theme.fontSize.md,
  },
  heading: {
    marginBottom: CSS.px(24),
    fontWeight: theme.fontWeight.semibold,
  },
  row: {
    marginTop: CSS.px(16),
    flexDirection: 'row',
  },
  columnHeader: {
    fontWeight: theme.fontWeight.semibold,
    marginBottom: CSS.px(4),
  },
});

export const AncillaryBaggage: React.FC<WithStyle> = ({ style = {} }) => {
  const { ancillaryBaggage } = usePdfTicketContext();
  const { t } = useTranslation();

  if (isEmpty(ancillaryBaggage)) {
    return null;
  }

  return (
    <View wrap={false} style={[styles.root, style]}>
      <Text style={styles.heading}>{t('ancillary-baggage.heading')}</Text>
      {ancillaryBaggage.map((value, index) => {
        return (
          <View key={index} style={styles.row}>
            <View style={{ width: '30%' }}>
              <Text style={styles.columnHeader}>
                {t('ancillary-baggage.column.pax')}
              </Text>
              <Text>{value.passenger}</Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={styles.columnHeader}>
                {t('ancillary-baggage.column.itinerary')}
              </Text>
              <Text>{value.itinerary}</Text>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={styles.columnHeader}>
                {value.category === 'HAND_LUGGAGE'
                  ? t('ancillary-baggage.column.hand-luggage')
                  : t('ancillary-baggage.column.baggage')}
              </Text>
              <Text>{value.baggage}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
