import React from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, Badge, BodyText, Title} from '../components/Primitives';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SecretSite'>;

function DetailSeparator(): React.JSX.Element {
  return (
    <View style={styles.detailSeparator}>
      <View style={styles.detailSeparatorLine} />
      <Text style={styles.detailSeparatorGlyph}>∨</Text>
      <View style={styles.detailSeparatorLine} />
    </View>
  );
}

function SecretSiteScreen({navigation, route}: Props): React.JSX.Element {
  const {site} = route.params;

  return (
    <AppScaffold>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backHit}>
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>
          <AppButton
            label="Share"
            variant="ghost"
            onPress={() => Share.share({message: `${site.title}\n${site.notes}`})}
            style={styles.shareButton}
            textStyle={styles.shareText}
          />
        </View>
        <Title
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          style={styles.headerTitle}>
          {site.title}
        </Title>
        <Text style={styles.headerSubtitle}>{site.subtitle}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.sealGlyph}>
            <View style={styles.sealGlyphLine} />
          </View>
          <Badge label={site.category} tone={site.badgeTone} />
        </View>
        <DetailSeparator />
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Case Notes</Text>
          <BodyText maxFontSizeMultiplier={1.08} style={styles.notes}>
            {site.notes}
          </BodyText>
        </View>
        <DetailSeparator />
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Coordinates</Text>
          <View style={styles.coordGrid}>
            <View style={styles.coordBox}>
              <Text style={styles.coordLabel}>Latitude</Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.76}
                style={styles.coordValue}>
                {site.latitude.toFixed(1)}° N
              </Text>
            </View>
            <View style={styles.coordBox}>
              <Text style={styles.coordLabel}>Longitude</Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.76}
                style={styles.coordValue}>
                {site.longitude.toFixed(1)}° E
              </Text>
            </View>
            <View style={styles.coordBox}>
              <Text style={styles.coordLabel}>Status</Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.68}
                style={styles.coordValue}>
                {site.status}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoPanel}>
          <Title
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={styles.panelTitle}>
            {site.region}
          </Title>
          <BodyText>{site.landscape}</BodyText>
        </View>
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.panel,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(149, 95, 25, 0.62)',
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
    paddingBottom: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
  },
  headerActions: {
    minHeight: theme.layout.isTiny ? 30 : theme.layout.isCompact ? 34 : 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  backHit: {
    minHeight: 34,
    justifyContent: 'center',
    paddingRight: 14,
  },
  backText: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 11 : 13,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.7 : 1,
    textTransform: 'uppercase',
  },
  shareButton: {
    minHeight: theme.layout.isTiny ? 28 : theme.layout.isCompact ? 32 : 36,
    minWidth: theme.layout.isTiny ? 74 : theme.layout.isCompact ? 86 : 104,
    paddingHorizontal: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
    borderColor: theme.colors.gold,
    justifyContent: 'center',
  },
  shareText: {
    flex: 1,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 11,
    letterSpacing: theme.layout.isTiny ? 0.8 : 1.2,
    textAlign: 'center',
  },
  headerTitle: {
    marginTop: theme.layout.isTiny ? 2 : 4,
    color: theme.colors.text,
    fontSize: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 23 : 31,
    lineHeight: theme.layout.isTiny ? 26 : theme.layout.isCompact ? 28 : 38,
  },
  headerSubtitle: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 12 : 14,
    lineHeight: theme.layout.isTiny ? 15 : theme.layout.isCompact ? 16 : 19,
  },
  content: {
    paddingHorizontal: screenHorizontal,
    paddingBottom: bottomScreenInset + 18,
  },
  hero: {
    minHeight: theme.layout.isTiny ? 48 : theme.layout.isCompact ? 58 : 76,
    justifyContent: 'flex-end',
    gap: theme.layout.isTiny ? 4 : 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(111, 71, 20, 0.58)',
    overflow: 'hidden',
  },
  sealGlyph: {
    position: 'absolute',
    alignSelf: 'center',
    top: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
    width: theme.layout.isTiny ? 64 : theme.layout.isCompact ? 76 : 92,
    height: theme.layout.isTiny ? 44 : theme.layout.isCompact ? 54 : 66,
    borderLeftWidth: theme.layout.isTiny ? 32 : theme.layout.isCompact ? 38 : 46,
    borderRightWidth: theme.layout.isTiny ? 32 : theme.layout.isCompact ? 38 : 46,
    borderBottomWidth: theme.layout.isTiny ? 44 : theme.layout.isCompact ? 54 : 66,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(211, 148, 36, 0.06)',
  },
  sealGlyphLine: {
    position: 'absolute',
    top: theme.layout.isTiny ? 29 : theme.layout.isCompact ? 35 : 42,
    left: theme.layout.isTiny ? -12 : -15,
    width: theme.layout.isTiny ? 58 : theme.layout.isCompact ? 70 : 86,
    height: 1,
    backgroundColor: 'rgba(211, 148, 36, 0.12)',
  },
  detailSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 5 : 8,
    marginBottom: theme.layout.isTiny ? 2 : theme.layout.isCompact ? 4 : 6,
  },
  detailSeparatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(111, 71, 20, 0.6)',
  },
  detailSeparatorGlyph: {
    color: theme.colors.goldDark,
    fontSize: theme.layout.isTiny ? 18 : 20,
    lineHeight: theme.layout.isTiny ? 18 : 20,
  },
  section: {
    gap: theme.layout.isTiny ? 1 : 2,
  },
  sectionLabel: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 11 : 13,
    fontWeight: '900',
    letterSpacing: theme.layout.isTiny ? 1.6 : theme.layout.isCompact ? 2.2 : 3.2,
    lineHeight: theme.layout.isTiny ? 13 : 16,
    textTransform: 'uppercase',
  },
  notes: {
    color: '#d8b574',
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 14 : 16,
    lineHeight: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 23 : 26,
    marginTop: 0,
  },
  coordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.layout.isTiny ? 7 : 10,
    marginTop: theme.layout.isTiny ? 2 : 3,
  },
  coordBox: {
    flex: 1,
    minWidth: theme.layout.isTiny ? 82 : theme.layout.isCompact ? 94 : 104,
    minHeight: theme.layout.isTiny ? 64 : theme.layout.isCompact ? 72 : 82,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(211, 148, 36, 0.78)',
    backgroundColor: '#25180f',
    paddingHorizontal: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 12,
    paddingVertical: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 11,
    justifyContent: 'space-between',
  },
  coordLabel: {
    color: '#b98331',
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 11,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.8 : theme.layout.isCompact ? 1.1 : 1.8,
    textTransform: 'uppercase',
  },
  coordValue: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 16 : 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoPanel: {
    marginTop: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(211, 148, 36, 0.62)',
    backgroundColor: '#130c08',
    padding: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 13 : 18,
    gap: theme.layout.isTiny ? 8 : 10,
  },
  panelTitle: {
    fontSize: theme.layout.isTiny ? 17 : theme.layout.isCompact ? 19 : 24,
    lineHeight: theme.layout.isTiny ? 22 : theme.layout.isCompact ? 24 : 30,
  },
});

export default SecretSiteScreen;
