import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { PlaneIcon } from './PlaneIcon.tsx';
import { ClockIcon } from './ClockIcon.tsx';
import { UserIcon } from './UserIcon.tsx';
import { SupportIcon } from './SupportIcon.tsx';

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.gray[150],
    borderRadius: CSS.px(12),
    fontSize: theme.fontSize.sm,
    padding: CSS.px(24),
    gap: CSS.px(16),
  },
  note: {
    flexDirection: 'row',
    gap: CSS.px(8),
    width: '50%',
  },
  noteText: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
  },
});

type Props = {
  style?: Style;
};

export const GeneralInfo: React.FC<Props> = ({ style = {} }) => {
  const { t } = useTranslation();

  return (
    <View wrap={false} style={[styles.root, style]}>
      <View style={styles.row}>
        <View style={styles.note}>
          <ClockIcon />
          <Text style={styles.noteText}>{t('general-info.local-time')}</Text>
        </View>
        <View style={styles.note}>
          <PlaneIcon />
          <Text style={styles.noteText}>{t('general-info.checkin')}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.note}>
          <UserIcon />
          <Text style={styles.noteText}>
            {t('general-info.refund-exchange')}
          </Text>
        </View>
        <View style={styles.note}>
          <SupportIcon />
          <Text style={styles.noteText}>
            {t('general-info.support-schedule')}
          </Text>
        </View>
      </View>
    </View>
  );
};
