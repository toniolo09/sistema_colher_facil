import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/theme';

const blobs = [
  { id: 'sage', cx: 1, cy: 0, rx: 0.8, ry: 0.42, color: 'rgb(190,210,170)', opacity: 0.85 },
  { id: 'apricot', cx: 0, cy: 1, rx: 0.8, ry: 0.36, color: 'rgb(240,196,158)', opacity: 0.7 },
  { id: 'mist', cx: 0, cy: 0.45, rx: 0.45, ry: 0.22, color: 'rgb(190,210,170)', opacity: 0.35 },
];

export function ScreenBackground() {
  // Várias telas ficam montadas ao mesmo tempo; ids repetidos fariam um SVG usar o gradiente do outro.
  const prefix = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View style={[StyleSheet.absoluteFill, styles.paper]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          {blobs.map((blob) => (
            <RadialGradient
              key={blob.id}
              id={`${prefix}${blob.id}`}
              cx={blob.cx}
              cy={blob.cy}
              rx={blob.rx}
              ry={blob.ry}
              fx={blob.cx}
              fy={blob.cy}
            >
              <Stop offset="0" stopColor={blob.color} stopOpacity={blob.opacity} />
              <Stop offset="1" stopColor={blob.color} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>
        {blobs.map((blob) => (
          <Rect key={blob.id} width="100%" height="100%" fill={`url(#${prefix}${blob.id})`} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  paper: { backgroundColor: colors.paper },
});
