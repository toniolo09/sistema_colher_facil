import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { request } from '@/api/client';
import type { LoginPayload, LoginResponse, RegisterPayload, User } from '@/api/types';

import { useSession } from './session';

export const usuarioKey = ['usuario'] as const;

export function useUsuario() {
  const { token } = useSession();
  return useQuery({
    queryKey: usuarioKey,
    queryFn: () => request<User>('/user'),
    enabled: token !== null,
  });
}

export function useLogin() {
  const { signIn } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      request<LoginResponse>('/login', { method: 'POST', body: payload }),
    onSuccess: async (data) => {
      queryClient.setQueryData(usuarioKey, data.utilizador);
      await signIn(data.access_token);
    },
  });
}

// O /register não devolve token, então entramos logo em seguida com a mesma senha.
export function useCadastro() {
  const login = useLogin();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      await request<User>('/register', { method: 'POST', body: payload });
      await login.mutateAsync({ email: payload.email, password: payload.password });
    },
  });
}

export function useSair() {
  const { signOut } = useSession();
  return useMutation({
    mutationFn: () => request<{ message: string }>('/logout', { method: 'POST' }),
    onSettled: signOut,
  });
}
