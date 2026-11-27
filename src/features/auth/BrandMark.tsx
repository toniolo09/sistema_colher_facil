import { Sprout } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { colors, fonts } from '@/theme';

export function BrandMark() {
  return (
    <View style={styles.row} accessible accessibilityLabel="ColheFácil">
      <View style={styles.icon}>
        <Sprout size={24} color={colors.white} />
      </View>
      <Text style={styles.name}>ColheFácil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 28 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontFamily: fonts.serif, fontSize: 26, color: colors.forest },
});
