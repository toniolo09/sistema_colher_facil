import { StyleSheet, View } from 'react-native';

import type { StatusPedido } from '@/api/types';
import { Text } from '@/components/Text';
import { colors } from '@/theme';

const neutralBg = '#ECE8E0';

const statusStyles: Record<StatusPedido, { label: string; color: string; background: string }> = {
  pendente: { label: 'Novo', color: colors.clay, background: colors.clayBg },
  confirmado: { label: 'Confirmado', color: colors.slate, background: colors.slateBg },
  enviado: { label: 'Enviado', color: colors.sageInk, background: colors.sage },
  entregue: { label: 'Entregue', color: colors.ink2, background: neutralBg },
  cancelado: { label: 'Cancelado', color: colors.ink2, background: neutralBg },
};

export function StatusBadge({ status }: { status: StatusPedido }) {
  const { label, color, background } = statusStyles[status];
  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  label: { fontSize: 15, fontWeight: '600' },
});
