import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {assets} from '../assets';
import {AppButton, BodyText, Title} from '../components/Primitives';
import {setOnboardingDone} from '../storage/storage';
import {screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const slides = [
  {
    image: assets.briefingHiddenSites,
    title: 'Open Sealed Briefings',
    text: 'Follow a curated set of Egyptian sites, hidden chambers, ritual rooms, and half-solved archaeological questions.',
  },
  {
    image: assets.dossierScrolls,
    title: 'Build Your Field Journal',
    text: 'Read compact dossiers, save your own observations, and keep personal notes beside the source material.',
  },
  {
    image: assets.clueTrial,
    title: 'Pass the Clue Trial',
    text: 'Answer focused evidence questions, unlock cipher chambers, and track your strongest investigation run.',
  },
  {
    image: assets.relicAssembly,
    title: 'Rebuild the Relic',
    text: 'Fit fragments into a glowing triangular relic, move through ten layouts, and beat your fastest restoration time.',
  },
];

function OnboardingScreen({navigation}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const {height, width} = useWindowDimensions();
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const isTiny = height < 620 || width < 340;
  const isCompact = height < 700 || width < 370;
  const topOffset = Math.round(Math.min(410, Math.max(278, height * 0.5)));
  const horizontalPadding = isTiny
    ? 18
    : isCompact
    ? 22
    : screenHorizontal + 10;
  const bottomPadding = isTiny ? 12 : isCompact ? 18 : 28;

  const finish = async () => {
    await setOnboardingDone();
    navigation.replace('MainTabs');
  };

  return (
    <ImageBackground source={slide.image} resizeMode="cover" style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.content,
            {
              paddingHorizontal: horizontalPadding,
              paddingTop: topOffset,
              paddingBottom: bottomPadding,
            },
          ]}>
          <View style={[styles.copy, isTiny && styles.copyTiny]}>
            <Title
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.84}
              style={[
                styles.title,
                isCompact && styles.titleCompact,
                isTiny && styles.titleTiny,
              ]}>
              {slide.title}
            </Title>
            <BodyText
              numberOfLines={isTiny ? 4 : undefined}
              adjustsFontSizeToFit
              minimumFontScale={0.86}
              style={[
                styles.text,
                isCompact && styles.textCompact,
                isTiny && styles.textTiny,
              ]}>
              {slide.text}
            </BodyText>
          </View>
          <View style={[styles.footer, isTiny && styles.footerTiny]}>
            <View style={[styles.dots, isTiny && styles.dotsTiny]}>
              {slides.map((_, dotIndex) => (
                <View
                  key={dotIndex}
                  style={[
                    styles.dot,
                    dotIndex === index && styles.dotActive,
                    dotIndex === index && index === 1 && styles.dotTeal,
                    dotIndex === index && index === 3 && styles.dotRed,
                  ]}
                />
              ))}
            </View>
            <View style={[styles.actions, isTiny && styles.actionsTiny]}>
              <Pressable onPress={finish} style={[styles.skip, isTiny && styles.skipTiny]}>
                <Text style={styles.skipText}>Skip</Text>
              </Pressable>
              <AppButton
                label={isLast ? 'Enter Secrets' : 'Next'}
                onPress={isLast ? finish : () => setIndex(value => value + 1)}
                style={[styles.next, isTiny && styles.nextTiny]}
                textStyle={isTiny && styles.nextTextTiny}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  copy: {
    gap: 12,
  },
  copyTiny: {
    gap: 8,
  },
  title: {
    fontSize: 25,
    lineHeight: 31,
    textTransform: 'capitalize',
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 28,
  },
  titleTiny: {
    fontSize: 19,
    lineHeight: 24,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 326,
  },
  textCompact: {
    fontSize: 13,
    lineHeight: 21,
    maxWidth: 310,
  },
  textTiny: {
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 282,
  },
  footer: {
    gap: 14,
  },
  footerTiny: {
    gap: 9,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
    minHeight: 10,
    alignItems: 'center',
  },
  dotsTiny: {
    gap: 6,
    minHeight: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(138, 94, 32, 0.36)',
  },
  dotActive: {
    width: 22,
    backgroundColor: theme.colors.goldBright,
  },
  dotTeal: {
    backgroundColor: theme.colors.teal,
  },
  dotRed: {
    backgroundColor: theme.colors.red,
  },
  actions: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  actionsTiny: {
    minHeight: 44,
    gap: 10,
  },
  skip: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  skipTiny: {
    width: 38,
    height: 40,
  },
  skipText: {
    color: 'rgba(138, 94, 32, 0.7)',
    fontFamily: theme.fonts.body,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  next: {
    flex: 1,
  },
  nextTiny: {
    minHeight: 42,
  },
  nextTextTiny: {
    fontSize: 11,
    letterSpacing: 1,
  },
});

export default OnboardingScreen;
