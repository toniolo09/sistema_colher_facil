import type { ReactNode } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, textStyles } from '@/theme';

import { Text } from './Text';

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  trailing?: ReactNode;
};

export function Field({ label, error, trailing, style, ...inputProps }: FieldProps) {
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <Text variant="caption">{label}</Text>
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.ink3}
          style={[textStyles.body, styles.input, style]}
          {...inputProps}
        />
        {error && (
          <Text variant="caption" style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  main: { flex: 1, gap: 2 },
  input: { minHeight: 32, paddingVertical: 4 },
  error: { color: colors.clay },
});
