import { NotepadText } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { GlassView } from '@/components/GlassView';
import { GroupCard } from '@/components/GroupCard';
import { Screen } from '@/components/Screen';
import { Skeleton } from '@/components/Skeleton';
import { Text } from '@/components/Text';
import { useUsuario } from '@/features/auth/api';
import { PedidoRow } from '@/features/pedidos/PedidoRow';
import { usePedidos } from '@/features/pedidos/api';
import { useMeusProdutos } from '@/features/produtos/api';
import { VendasDoMesCard } from '@/features/vendas/VendasDoMesCard';
import { resumirMes } from '@/features/vendas/resumoDoMes';
import { greeting } from '@/lib/time';
import { colors, fonts, radius } from '@/theme';

export default function InicioProdutor() {
  const usuario = useUsuario();
  const pedidos = usePedidos();
  const produtos = useMeusProdutos();

  const primeiroNome = usuario.data?.nome.split(' ')[0] ?? '';
  const mes = pedidos.data && resumirMes(pedidos.data);
  const novos = pedidos.data?.filter((pedido) => pedido.status === 'pendente').length;
  const refetch = () => Promise.all([pedidos.refetch(), produtos.refetch()]);

  return (
    <Screen onRefresh={refetch} refreshing={pedidos.isRefetching}>
      <Text variant="secondary" style={styles.greeting}>
        {greeting()}
      </Text>
      <Text variant="title" accessibilityRole="header">
        {primeiroNome}
      </Text>

      {pedidos.isError || produtos.isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <>
          {mes ? (
            <VendasDoMesCard resumo={mes} style={styles.section} />
          ) : (
            <View style={styles.section}>
              <Skeleton height={164} radius={26} />
            </View>
          )}

          <View style={styles.stats}>
            <StatCard valor={novos} rotulo="Novos pedidos" destaque />
            <StatCard valor={produtos.data?.length} rotulo="Produtos cadastrados" />
          </View>

          <Text variant="heading" style={styles.sectionTitle} accessibilityRole="header">
            Pedidos recentes
          </Text>

          {!pedidos.data ? (
            <Skeleton height={150} radius={radius.card} />
          ) : pedidos.data.length === 0 ? (
            <EmptyState icon={NotepadText} message="Nenhum pedido por enquanto." />
          ) : (
            <GroupCard>
              {pedidos.data.slice(0, 3).map((pedido) => (
                <PedidoRow key={pedido.id} pedido={pedido} />
              ))}
            </GroupCard>
          )}
        </>
      )}
    </Screen>
  );
}

type StatCardProps = {
  valor: number | undefined;
  rotulo: string;
  destaque?: boolean;
};

function StatCard({ valor, rotulo, destaque = false }: StatCardProps) {
  return (
    <GlassView style={styles.stat}>
      {valor === undefined ? (
        <Skeleton width={48} height={34} />
      ) : (
        <Text style={styles.statValue}>{valor}</Text>
      )}
      <View style={styles.statLabel}>
        {destaque && valor !== undefined && valor > 0 && <View style={styles.dot} />}
        <Text variant="secondary" style={styles.statText}>
          {rotulo}
        </Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  greeting: { marginTop: 16, fontSize: 17 },
  section: { marginTop: 24 },
  stats: { flexDirection: 'row', gap: 14, marginTop: 14 },
  stat: { flex: 1, padding: 20, gap: 4 },
  statValue: { fontFamily: fonts.serif, fontSize: 34, lineHeight: 40, color: colors.ink },
  statLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statText: { flexShrink: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.clay },
  sectionTitle: { marginTop: 32, marginBottom: 10 },
});
