import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Title} from '../components/Primitives';
import {getNumberValue, setNumberValue} from '../storage/storage';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TrialReport'>;
const passScore = 4;

function TrialReportScreen({navigation, route}: Props): React.JSX.Element {
  const {score, total} = route.params;
  const [best, setBest] = useState(score);
  const passed = score >= passScore;

  useEffect(() => {
    getNumberValue('trialBest').then(value => {
      const nextBest = Math.max(value, score);
      setBest(nextBest);
      if (nextBest !== value) {
        setNumberValue('trialBest', nextBest);
      }
    });
  }, [score]);

  return (
    <AppScaffold>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.medal}>
          <Text style={styles.medalText}>{score}</Text>
        </View>
        <Title style={styles.rank}>
          {passed ? 'Trial Cleared' : 'Case Reopened'}
        </Title>
        <BodyText style={styles.copy}>
          {passed
            ? `You verified ${score} of ${total} clues.`
            : `You verified ${score} of ${total} clues. Verify 4 or 5 to pass.`}
        </BodyText>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>This Trial</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Best File</Text>
            <Text style={styles.statValue}>{best}</Text>
          </View>
        </View>
        <AppButton
          label={passed ? 'Audit Again' : 'Retry Trial'}
          onPress={() => navigation.replace('ClueTrial')}
          style={styles.button}
        />
        <AppButton
          label="Back to Brief"
          variant="ghost"
          onPress={() => navigation.navigate('MainTabs', {tab: 'trial'})}
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
  medal: {
    width: theme.layout.isTiny ? 68 : theme.layout.isCompact ? 82 : 102,
    height: theme.layout.isTiny ? 68 : theme.layout.isCompact ? 82 : 102,
    borderRadius: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 41 : 51,
    borderWidth: 2,
    borderColor: theme.colors.goldBright,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  medalText: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 23 : theme.layout.isCompact ? 28 : 34,
  },
  rank: {
    textAlign: 'center',
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 22 : 25,
    lineHeight: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 27 : 31,
  },
  copy: {
    textAlign: 'center',
    maxWidth: 315,
  },
  stats: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 56 : theme.layout.isCompact ? 64 : 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isTiny ? 4 : 6,
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
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 22 : 26,
  },
  button: {
    width: '100%',
  },
});

export default TrialReportScreen;
