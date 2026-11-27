import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { colors, minTouchSize } from '@/theme';

import { Text } from './Text';

const toneColors = {
  muted: colors.ink2,
  forest: colors.forest,
  clay: colors.clay,
} as const;

type LinkButtonProps = {
  label: string;
  onPress: () => void;
  tone?: keyof typeof toneColors;
  icon?: LucideIcon;
  strong?: boolean;
};

export function LinkButton({
  label,
  onPress,
  tone = 'muted',
  icon: Icon,
  strong = false,
}: LinkButtonProps) {
  const color = toneColors[tone];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      {Icon && <Icon size={20} color={color} />}
      <Text variant={strong ? 'bodyStrong' : 'secondary'} style={{ color }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: minTouchSize,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  pressed: { opacity: 0.6 },
});
