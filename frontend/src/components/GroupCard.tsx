import { Children, Fragment, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

import { GlassView } from './GlassView';

export function GroupCard({ children }: { children: ReactNode }) {
  const rows = Children.toArray(children);
  return (
    <GlassView style={styles.group}>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 && <View style={styles.divider} />}
          {row}
        </Fragment>
      ))}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  group: { paddingHorizontal: 20 },
  divider: { height: StyleSheet.hairlineWidth * 2, backgroundColor: colors.line },
});
