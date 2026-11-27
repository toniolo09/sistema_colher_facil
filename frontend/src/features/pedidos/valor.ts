import type { Pedido } from '@/api/types';
import { decimalToNumber } from '@/lib/money';

// O pedido não tem valor total no backend; somamos preço unitário × quantidade dos itens.
export function valorDoPedido(pedido: Pedido) {
  return pedido.produtos.reduce(
    (total, item) => total + decimalToNumber(item.pivot.preco_unitario) * item.pivot.quantidade,
    0,
  );
}

export function descreverItens(pedido: Pedido) {
  const total = pedido.produtos.length;
  return total === 1 ? '1 item' : `${total} itens`;
}
