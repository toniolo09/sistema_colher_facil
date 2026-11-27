import { useQuery } from '@tanstack/react-query';

import { request } from '@/api/client';
import type { Pedido } from '@/api/types';

// O backend já devolve só os pedidos do usuário logado, do mais recente ao mais antigo.
export function usePedidos() {
  return useQuery({
    queryKey: ['pedidos'],
    queryFn: () => request<Pedido[]>('/pedidos'),
  });
}
