import React from 'react';
import { View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { useTranslation, Trans } from 'react-i18next';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { FreedomIcon } from './FreedomIcon.tsx';

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
  },
  noteText: {
    width: '80%',
  },
  noteAnnotation: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[400],
  },
});

type Props = {
  style?: Style;
};

export const FreedomPromo: React.FC<Props> = ({ style = {} }) => {
  const { t } = useTranslation();

  return (
    <View wrap={false} style={[styles.root, style]}>
      <View style={styles.note}>
        <FreedomIcon />
        <Text style={styles.noteText}>
          <Trans
            i18nKey="freedom.cashback.text"
            components={[<Link src={t('freedom.cashback.link')} />]}
          />
        </Text>
      </View>
      <Text style={styles.noteAnnotation}>
        {t('freedom.cashback.annotation')}
      </Text>
    </View>
  );
};
