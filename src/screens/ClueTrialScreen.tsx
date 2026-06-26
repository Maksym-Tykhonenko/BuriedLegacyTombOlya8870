import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {BodyText, Eyebrow, Title} from '../components/Primitives';
import {quizQuestions} from '../data/games';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ClueTrial'>;

const passScore = 4;
const answerDelay = 760;

function ClueTrialScreen({navigation}: Props): React.JSX.Element {
  const questions = useMemo(() => quizQuestions.slice(0, 5), []);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockedRef = useRef(false);
  const question = questions[questionIndex];
  const total = questions.length;
  const selectedCorrect = selectedOptionId === question.correctOptionId;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const goToNext = (nextScore: number) => {
    if (questionIndex === total - 1) {
      navigation.replace('TrialReport', {score: nextScore, total});
      return;
    }
    setQuestionIndex(value => value + 1);
    setSelectedOptionId(null);
    lockedRef.current = false;
  };

  const answer = (optionId: string) => {
    if (lockedRef.current) {
      return;
    }
    lockedRef.current = true;
    setSelectedOptionId(optionId);
    const nextScore = score + (optionId === question.correctOptionId ? 1 : 0);
    setScore(nextScore);
    timerRef.current = setTimeout(() => goToNext(nextScore), answerDelay);
  };

  const goBack = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    navigation.navigate('MainTabs', {tab: 'trial'});
  };

  return (
    <AppScaffold>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Pressable hitSlop={8} onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>
          <Text style={styles.topLabel}>
            Clue {questionIndex + 1} / {total}
          </Text>
          <View style={styles.progress}>
            <View
              style={[
                styles.progressFill,
                {width: `${((questionIndex + 1) / total) * 100}%`},
              ]}
            />
          </View>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.score}>Verified {score}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.questionCard}>
          <Eyebrow>Evidence Check</Eyebrow>
          <Title style={styles.questionText}>{question.question}</Title>
          <BodyText style={styles.helper}>
            Choose one answer. Verify {passScore} or {total} clues to pass.
          </BodyText>
        </View>

        <View style={styles.options}>
          {question.options.map(option => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.id === question.correctOptionId;
            const showCorrect = selectedOptionId && isCorrect;
            const showWrong = isSelected && !isCorrect;
            return (
              <Pressable
                key={option.id}
                hitSlop={4}
                disabled={Boolean(selectedOptionId)}
                onPress={() => answer(option.id)}
                style={({pressed}) => [
                  styles.option,
                  pressed && styles.optionPressed,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                  selectedOptionId && !isSelected && !isCorrect && styles.optionDim,
                ]}>
                <Text style={styles.optionLetter}>{option.id}</Text>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  style={[
                    styles.optionText,
                    (showCorrect || showWrong) && styles.optionTextActive,
                  ]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.78}
            style={[
              styles.footerText,
              selectedOptionId && selectedCorrect && styles.footerCorrect,
              selectedOptionId && !selectedCorrect && styles.footerWrong,
            ]}>
            {!selectedOptionId
              ? 'Select evidence'
              : selectedCorrect
              ? 'Verified'
              : 'Rejected'}
          </Text>
        </View>
      </ScrollView>

    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  top: {
    minHeight: theme.layout.isTiny ? 52 : theme.layout.isCompact ? 60 : 68,
    backgroundColor: theme.colors.panel,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(111, 71, 20, 0.55)',
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 16,
  },
  topLeft: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.layout.isTiny ? 3 : theme.layout.isCompact ? 5 : 7,
  },
  backText: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 14,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.6 : 0.9,
    textTransform: 'uppercase',
  },
  topLabel: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 11,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.7 : 1.1,
    textTransform: 'uppercase',
  },
  progress: {
    width: '100%',
    maxWidth: theme.layout.isTiny ? 135 : theme.layout.isCompact ? 155 : 190,
    height: theme.layout.isTiny ? 3 : 4,
    marginTop: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 7 : 10,
    borderRadius: 2,
    backgroundColor: 'rgba(79, 50, 16, 0.8)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.goldBright,
  },
  topRight: {
    alignItems: 'flex-end',
  },
  score: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 11,
    textTransform: 'uppercase',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 22,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 12 : 22),
    gap: theme.layout.isCompact ? 10 : compactGap,
  },
  questionCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 18,
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 12,
  },
  questionText: {
    fontSize: theme.layout.isTiny ? 17 : theme.layout.isCompact ? 20 : 24,
    lineHeight: theme.layout.isTiny ? 23 : theme.layout.isCompact ? 27 : 32,
  },
  helper: {
    color: theme.colors.goldSoft,
  },
  options: {
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 10,
  },
  option: {
    minHeight: theme.layout.isTiny ? 46 : theme.layout.isCompact ? 54 : 62,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    paddingHorizontal: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 14,
    paddingVertical: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 12,
  },
  optionPressed: {
    borderColor: theme.colors.goldBright,
    backgroundColor: 'rgba(211, 148, 36, 0.22)',
    transform: [{scale: 0.99}],
  },
  optionCorrect: {
    borderColor: theme.colors.teal,
    backgroundColor: theme.colors.tealDeep,
  },
  optionWrong: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.redDeep,
  },
  optionDim: {
    opacity: 0.42,
  },
  optionLetter: {
    width: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 28 : 32,
    height: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 28 : 32,
    borderRadius: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 14 : 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 13 : 15,
    lineHeight: theme.layout.isTiny ? 23 : theme.layout.isCompact ? 27 : 31,
    textAlign: 'center',
    backgroundColor: theme.colors.panelDeep,
  },
  optionText: {
    flex: 1,
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 15 : 18,
    lineHeight: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 20 : 23,
  },
  optionTextActive: {
    color: theme.colors.text,
  },
  footer: {
    paddingTop: theme.layout.isTiny ? 2 : 4,
  },
  footerText: {
    minHeight: theme.layout.isTiny ? 36 : theme.layout.isCompact ? 40 : 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.gold,
    color: '#080503',
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 14,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 1.1 : 1.6,
    lineHeight: theme.layout.isTiny ? 35 : theme.layout.isCompact ? 39 : 43,
    textAlign: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  footerCorrect: {
    borderColor: theme.colors.teal,
    backgroundColor: theme.colors.tealDeep,
    color: theme.colors.teal,
  },
  footerWrong: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.redDeep,
    color: theme.colors.red,
  },
});

export default ClueTrialScreen;
