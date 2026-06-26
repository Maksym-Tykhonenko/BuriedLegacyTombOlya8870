import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Title} from '../components/Primitives';
import ScreenHeader from '../components/ScreenHeader';
import {quizQuestions} from '../data/games';
import {getNumberValue} from '../storage/storage';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function TrialBriefScreen({navigation}: Props): React.JSX.Element {
  const [best, setBest] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getNumberValue('trialBest').then(value => {
        if (active) {
          setBest(value);
        }
      });
      return () => {
        active = false;
      };
    }, []),
  );

  return (
    <AppScaffold>
      <ScreenHeader title="Clue Trial" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>◇</Text>
        </View>
        <Title style={styles.title}>Audit the Clues</Title>
        <BodyText style={styles.copy}>
          Five evidence checks await. Pick the most credible answer for each
          clue and score four or five to clear the trial.
        </BodyText>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Questions</Text>
            <Text style={styles.statValue}>{quizQuestions.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Best Score</Text>
            <Text style={styles.statValue}>
              {best}/{quizQuestions.length}
            </Text>
          </View>
        </View>
        <AppButton
          label="Start Trial"
          onPress={() => navigation.navigate('ClueTrial')}
          style={styles.start}
        />
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 24,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 10 : 18),
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isCompact ? 10 : compactGap,
  },
  iconBox: {
    width: theme.layout.isTiny ? 62 : theme.layout.isCompact ? 76 : 92,
    height: theme.layout.isTiny ? 62 : theme.layout.isCompact ? 76 : 92,
    borderRadius: theme.layout.isTiny ? 16 : theme.layout.isCompact ? 19 : 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.16,
    shadowRadius: 22,
  },
  icon: {
    fontSize: theme.layout.isTiny ? 23 : theme.layout.isCompact ? 28 : 34,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 21 : 25,
    lineHeight: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 26 : 31,
  },
  copy: {
    textAlign: 'center',
    maxWidth: 335,
  },
  stats: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 54 : theme.layout.isCompact ? 62 : 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isTiny ? 3 : theme.layout.isCompact ? 4 : 7,
  },
  statLabel: {
    color: theme.colors.goldDark,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 10,
    letterSpacing: theme.layout.isTiny ? 0.8 : 1.2,
    textTransform: 'uppercase',
  },
  statValue: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 21 : 25,
  },
  start: {
    width: '100%',
    marginTop: 4,
  },
});

export default TrialBriefScreen;
