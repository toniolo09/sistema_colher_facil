import { BlurView } from 'expo-blur';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { colors, glassShadow, radius as radii } from '@/theme';

type GlassViewProps = ViewProps & {
  radius?: number;
};

export function GlassView({ radius = radii.card, style, children, ...props }: GlassViewProps) {
  return (
    <View style={[styles.container, { borderRadius: radius }, style]} {...props}>
      <View style={[StyleSheet.absoluteFill, styles.clip, { borderRadius: radius }]}>
        <BlurView tint="light" intensity={35} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, styles.tint]} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...glassShadow,
  },
  clip: { overflow: 'hidden' },
  tint: { backgroundColor: colors.glass },
});
