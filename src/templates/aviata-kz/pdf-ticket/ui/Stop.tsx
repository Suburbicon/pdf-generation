import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { PdfTicketContextSpec } from '../types.ts';

const styles = StyleSheet.create({
  stop: {
    flexDirection: 'row',
    paddingRight: CSS.px(20),
  },
  duration: {
    color: theme.colors.yellow[600],
    fontSize: CSS.px(13),
    fontWeight: theme.fontWeight.bold,
  },
  city: {
    color: theme.colors.yellow[600],
    fontSize: CSS.px(13),
    fontWeight: theme.fontWeight.semibold,
  },
});

type StopProps = {
  stop: PdfTicketContextSpec.Segment.Stop;
} & WithStyle;

const chartPoint = (
  <View
    style={{
      height: CSS.px(14),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: CSS.px(20),
    }}
  >
    <View
      style={{
        width: CSS.px(14),
        height: CSS.px(14),
        backgroundColor: theme.colors.yellow[600],
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: CSS.px(10),
          height: CSS.px(10),
          backgroundColor: theme.colors.white,
          borderRadius: '50%',
        }}
      />
    </View>
  </View>
);

export const Stop: React.FC<StopProps> = ({ stop, style = {} }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.stop, style]}>
      <View style={{ width: '40%' }}>
        <Text style={styles.duration}>{stop.duration}</Text>
      </View>
      {chartPoint}
      <View style={{ width: '55%' }}>
        <Text style={styles.city}>{t('stop-in', { city: stop.city })}</Text>
      </View>
    </View>
  );
};
