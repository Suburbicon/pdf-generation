import React from 'react';
import { useTranslation } from 'react-i18next';
import { isArray, size } from 'lodash-es';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { PdfTicketContextSpec } from '../types.ts';

const styles = StyleSheet.create({
  fare: {
    flexDirection: 'row',
    fontSize: theme.fontSize.sm,
    paddingHorizontal: CSS.px(24),
    paddingTop: CSS.px(16),
    paddingBottom: CSS.px(12),
    borderWidth: CSS.px(2),
    borderColor: theme.colors.gray[150],
    borderStyle: 'solid',
    borderRadius: CSS.px(12),
  },
  columnTitle: {
    height: CSS.px(24),
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[450],
  },
});

const BulletList: React.FC<{ items: Array<string> } & WithStyle> = ({
  items,
  style = {},
}) => {
  return (
    <View style={style}>
      {items.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text>•</Text>
          <Text
            key={index}
            style={{ paddingLeft: CSS.px(4), paddingRight: CSS.px(8) }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

function getViewVariant(fare: PdfTicketContextSpec.Segment.Fare) {
  const LIMIT = 3;

  const hasAnyLimitViolation =
    size(fare.chargeableFeatures) > LIMIT ||
    size(fare.includedFeatures) > LIMIT;

  if (!hasAnyLimitViolation) {
    return 'default';
  }

  return size(fare.includedFeatures) > size(fare.chargeableFeatures)
    ? 'split-included'
    : 'split-chargeable';
}

function splitToTwoColumn(features: Array<string>) {
  const mid = features.length / 2;
  return [features.slice(0, mid), features.slice(mid)];
}

type FareInfoProps = {
  fare: PdfTicketContextSpec.Segment.Fare;
} & WithStyle;

export const FareInfo: React.FC<FareInfoProps> = ({ fare, style = {} }) => {
  const { t } = useTranslation();

  const view = getViewVariant(fare);

  switch (view) {
    case 'split-included': {
      const [left, right] = splitToTwoColumn(fare.includedFeatures ?? []);

      return (
        <View wrap={false} style={[styles.fare, style, { gap: CSS.px(24) }]}>
          <View style={{ maxWidth: '20%' }}>
            <Text style={styles.columnTitle}>{t('fare-name')}</Text>
            <Text style={{ marginTop: CSS.px(4) }}>{fare.name}</Text>
          </View>
          <View style={{ maxWidth: '55%' }}>
            <Text style={styles.columnTitle}>{t('included')}</Text>
            <View style={{ flexDirection: 'row', gap: CSS.px(10) }}>
              <BulletList style={{ width: '50%' }} items={left} />
              <BulletList style={{ width: '50%' }} items={right} />
            </View>
          </View>
          {isArray(fare.chargeableFeatures) && (
            <View style={{ maxWidth: '20%' }}>
              <Text style={styles.columnTitle}>{t('chargeable')}</Text>
              <BulletList items={fare.chargeableFeatures} />
            </View>
          )}
        </View>
      );
    }
    case 'split-chargeable': {
      const [left, right] = splitToTwoColumn(fare.chargeableFeatures ?? []);

      return (
        <View wrap={false} style={[styles.fare, style, { gap: CSS.px(24) }]}>
          <View style={{ maxWidth: '20%' }}>
            <Text style={styles.columnTitle}>{t('fare-name')}</Text>
            <Text style={{ marginTop: CSS.px(4) }}>{fare.name}</Text>
          </View>
          {isArray(fare.includedFeatures) && (
            <View style={{ maxWidth: '20%' }}>
              <Text style={styles.columnTitle}>{t('included')}</Text>
              <BulletList items={fare.includedFeatures} />
            </View>
          )}
          <View style={{ maxWidth: '50%' }}>
            <Text style={styles.columnTitle}>{t('chargeable')}</Text>
            <View style={{ flexDirection: 'row', gap: CSS.px(10) }}>
              <BulletList style={{ width: '50%' }} items={left} />
              <BulletList style={{ width: '50%' }} items={right} />
            </View>
          </View>
        </View>
      );
    }
    default:
      return (
        <View wrap={false} style={[styles.fare, style, { gap: CSS.px(24) }]}>
          <View style={{ width: '25%' }}>
            <Text style={styles.columnTitle}>{t('fare-name')}</Text>
            <Text style={{ marginTop: CSS.px(4) }}>{fare.name}</Text>
          </View>
          {isArray(fare.includedFeatures) && (
            <View style={{ width: '25%' }}>
              <Text style={styles.columnTitle}>{t('included')}</Text>
              <BulletList items={fare.includedFeatures} />
            </View>
          )}
          {isArray(fare.chargeableFeatures) && (
            <View style={{ width: '50%' }}>
              <Text style={styles.columnTitle}>{t('chargeable')}</Text>
              <BulletList items={fare.chargeableFeatures} />
            </View>
          )}
        </View>
      );
  }
};
