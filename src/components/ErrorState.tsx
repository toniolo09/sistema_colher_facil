import { StyleSheet, View } from 'react-native';

import { Button } from './Button';
import { Text } from './Text';

type ErrorStateProps = {
  onRetry: () => void;
  message?: string;
};

export function ErrorState({
  onRetry,
  message = 'Não conseguimos carregar agora. Confira sua internet.',
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text variant="secondary" style={styles.message}>
        {message}
      </Text>
      <Button label="Tentar de novo" variant="secondary" onPress={onRetry} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 16, paddingVertical: 40, paddingHorizontal: 24 },
  message: { textAlign: 'center' },
  button: { alignSelf: 'stretch' },
});
