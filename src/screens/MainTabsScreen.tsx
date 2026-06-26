import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import FloatingTabBar from '../components/FloatingTabBar';
import {bottomNavInset, theme} from '../theme/theme';
import type {MainTabKey, RootStackParamList} from '../types/navigation';
import SecretsScreen from './SecretsScreen';
import TrialBriefScreen from './TrialBriefScreen';
import CipherGateScreen from './CipherGateScreen';
import FieldJournalScreen from './FieldJournalScreen';
import RelicAssemblyIntroScreen from './RelicAssemblyIntroScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;
const tabReserve = theme.layout.isTiny ? 62 : theme.layout.isCompact ? 72 : 86;

function MainTabsScreen({navigation, route}: Props): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<MainTabKey>(
    route.params?.tab ?? 'secrets',
  );

  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab]);

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        {activeTab === 'secrets' ? <SecretsScreen navigation={navigation} /> : null}
        {activeTab === 'journal' ? (
          <FieldJournalScreen navigation={navigation} />
        ) : null}
        {activeTab === 'trial' ? (
          <TrialBriefScreen navigation={navigation} />
        ) : null}
        {activeTab === 'cipher' ? <CipherGateScreen navigation={navigation} /> : null}
        {activeTab === 'relic' ? <RelicAssemblyIntroScreen navigation={navigation} /> : null}
      </View>
      <FloatingTabBar active={activeTab} onChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  body: {
    flex: 1,
    paddingBottom: tabReserve + bottomNavInset,
  },
});

export default MainTabsScreen;
