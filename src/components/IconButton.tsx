import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

import { GlassView } from './GlassView';

type IconButtonProps = {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress: () => void;
  variant?: 'glass' | 'primary';
};

const size = 52;

export function IconButton({
  icon: Icon,
  accessibilityLabel,
  onPress,
  variant = 'glass',
}: IconButtonProps) {
  const isPrimary = variant === 'primary';
  const icon = <Icon size={24} color={isPrimary ? colors.white : colors.ink} />;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => pressed && styles.pressed}
    >
      {isPrimary ? (
        <View style={[styles.box, styles.primary]}>{icon}</View>
      ) : (
        <GlassView radius={radius.control} style={styles.box}>
          {icon}
        </GlassView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.forest,
    borderRadius: radius.control,
  },
  pressed: { opacity: 0.7 },
});
