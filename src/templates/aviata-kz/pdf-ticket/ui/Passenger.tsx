import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { hyphenateName } from '~/src/shared/lib/hyphenate/index.ts';
import { PdfTicketContextSpec } from '../types.ts';

const styles = StyleSheet.create({
  root: {
    paddingVertical: CSS.px(12),
    paddingHorizontal: CSS.px(24),
    borderRadius: CSS.px(12),
    borderWidth: CSS.px(2),
    borderStyle: 'solid',
    borderColor: theme.colors.gray[150],
  },
  row: {
    flexDirection: 'row',
  },
  columnHead: {
    width: '25%',
    height: CSS.px(24),
    color: theme.colors.gray[450],
    fontSize: theme.fontSize.xs,
  },
  cell: {
    width: '25%',
    minHeight: CSS.px(24),
    fontSize: CSS.px(14),
  },
});

type PassengerProps = {
  pax: PdfTicketContextSpec.Pax.Entity;
  shouldBreakPage: boolean;
} & WithStyle;

export const Passenger: React.FC<PassengerProps> = ({
  pax,
  shouldBreakPage,
  style = {},
}) => {
  const { t } = useTranslation();

  return (
    <View break={shouldBreakPage} wrap={false} style={[styles.root, style]}>
      <View style={styles.row}>
        <Text style={styles.columnHead}>{t('pax-full-name')}</Text>
        <Text style={styles.columnHead}>{t('pax-type')}</Text>
        <Text style={styles.columnHead}>{t('pax-dob')}</Text>
        <Text style={styles.columnHead}>{t('pax-document')}</Text>
      </View>
      <View style={styles.row}>
        <Text
          style={[
            styles.cell,
            {
              paddingRight: CSS.px(8), // add extra padding to avoid visual merging of FULL NAME and PAX TYPE in case of long name
            },
          ]}
          hyphenationCallback={hyphenateName}
        >
          {pax.fullName}
        </Text>
        <Text style={styles.cell}>{pax.typeText}</Text>
        <Text style={styles.cell}>{pax.dateOfBirth}</Text>
        <Text style={styles.cell}>{pax.document}</Text>
      </View>
    </View>
  );
};
