import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

import { Text } from './Text';

type EmptyStateProps = {
  message: string;
  icon: LucideIcon;
};

export function EmptyState({ message, icon: Icon }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Icon size={32} color={colors.ink3} />
      <Text variant="secondary" style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12, paddingVertical: 40, paddingHorizontal: 24 },
  message: { textAlign: 'center' },
});
