import { ReceiptText } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import type { Pedido } from '@/api/types';
import { Text } from '@/components/Text';
import { formatMoney } from '@/lib/money';
import { timeAgo } from '@/lib/time';
import { colors } from '@/theme';

import { StatusBadge } from './StatusBadge';
import { descreverItens, valorDoPedido } from './valor';

export function PedidoRow({ pedido }: { pedido: Pedido }) {
  const detalhe = `${descreverItens(pedido)} · ${timeAgo(pedido.created_at)}`;
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Pedido número ${pedido.id}, ${detalhe}, ${formatMoney(valorDoPedido(pedido))}`}
    >
      <View style={styles.icon}>
        <ReceiptText size={22} color={colors.sageInk} />
      </View>
      <View style={styles.main}>
        <Text variant="bodyStrong">Pedido nº {pedido.id}</Text>
        <Text variant="caption">{detalhe}</Text>
      </View>
      <StatusBadge status={pedido.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: { flex: 1, gap: 2 },
});
