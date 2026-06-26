import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Title} from '../components/Primitives';
import ScreenHeader from '../components/ScreenHeader';
import {cipherRiddles} from '../data/games';
import {getJsonValue} from '../storage/storage';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function CipherGateScreen({navigation}: Props): React.JSX.Element {
  const [solved, setSolved] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getJsonValue<number[]>('cipherSolved', []).then(value => {
        if (active) {
          setSolved(value);
        }
      });
      return () => {
        active = false;
      };
    }, []),
  );

  const start = () => {
    const nextRiddle =
      cipherRiddles.find(riddle => !solved.includes(riddle.id)) ??
      cipherRiddles[0];
    navigation.navigate('CipherChamber', {riddle: nextRiddle});
  };

  return (
    <AppScaffold>
      <ScreenHeader title="Cipher Gate" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>△</Text>
        </View>
        <Title style={styles.title}>Seal the Answer</Title>
        <BodyText style={styles.copy}>
          Solve short field riddles to light each sealed chamber in order.
        </BodyText>
        <AppButton label="Open Gate" onPress={start} style={styles.startButton} />
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 16 : 28,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 10 : 18),
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isCompact ? 10 : compactGap,
  },
  iconWrap: {
    width: theme.layout.isTiny ? 90 : theme.layout.isCompact ? 112 : 142,
    height: theme.layout.isTiny ? 90 : theme.layout.isCompact ? 112 : 142,
    borderRadius: theme.layout.isTiny ? 22 : theme.layout.isCompact ? 28 : 36,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.2,
    shadowRadius: 24,
  },
  icon: {
    fontSize: theme.layout.isTiny ? 46 : theme.layout.isCompact ? 58 : 78,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 24 : 30,
    lineHeight: theme.layout.isTiny ? 27 : theme.layout.isCompact ? 30 : 37,
  },
  copy: {
    maxWidth: 315,
    textAlign: 'center',
  },
  startButton: {
    width: '100%',
    marginTop: theme.layout.isTiny ? 4 : 8,
  },
});

export default CipherGateScreen;
