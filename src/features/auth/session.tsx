import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { createContext, use, useEffect, useState, type ReactNode } from 'react';

import { setAuthToken, setUnauthorizedHandler } from '@/api/client';

const tokenKey = 'colhefacil.token';

type Session = {
  token: string | null;
  isRestoring: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);

  async function signIn(newToken: string) {
    setAuthToken(newToken);
    setToken(newToken);
    await SecureStore.setItemAsync(tokenKey, newToken);
  }

  async function signOut() {
    setAuthToken(null);
    setToken(null);
    queryClient.clear();
    await SecureStore.deleteItemAsync(tokenKey).catch(() => undefined);
  }

  useEffect(() => {
    SecureStore.getItemAsync(tokenKey)
      // Sem acesso ao armazenamento seguro (ex.: web), seguimos sem sessão salva.
      .catch(() => null)
      .then((stored) => {
        setAuthToken(stored);
        setToken(stored);
        setIsRestoring(false);
      });
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAuthToken(null);
      setToken(null);
      queryClient.clear();
      SecureStore.deleteItemAsync(tokenKey).catch(() => undefined);
    });
    return () => setUnauthorizedHandler(null);
  }, [queryClient]);

  return (
    <SessionContext value={{ token, isRestoring, signIn, signOut }}>{children}</SessionContext>
  );
}

export function useSession() {
  const session = use(SessionContext);
  if (!session) throw new Error('useSession precisa estar dentro de SessionProvider');
  return session;
}
