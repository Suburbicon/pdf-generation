import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { theme } from '~/src/shared/config/aviata/theme.ts';
import { CSS } from '~/src/shared/lib/css/index.ts';
import { WarningIcon } from './WarningIcon.tsx';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CSS.px(8),
    paddingHorizontal: CSS.px(12),
    borderRadius: CSS.px(8),
  },
  infoBg: {
    backgroundColor: theme.colors.gray[150],
  },
  warnBg: {
    backgroundColor: theme.colors.yellow[200],
  },
  text: {
    marginLeft: CSS.px(10),
    fontSize: theme.fontSize.xs,
    color: theme.colors.black,
  },
  textInfo: {
    color: theme.colors.purple[600],
  },
});

type Props = {
  style?: Style;
  variant: 'info' | 'warn';
  children: string;
};

function getVariantStyles(variant: Props['variant']) {
  switch (variant) {
    case 'info':
      return {
        bg: theme.colors.gray[150],
        color: theme.colors.purple[600],
        fw: theme.fontWeight.normal,
        iconColor: theme.colors.purple[600],
      };
    case 'warn':
      return {
        bg: theme.colors.yellow[200],
        color: theme.colors.black,
        fw: theme.fontWeight.semibold,
        iconColor: undefined,
      };
    default:
      return variant satisfies never;
  }
}

export const Message: React.FC<Props> = ({ children, style = {}, variant }) => {
  const variantStyles = getVariantStyles(variant);

  return (
    <View
      style={[
        styles.root,
        style,
        {
          backgroundColor: variantStyles.bg,
        },
      ]}
    >
      <WarningIcon strokeColor={variantStyles.iconColor} />
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.color,
            fontWeight: variantStyles.fw,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};
