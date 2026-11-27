import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radius } from '@/theme';

import { GlassView } from './GlassView';
import { Text } from './Text';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  accessibilityHint,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const inactive = disabled || loading;

  const content = loading ? (
    <ActivityIndicator color={isPrimary ? colors.white : colors.ink} />
  ) : (
    <Text variant="bodyStrong" style={[styles.label, isPrimary && styles.primaryLabel]}>
      {label}
    </Text>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        { opacity: disabled ? 0.45 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {isPrimary ? (
        <View style={[styles.fill, styles.primary]}>{content}</View>
      ) : (
        <GlassView radius={radius.control} style={styles.fill}>
          {content}
        </GlassView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 56 },
  fill: {
    minHeight: 56,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.forest,
    borderRadius: radius.control,
  },
  label: { textAlign: 'center' },
  primaryLabel: { color: colors.white },
});
