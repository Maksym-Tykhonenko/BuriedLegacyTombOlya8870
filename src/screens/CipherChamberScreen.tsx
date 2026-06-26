import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import ScreenHeader from '../components/ScreenHeader';
import {
  AppButton,
  BodyText,
  Eyebrow,
  Separator,
  TextField,
} from '../components/Primitives';
import {cipherRiddles} from '../data/games';
import {getJsonValue, setJsonValue} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CipherChamber'>;
type Attempt = {text: string; correct: boolean};
type AttemptMap = Record<string, Attempt[]>;
type Selection = {start: number; end: number};

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
  [',', '-', 'space', '.', 'done'],
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ -]/gi, '')
    .trim();

function CipherChamberScreen({navigation, route}: Props): React.JSX.Element {
  const {riddle} = route.params;
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<number[]>([]);
  const [attemptMap, setAttemptMap] = useState<AttemptMap>({});
  const [selection, setSelection] = useState<Selection>({start: 0, end: 0});
  const [caps, setCaps] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const attempts = attemptMap[String(riddle.id)] ?? [];
  const isSolved = solved.includes(riddle.id);

  useEffect(() => {
    getJsonValue<number[]>('cipherSolved', []).then(setSolved);
    getJsonValue<AttemptMap>('cipherAttempts', {}).then(setAttemptMap);
  }, [riddle.id]);

  const submit = async () => {
    const correct = normalize(answer) === normalize(riddle.answer);
    const nextAttempts: AttemptMap = {
      ...attemptMap,
      [String(riddle.id)]: [{text: answer.trim(), correct}, ...attempts].slice(0, 4),
    };
    const nextSolved = correct
      ? Array.from(new Set([...solved, riddle.id]))
      : solved;

    setAttemptMap(nextAttempts);
    setSolved(nextSolved);
    setAnswer('');
    setSelection({start: 0, end: 0});
    await setJsonValue('cipherAttempts', nextAttempts);
    await setJsonValue('cipherSolved', nextSolved);
  };

  const updateAnswer = (text: string) => {
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    const nextAnswer = `${answer.slice(0, start)}${text}${answer.slice(end)}`;
    const caret = start + text.length;
    setAnswer(nextAnswer);
    setSelection({start: caret, end: caret});
  };

  const deleteAnswer = () => {
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    if (!answer || (!start && !end)) {
      return;
    }
    const removeFrom = start === end ? Math.max(0, start - 1) : start;
    const nextAnswer = `${answer.slice(0, removeFrom)}${answer.slice(end)}`;
    setAnswer(nextAnswer);
    setSelection({start: removeFrom, end: removeFrom});
  };

  const pressKey = (key: string) => {
    if (key === 'shift') {
      setCaps(value => !value);
      return;
    }
    if (key === 'backspace') {
      deleteAnswer();
      return;
    }
    if (key === 'space') {
      updateAnswer(' ');
      return;
    }
    if (key === 'done') {
      inputRef.current?.blur();
      return;
    }
    updateAnswer(caps ? key.toUpperCase() : key);
  };

  const keyLabel = (key: string) => {
    if (key === 'shift') {
      return caps ? '⇧' : '⇪';
    }
    if (key === 'backspace') {
      return '⌫';
    }
    if (key === 'space') {
      return 'Space';
    }
    if (key === 'done') {
      return 'Done';
    }
    return caps ? key.toUpperCase() : key;
  };

  const openNext = () => {
    const next = cipherRiddles.find(item => !solved.includes(item.id));
    if (!next) {
      navigation.navigate('MainTabs', {tab: 'cipher'});
      return;
    }
    navigation.replace('CipherChamber', {riddle: next});
  };

  return (
    <AppScaffold>
      <ScreenHeader
        title={`Chamber ${riddle.id}`}
        subtitle="Answer to wake this seal"
        back={() => navigation.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={[styles.stone, isSolved && styles.stoneSolved]}>
          <Text style={[styles.stoneIcon, isSolved && styles.stoneIconSolved]}>
            {isSolved ? '✓' : '#'}
          </Text>
        </View>
        <View style={styles.questionCard}>
          <Eyebrow>Cipher Prompt</Eyebrow>
          <Text
            maxFontSizeMultiplier={1.12}
            style={styles.question}>
            {riddle.question}
          </Text>
          {showHint ? <BodyText style={styles.hint}>{riddle.hint}</BodyText> : null}
        </View>
        {!isSolved ? (
          <View style={styles.answerRow}>
            <TextField
              ref={inputRef}
              value={answer}
              onChangeText={setAnswer}
              onSelectionChange={event => setSelection(event.nativeEvent.selection)}
              placeholder="Enter cipher answer..."
              showSoftInputOnFocus={false}
              selection={selection}
              style={styles.input}
              autoCapitalize="words"
            />
            <View style={styles.keyboard}>
              {keyboardRows.map((row, rowIndex) => (
                <View key={`${rowIndex}`} style={styles.keyRow}>
                  {row.map(key => (
                    <Pressable
                      key={key}
                      onPress={() => pressKey(key)}
                      style={({pressed}) => [
                        styles.key,
                        key === 'space' && styles.spaceKey,
                        (key === 'shift' ||
                          key === 'backspace' ||
                          key === 'done') &&
                          styles.actionKey,
                        pressed && styles.keyPressed,
                      ]}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.76}
                        style={[
                          styles.keyText,
                          (key === 'space' || key === 'done') &&
                            styles.actionKeyText,
                        ]}>
                        {keyLabel(key)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.buttons}>
              <AppButton
                label="Hint"
                variant="ghost"
                onPress={() => setShowHint(true)}
                style={styles.hintButton}
              />
              <AppButton
                label="Seal Answer"
                onPress={submit}
                disabled={!answer.trim()}
                style={styles.submit}
              />
            </View>
          </View>
        ) : (
          <View style={styles.solvedPanel}>
            <Text style={styles.solvedTitle}>Seal Awakened</Text>
            <AppButton label="Next Cipher" onPress={openNext} />
          </View>
        )}
        <Separator />
        <Eyebrow>Answer Trail</Eyebrow>
        <View style={styles.attempts}>
          {attempts.length ? (
            attempts.map((attempt, index) => (
              <View
                key={`${attempt.text}-${index}`}
                style={[
                  styles.attempt,
                  attempt.correct && styles.attemptCorrect,
                ]}>
                <Text style={styles.attemptIcon}>{attempt.correct ? '✓' : '×'}</Text>
                <Text numberOfLines={2} style={styles.attemptText}>
                  {attempt.text}
                </Text>
                <Text style={styles.attemptStatus}>
                  {attempt.correct ? 'Correct' : 'Missed'}
                </Text>
              </View>
            ))
          ) : (
            <BodyText>No answers tested yet.</BodyText>
          )}
        </View>
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 12 : 18,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 12 : 18),
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  stone: {
    width: theme.layout.isTiny ? 44 : theme.layout.isCompact ? 52 : 64,
    height: theme.layout.isTiny ? 44 : theme.layout.isCompact ? 52 : 64,
    borderRadius: theme.layout.isTiny ? 10 : 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  stoneSolved: {
    backgroundColor: theme.colors.gold,
    borderColor: theme.colors.goldBright,
  },
  stoneIcon: {
    fontSize: theme.layout.isTiny ? 17 : theme.layout.isCompact ? 20 : 25,
  },
  stoneIconSolved: {
    color: '#070403',
  },
  questionCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16,
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 12,
  },
  question: {
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 16 : 18,
    lineHeight: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 24 : 28,
  },
  hint: {
    color: theme.colors.goldBright,
  },
  answerRow: {
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 12,
  },
  input: {
    minHeight: theme.layout.isTiny ? 38 : theme.layout.isCompact ? 44 : 52,
  },
  keyboard: {
    paddingHorizontal: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 6 : 8,
    paddingVertical: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 6 : 8,
    backgroundColor: theme.colors.panelDeep,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(111, 71, 20, 0.72)',
    gap: theme.layout.isTiny ? 3 : theme.layout.isCompact ? 4 : 6,
  },
  keyRow: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 3 : theme.layout.isCompact ? 4 : 6,
  },
  key: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 22 : theme.layout.isCompact ? 26 : 32,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(111, 71, 20, 0.78)',
    backgroundColor: theme.colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionKey: {
    flex: 1.18,
    backgroundColor: theme.colors.panelSoft,
  },
  spaceKey: {
    flex: 4,
  },
  keyPressed: {
    borderColor: theme.colors.goldBright,
    backgroundColor: 'rgba(211, 148, 36, 0.28)',
    transform: [{scale: 0.97}],
  },
  keyText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 11 : 14,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  actionKeyText: {
    color: theme.colors.goldBright,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 12,
    letterSpacing: 0.7,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 7 : 10,
  },
  hintButton: {
    width: theme.layout.isTiny ? 58 : theme.layout.isCompact ? 66 : 76,
  },
  submit: {
    flex: 1,
  },
  solvedPanel: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.panel,
    padding: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16,
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  solvedTitle: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 15 : theme.layout.isCompact ? 17 : 21,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  attempts: {
    gap: 8,
  },
  attempt: {
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 38 : 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(111, 71, 20, 0.7)',
    backgroundColor: theme.colors.panelDeep,
    paddingHorizontal: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 7 : 10,
  },
  attemptCorrect: {
    borderColor: theme.colors.teal,
    backgroundColor: theme.colors.tealDeep,
  },
  attemptIcon: {
    color: theme.colors.gold,
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 15 : 18,
  },
  attemptText: {
    flex: 1,
    color: '#d2ad73',
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 12 : 14,
  },
  attemptStatus: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default CipherChamberScreen;
