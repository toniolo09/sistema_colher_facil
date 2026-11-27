import { StyleSheet, Text as NativeText } from 'react-native';

import { formatMoney } from '@/lib/money';
import { colors, fonts } from '@/theme';

type MoneyTextProps = {
  value: number;
  size?: number;
  inverse?: boolean;
};

export function MoneyText({ value, size = 48, inverse = false }: MoneyTextProps) {
  const formatted = formatMoney(value);
  const commaIndex = formatted.lastIndexOf(',');
  const whole = formatted.slice(0, commaIndex);
  const cents = formatted.slice(commaIndex);

  return (
    <NativeText
      accessibilityLabel={formatted}
      style={[
        styles.whole,
        { fontSize: size, lineHeight: size * 1.15, color: inverse ? colors.white : colors.ink },
      ]}
    >
      {whole}
      <NativeText
        style={{
          fontSize: size * 0.58,
          color: inverse ? 'rgba(255,255,255,0.7)' : colors.ink3,
        }}
      >
        {cents}
      </NativeText>
    </NativeText>
  );
}

const styles = StyleSheet.create({
  whole: { fontFamily: fonts.serif },
});
