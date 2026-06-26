import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Title} from '../components/Primitives';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RelicAssemblyResult'>;

function RelicAssemblyResultScreen({navigation, route}: Props): React.JSX.Element {
  const {completed, total, time, isRecord} = route.params;
  return (
    <AppScaffold>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>△</Text>
        </View>
        {isRecord ? <Text style={styles.record}>New Record</Text> : null}
        <Title style={styles.title}>Relic Restored</Title>
        <BodyText style={styles.copy}>
          You completed {completed} of {total} relic layouts.
        </BodyText>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Levels</Text>
            <Text style={styles.statValue}>
              {completed}/{total}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValue}>{time.toFixed(2)}</Text>
          </View>
        </View>
        <AppButton
          label="Play Again"
          onPress={() => navigation.replace('RelicAssemblyGame', {level: 1})}
          style={styles.button}
        />
        <AppButton
          label="Back to Brief"
          variant="ghost"
          onPress={() => navigation.navigate('MainTabs', {tab: 'relic'})}
          style={styles.button}
        />
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 18 : 28,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 12 : 18),
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isCompact ? 10 : compactGap,
  },
  iconCircle: {
    width: theme.layout.isTiny ? 72 : theme.layout.isCompact ? 86 : 112,
    height: theme.layout.isTiny ? 72 : theme.layout.isCompact ? 86 : 112,
    borderRadius: theme.layout.isTiny ? 36 : theme.layout.isCompact ? 43 : 56,
    borderWidth: 2,
    borderColor: theme.colors.goldBright,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.23,
    shadowRadius: 22,
  },
  icon: {
    fontSize: theme.layout.isTiny ? 28 : theme.layout.isCompact ? 34 : 46,
  },
  record: {
    color: theme.colors.teal,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 12,
    letterSpacing: theme.layout.isTiny ? 1.4 : 2.4,
    textTransform: 'uppercase',
  },
  title: {
    textAlign: 'center',
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 22 : 27,
    lineHeight: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 27 : 33,
  },
  copy: {
    textAlign: 'center',
  },
  stats: {
    width: '100%',
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 7 : 10,
    marginTop: theme.layout.isTiny ? 4 : 10,
  },
  statBox: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 62 : theme.layout.isCompact ? 74 : 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  statLabel: {
    color: theme.colors.goldDark,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 10,
    letterSpacing: theme.layout.isTiny ? 0.7 : 1.2,
    textTransform: 'uppercase',
  },
  statValue: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 21 : 25,
  },
  button: {
    width: '100%',
  },
});

export default RelicAssemblyResultScreen;
