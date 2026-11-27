import { Newsreader_600SemiBold } from '@expo-google-fonts/newsreader/600SemiBold';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useUsuario } from '@/features/auth/api';
import { SessionProvider, useSession } from '@/features/auth/session';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Newsreader_600SemiBold });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <StatusBar style="dark" />
        {fontsLoaded && <RootNavigator />}
      </SessionProvider>
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { token, isRestoring } = useSession();
  const usuario = useUsuario();
  const isLoading = isRestoring || (token !== null && usuario.isPending);

  useEffect(() => {
    if (!isLoading) SplashScreen.hideAsync();
  }, [isLoading]);

  if (isLoading) return null;

  const tipo = token !== null ? usuario.data?.tipo_usuario : undefined;
  const isProdutor = tipo !== undefined && tipo !== 'consumidor';

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={token === null}>
        <Stack.Screen name="entrar" />
        <Stack.Screen name="cadastro" />
      </Stack.Protected>
      <Stack.Protected guard={isProdutor}>
        <Stack.Screen name="produtor" />
      </Stack.Protected>
    </Stack>
  );
}
