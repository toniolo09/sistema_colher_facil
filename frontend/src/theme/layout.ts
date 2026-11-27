import type { ViewStyle } from 'react-native';

export const gutter = 22;

export const radius = {
  card: 22,
  control: 16,
  pill: 999,
} as const;

export const glassShadow = {
  shadowColor: 'rgb(60,60,30)',
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 2,
} satisfies ViewStyle;

export const minTouchSize = 44;
