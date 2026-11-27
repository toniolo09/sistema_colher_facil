import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, gutter } from '@/theme';

import { ScreenBackground } from './ScreenBackground';

type ScreenProps = {
  children: ReactNode;
  footer?: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  footer,
  onRefresh,
  refreshing = false,
  contentStyle,
}: ScreenProps) {
  return (
    <View style={styles.root}>
      <ScreenBackground />
      <SafeAreaView style={styles.root} edges={footer ? ['top', 'bottom'] : ['top']}>
        <KeyboardAvoidingView
          style={styles.root}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.content, contentStyle]}
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={colors.forest}
                />
              ) : undefined
            }
          >
            {children}
          </ScrollView>
          {footer && <View style={styles.footer}>{footer}</View>}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: gutter, paddingTop: 12, paddingBottom: 32 },
  footer: { paddingHorizontal: gutter, paddingTop: 8, paddingBottom: 8 },
});
