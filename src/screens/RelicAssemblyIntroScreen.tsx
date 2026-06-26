import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Title} from '../components/Primitives';
import ScreenHeader from '../components/ScreenHeader';
import {relicAssemblyLevels} from '../data/relicAssembly';
import {getNumberValue} from '../storage/storage';
import {bottomScreenInset, compactGap, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function RelicAssemblyIntroScreen({navigation}: Props): React.JSX.Element {
  const [best, setBest] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getNumberValue('relicAssemblyBest').then(value => {
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
      <ScreenHeader title="Relic Assembly" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>△</Text>
        </View>
        <Title style={styles.title}>Restore the Relic</Title>
        <BodyText style={styles.copy}>
          Place shaped fragments into the glowing triangle. Complete all ten
          layouts to restore the sealed relic.
        </BodyText>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Levels</Text>
            <Text style={styles.statValue}>{relicAssemblyLevels.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Best Time</Text>
            <Text style={styles.statValue}>{best ? best.toFixed(2) : '—'}</Text>
          </View>
        </View>
        <AppButton
          label="Assemble Relic"
          onPress={() => navigation.navigate('RelicAssemblyGame', {level: 1})}
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
    paddingTop: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 16 : 28,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 10 : 18),
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isCompact ? 10 : compactGap,
  },
  iconBox: {
    width: theme.layout.isTiny ? 76 : theme.layout.isCompact ? 92 : 120,
    height: theme.layout.isTiny ? 76 : theme.layout.isCompact ? 92 : 120,
    borderRadius: theme.layout.isTiny ? 20 : theme.layout.isCompact ? 24 : 30,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.18,
    shadowRadius: 22,
  },
  icon: {
    fontSize: theme.layout.isTiny ? 38 : theme.layout.isCompact ? 48 : 62,
  },
  title: {
    textAlign: 'center',
    fontSize: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 24 : 30,
    lineHeight: theme.layout.isTiny ? 27 : theme.layout.isCompact ? 30 : 37,
  },
  copy: {
    textAlign: 'center',
    maxWidth: 330,
  },
  stats: {
    width: '100%',
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 8 : 10,
  },
  statBox: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 58 : theme.layout.isCompact ? 68 : 82,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isCompact ? 4 : 6,
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
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 22 : 26,
  },
  start: {
    width: '100%',
  },
});

export default RelicAssemblyIntroScreen;
