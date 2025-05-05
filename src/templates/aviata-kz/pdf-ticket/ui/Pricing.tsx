import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { hyphenateName } from '~/src/shared/lib/hyphenate/index.ts';
import { usePdfTicketContext } from '../context.tsx';

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end',
  },
  table: {
    paddingHorizontal: CSS.px(24),
    paddingTop: CSS.px(20),
  },
  tableHeader: {
    height: CSS.px(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnHeader: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  cell: {
    fontSize: theme.fontSize.md,
    lineHeight: CSS.px(2),
  },
  totalWrapper: {
    marginTop: CSS.px(20),
    width: '50%',
    paddingRight: CSS.px(24),
  },
  separator: {
    borderTop: CSS.px(2),
    borderColor: theme.colors.black,
    marginVertical: CSS.px(15),
  },
  totalRow: {
    marginTop: CSS.px(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.lg,
  },
  vatRow: {
    marginTop: CSS.px(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vatText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
  },
});

type TableProps = {
  mainColumn: string;
  hyphenateTitle?(title: string): Array<string>;
  items: Array<{
    title: string;
    price?: string;
    count: number;
    amount: string;
  }>;
};

const Table: React.FC<TableProps> = props => {
  if (isEmpty(props.items)) {
    return null;
  }

  const { t } = useTranslation();
  const { mainColumn, items } = props;

  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <View style={{ width: '50%' }}>
          <Text style={styles.columnHeader}>{mainColumn}</Text>
        </View>
        <View style={{ width: '20%' }}>
          <Text style={styles.columnHeader}>{t('pricing.column.price')}</Text>
        </View>
        <View style={{ width: '10%', alignItems: 'center' }}>
          <Text style={styles.columnHeader}>{t('pricing.column.count')}</Text>
        </View>
        <View style={{ width: '20%', alignItems: 'flex-end' }}>
          <Text style={styles.columnHeader}>{t('pricing.column.amount')}</Text>
        </View>
      </View>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            marginTop: CSS.px(index === 0 ? 8 : 16),
            flexDirection: 'row',
          }}
        >
          <View style={{ width: '50%', paddingRight: CSS.px(20) }}>
            <Text
              style={styles.cell}
              hyphenationCallback={props.hyphenateTitle}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ width: '20%' }}>
            {item.price && <Text style={styles.cell}>{item.price}</Text>}
          </View>
          <View style={{ width: '10%', alignItems: 'center' }}>
            <Text style={styles.cell}>{item.count}</Text>
          </View>
          <View style={{ width: '20%', alignItems: 'flex-end' }}>
            <Text style={styles.cell}>{item.amount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const Pricing: React.FC<WithStyle> = ({ style = {} }) => {
  const { t } = useTranslation();
  const { pricing } = usePdfTicketContext();

  return (
    <View wrap={false} style={[styles.root, style]}>
      <Table
        mainColumn={t('pricing.column.ticket')}
        hyphenateTitle={hyphenateName}
        items={pricing.tickets}
      />
      <Table
        mainColumn={t('pricing.column.product')}
        items={pricing.products}
      />
      <View style={styles.totalWrapper}>
        <View style={styles.separator} />
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>{t('pricing.total')}</Text>
          <Text style={styles.totalText}>{pricing.totalPrice}</Text>
        </View>
        <View style={styles.vatRow}>
          <Text style={styles.vatText}>
            {pricing.totalVAT ? t('with-vat') : t('no-vat')}
          </Text>
          {pricing.totalVAT && (
            <Text style={styles.vatText}>{pricing.totalVAT}</Text>
          )}
        </View>
      </View>
    </View>
  );
};
