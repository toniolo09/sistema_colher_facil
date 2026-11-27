import { Text as NativeText, type TextProps as NativeTextProps } from 'react-native';

import { textStyles, type TextVariant } from '@/theme';

type TextProps = NativeTextProps & {
  variant?: TextVariant;
};

export function Text({ variant = 'body', style, ...props }: TextProps) {
  return <NativeText style={[textStyles[variant], style]} {...props} />;
}
