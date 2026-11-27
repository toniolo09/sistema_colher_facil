import { useQuery } from '@tanstack/react-query';

import { request } from '@/api/client';
import type { Produto } from '@/api/types';
import { useUsuario } from '@/features/auth/api';

// O GET /produtos devolve os produtos de todos; aqui ficam só os do produtor logado.
export function useMeusProdutos() {
  const usuario = useUsuario();
  const userId = usuario.data?.id;
  return useQuery({
    queryKey: ['produtos'],
    queryFn: () => request<Produto[]>('/produtos'),
    enabled: userId !== undefined,
    select: (produtos) => produtos.filter((produto) => produto.user_id === userId),
  });
}
