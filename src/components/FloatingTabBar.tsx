import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {MainTabKey} from '../types/navigation';
import {bottomNavInset, screenHorizontal, theme} from '../theme/theme';

const tabs: {key: MainTabKey; label: string; icon: string}[] = [
  {key: 'secrets', label: 'Secrets', icon: '◈'},
  {key: 'journal', label: 'Journal', icon: '▤'},
  {key: 'trial', label: 'Trial', icon: '◇'},
  {key: 'cipher', label: 'Cipher', icon: '△'},
  {key: 'relic', label: 'Relic', icon: '▣'},
];

type Props = {
  active: MainTabKey;
  onChange: (tab: MainTabKey) => void;
};

function FloatingTabBar({active, onChange}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.bar}>
        {tabs.map(tab => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={({pressed}) => [
                styles.item,
                pressed && styles.pressed,
                isActive && styles.itemActive,
              ]}>
              <View style={[styles.iconCircle, isActive && styles.iconActive]}>
                <Text style={[styles.icon, isActive && styles.iconTextActive]}>
                  {tab.icon}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: screenHorizontal,
    right: screenHorizontal,
    bottom: bottomNavInset,
  },
  bar: {
    minHeight: theme.layout.isTiny ? 52 : theme.layout.isCompact ? 58 : 66,
    borderRadius: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 16 : 18,
    borderWidth: 1,
    borderColor: 'rgba(153, 97, 25, 0.66)',
    backgroundColor: 'rgba(31, 21, 13, 0.97)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 7 : 10,
    paddingVertical: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 5 : 7,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  item: {
    flex: 1,
    minWidth: theme.layout.isTiny ? 38 : theme.layout.isCompact ? 42 : 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.layout.isTiny ? 0 : theme.layout.isCompact ? 1 : 3,
  },
  pressed: {
    opacity: 0.75,
  },
  itemActive: {},
  iconCircle: {
    width: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 27 : 30,
    height: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 27 : 30,
    borderRadius: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconActive: {
    backgroundColor: 'rgba(211, 148, 36, 0.19)',
    borderColor: theme.colors.gold,
  },
  icon: {
    color: theme.colors.goldSoft,
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 16 : 18,
    lineHeight: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 20 : 22,
  },
  iconTextActive: {
    color: theme.colors.goldBright,
  },
  label: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 9,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0 : theme.layout.isCompact ? 0.2 : 0.6,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: theme.colors.goldBright,
  },
});

export default FloatingTabBar;
