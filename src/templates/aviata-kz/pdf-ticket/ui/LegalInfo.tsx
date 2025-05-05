import { StyleSheet, View, Text } from '@react-pdf/renderer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { PdfTicketContextSpec } from '~/src/templates/aviata-kz/pdf-ticket/types.ts';
import { usePdfTicketContext } from '../context.tsx';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: CSS.px(32),
    paddingHorizontal: CSS.px(24),
  },
  entityName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  text: {
    marginTop: CSS.px(4),
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
  },
});

type LegalEntityProps = {
  entity: PdfTicketContextSpec.Legal.Entity;
} & WithStyle;

const LegalEntity: React.FC<LegalEntityProps> = ({ entity, style = {} }) => {
  const { t } = useTranslation();

  return (
    <View wrap={false} style={[{ paddingRight: CSS.px(80) }, style]}>
      <Text style={styles.entityName}>{entity.name}</Text>
      <Text style={styles.text}>{t('legal.bin', { bin: entity.bin })}</Text>
      <Text style={styles.text}>{t('legal.account-number')}</Text>
      <Text style={styles.text}>
        {t('legal.vat', { document: entity.document })}
      </Text>
    </View>
  );
};

const BIN = '130740006278';

export const LegalInfo: React.FC<WithStyle> = ({ style = {} }) => {
  const { legalInfo } = usePdfTicketContext();
  const { t } = useTranslation();

  const aviata = {
    name: t('legal.aviata'),
    bin: BIN,
    document: t('legal.aviata-vat-document'),
  };

  return (
    <View style={[styles.root, style]}>
      <LegalEntity style={{ width: '50%' }} entity={aviata} />
      {legalInfo.map((entity, index) => (
        <LegalEntity
          key={index}
          style={{ width: '50%', marginTop: index > 0 ? CSS.px(20) : 0 }}
          entity={entity}
        />
      ))}
    </View>
  );
};
