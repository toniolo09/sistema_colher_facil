import type { TextStyle } from 'react-native';

import { colors } from './colors';

export const fonts = {
  serif: 'Newsreader_600SemiBold',
} as const;

export const textStyles = {
  display: { fontFamily: fonts.serif, fontSize: 44, lineHeight: 46, color: colors.ink },
  title: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, color: colors.ink },
  heading: { fontFamily: fonts.serif, fontSize: 22, lineHeight: 28, color: colors.ink },
  body: { fontSize: 17, lineHeight: 22, color: colors.ink },
  bodyStrong: { fontSize: 17, lineHeight: 22, fontWeight: '600', color: colors.ink },
  secondary: { fontSize: 15, lineHeight: 20, color: colors.ink2 },
  caption: { fontSize: 13, lineHeight: 17, color: colors.ink3 },
  label: {
    fontSize: 12.5,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.ink3,
  },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textStyles;
