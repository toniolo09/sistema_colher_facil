import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { MoneyText } from '@/components/MoneyText';
import { Text } from '@/components/Text';
import { colors } from '@/theme';

import type { resumirMes } from './resumoDoMes';

type VendasDoMesCardProps = {
  resumo: ReturnType<typeof resumirMes>;
  style?: StyleProp<ViewStyle>;
};

const textOnForest = 'rgba(255,255,255,0.78)';

export function VendasDoMesCard({ resumo, style }: VendasDoMesCardProps) {
  const glowId = `glow${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const { variacao } = resumo;
  const Arrow = variacao !== null && variacao < 0 ? ArrowDown : ArrowUp;

  return (
    <View style={[styles.card, style]}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <RadialGradient id={glowId} cx={0.92} cy={0.12} rx={0.55} ry={0.8} fx={0.92} fy={0.12}>
            <Stop offset="0" stopColor="rgb(200,86,46)" stopOpacity={0.55} />
            <Stop offset="1" stopColor="rgb(200,86,46)" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${glowId})`} />
      </Svg>

      <Text style={styles.label}>Vendas em {resumo.nomeMes}</Text>
      <MoneyText value={resumo.total} size={46} inverse />
      {variacao !== null && (
        <View style={styles.variation}>
          <Arrow size={18} color={textOnForest} />
          <Text style={styles.label}>
            {Math.abs(Math.round(variacao * 100))}% em relação a {resumo.nomeMesAnterior}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.forest,
    borderRadius: 26,
    padding: 24,
    gap: 6,
    overflow: 'hidden',
  },
  label: { fontSize: 15, color: textOnForest },
  variation: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
});
