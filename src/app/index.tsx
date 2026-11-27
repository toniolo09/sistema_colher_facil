import { Redirect } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ErrorState } from '@/components/ErrorState';
import { LinkButton } from '@/components/LinkButton';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { useSair, useUsuario } from '@/features/auth/api';
import { useSession } from '@/features/auth/session';

export default function Index() {
  const { token } = useSession();
  const usuario = useUsuario();
  const sair = useSair();

  if (token === null) return <Redirect href="/entrar" />;

  if (usuario.isError) {
    return (
      <Screen contentStyle={styles.center}>
        <ErrorState onRetry={() => usuario.refetch()} />
      </Screen>
    );
  }

  if (usuario.data?.tipo_usuario !== 'consumidor') return <Redirect href="/produtor" />;

  // As telas do consumidor entram numa próxima etapa.
  return (
    <Screen contentStyle={styles.center}>
      <Text variant="heading" style={styles.text}>
        O marketplace chega em breve.
      </Text>
      <LinkButton label="Sair da conta" tone="clay" strong onPress={() => sair.mutate()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center', gap: 16 },
  text: { textAlign: 'center' },
});
