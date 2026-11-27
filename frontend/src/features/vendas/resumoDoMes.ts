import type { Pedido } from '@/api/types';
import { valorDoPedido } from '@/features/pedidos/valor';
import { parseTimestamp } from '@/lib/time';

const monthNames = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

function totalDoMes(pedidos: Pedido[], mes: Date) {
  return pedidos
    .filter((pedido) => {
      const criado = parseTimestamp(pedido.created_at);
      return criado.getMonth() === mes.getMonth() && criado.getFullYear() === mes.getFullYear();
    })
    .reduce((total, pedido) => total + valorDoPedido(pedido), 0);
}

// Pedidos cancelados não contam como venda.
export function resumirMes(pedidos: Pedido[], now = new Date()) {
  const validos = pedidos.filter((pedido) => pedido.status !== 'cancelado');
  const anterior = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const total = totalDoMes(validos, now);
  const totalAnterior = totalDoMes(validos, anterior);

  return {
    nomeMes: monthNames[now.getMonth()],
    nomeMesAnterior: monthNames[anterior.getMonth()],
    total,
    variacao: totalAnterior > 0 ? (total - totalAnterior) / totalAnterior : null,
  };
}
