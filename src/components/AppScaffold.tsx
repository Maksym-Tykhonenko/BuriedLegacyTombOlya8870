import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme, topInset} from '../theme/theme';

type Props = {
  children: React.ReactNode;
  withKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
};

function AppScaffold({children, style, withKeyboard}: Props): React.JSX.Element {
  const edges =
    Platform.OS === 'ios'
      ? (['top', 'left', 'right'] as const)
      : (['left', 'right'] as const);
  const body = (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <View style={styles.topSpacer} />
      {children}
    </SafeAreaView>
  );

  if (!withKeyboard) {
    return body;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboard}>
      {body}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingTop: topInset,
  },
  topSpacer: {
    height:
      Platform.OS === 'ios'
        ? theme.layout.isTiny
          ? 4
          : theme.layout.isCompact
          ? 7
          : 12
        : 0,
  },
});

export default AppScaffold;
