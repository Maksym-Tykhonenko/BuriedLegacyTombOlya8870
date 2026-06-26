import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  type Region,
} from 'react-native-maps';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {
  AppButton,
  Badge,
  BodyText,
  Eyebrow,
  TextField,
  Title,
} from '../components/Primitives';
import {locations} from '../data/locations';
import type {LocationSite} from '../data/types';
import {getJsonValue, setJsonValue} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type ScreenMode = 'briefing' | 'dossiers' | 'map';

type SiteDossier = {
  site: LocationSite;
  caseCode: string;
  clueLine: string;
  method: string;
  score: number;
  signal: 'Critical' | 'Strong' | 'Quiet';
};

const egyptRegion: Region = {
  latitude: 26.6,
  longitude: 31.7,
  latitudeDelta: 8.8,
  longitudeDelta: 6.2,
};

const fieldMethods = [
  'radar trace',
  'wall text audit',
  'sealed access review',
  'ritual route study',
  'artifact pattern match',
  'light angle survey',
];

const cleanCodePart = (value: string) =>
  value
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, 'X');

const buildDossier = (site: LocationSite, index: number): SiteDossier => {
  const score = 58 + ((site.title.length * 7 + site.id.length * 11 + index * 5) % 39);
  const method = fieldMethods[index % fieldMethods.length];
  const landscapeLead = site.landscape.split(',')[0].trim();
  return {
    site,
    caseCode: `${cleanCodePart(site.region)}-${cleanCodePart(site.category)}-${index + 17}`,
    clueLine: `${landscapeLead} checked through ${method}`,
    method,
    score,
    signal: score > 88 ? 'Critical' : score > 74 ? 'Strong' : 'Quiet',
  };
};

function SecretsScreen({navigation}: Props): React.JSX.Element {
  const mapRef = useRef<MapView>(null);
  const [mode, setMode] = useState<ScreenMode>('briefing');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<LocationSite>(locations[0]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [region, setRegion] = useState<Region>(egyptRegion);
  const [prioritySiteIds, setPrioritySiteIds] = useState<string[]>([]);

  const dossiers = useMemo(
    () => locations.map((site, index) => buildDossier(site, index)),
    [],
  );

  const prioritySet = useMemo(
    () => new Set(prioritySiteIds),
    [prioritySiteIds],
  );

  const selectedDossier = useMemo(
    () =>
      dossiers.find(item => item.site.id === selected.id) ??
      dossiers[0],
    [dossiers, selected.id],
  );

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    const source = value
      ? dossiers.filter(({site, caseCode, clueLine, method, signal}) =>
          `${site.title} ${site.subtitle} ${site.category} ${site.region} ${caseCode} ${clueLine} ${method} ${signal}`
            .toLowerCase()
            .includes(value),
        )
      : dossiers;

    return [...source].sort((a, b) => {
      const priorityDelta =
        Number(prioritySet.has(b.site.id)) - Number(prioritySet.has(a.site.id));
      return priorityDelta || b.score - a.score;
    });
  }, [dossiers, prioritySet, query]);

  const briefingQueue = useMemo(() => {
    const priority = dossiers.filter(item => prioritySet.has(item.site.id));
    return (priority.length ? priority : [...dossiers].sort((a, b) => b.score - a.score))
      .slice(0, 5);
  }, [dossiers, prioritySet]);

  useEffect(() => {
    getJsonValue<string[]>('prioritySiteIds', []).then(value => {
      if (Array.isArray(value)) {
        setPrioritySiteIds(value);
      }
    });
  }, []);

  useEffect(() => {
    if (!filtered.length) {
      return;
    }
    if (!filtered.some(item => item.site.id === selected.id)) {
      setSelected(filtered[0].site);
    }
  }, [filtered, selected.id]);

  const openSite = (site: LocationSite) => navigation.navigate('SecretSite', {site});

  const shareSite = (dossier: SiteDossier) => {
    Share.share({
      message: `${dossier.site.title}\nCase ${dossier.caseCode}\nSignal ${dossier.score}\n${dossier.clueLine}`,
    });
  };

  const togglePriority = async (site: LocationSite) => {
    const next = prioritySet.has(site.id)
      ? prioritySiteIds.filter(id => id !== site.id)
      : [site.id, ...prioritySiteIds];
    setPrioritySiteIds(next);
    await setJsonValue('prioritySiteIds', next);
  };

  const moveMap = useCallback((nextRegion: Region) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 350);
  }, []);

  const focusSite = useCallback((site: LocationSite, delta = 1.9) => {
    moveMap({
      latitude: site.latitude,
      longitude: site.longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  }, [moveMap]);

  const openMapSite = (site: LocationSite) => {
    setSelected(site);
    setPopupVisible(true);
    setMode('map');
  };

  const selectDossier = (dossier: SiteDossier) => {
    setSelected(dossier.site);
    if (mode === 'map') {
      setPopupVisible(true);
      focusSite(dossier.site);
    }
  };

  const zoomBy = (factor: number) => {
    moveMap({
      ...region,
      latitudeDelta: Math.max(0.25, Math.min(12, region.latitudeDelta * factor)),
      longitudeDelta: Math.max(0.25, Math.min(12, region.longitudeDelta * factor)),
    });
  };

  useEffect(() => {
    if (mode === 'map' && popupVisible) {
      requestAnimationFrame(() => focusSite(selected));
    }
  }, [focusSite, mode, popupVisible, selected]);

  return (
    <AppScaffold>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleWrap}>
            <Eyebrow>Buried Legacy</Eyebrow>
            <Title numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78}>
              Tomb Secrets
            </Title>
          </View>
          <View style={styles.caseCounter}>
            <Text style={styles.counterValue}>{prioritySiteIds.length}</Text>
            <Text style={styles.counterLabel}>priority</Text>
          </View>
        </View>
        <TextField
          value={query}
          onChangeText={setQuery}
          placeholder="Search case, region, clue..."
          style={styles.search}
        />
        <View style={styles.segment}>
          {(['briefing', 'dossiers', 'map'] as ScreenMode[]).map(item => (
            <Pressable
              key={item}
              onPress={() => setMode(item)}
              style={[styles.segmentItem, mode === item && styles.segmentActive]}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.segmentText,
                  mode === item && styles.segmentTextActive,
                ]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {mode === 'briefing' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          <View style={styles.briefingCard}>
            <View style={styles.briefingTop}>
              <Badge label={selectedDossier.signal} tone={selectedDossier.site.badgeTone} />
              <Text style={styles.caseCode}>{selectedDossier.caseCode}</Text>
            </View>
            <Title
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
              style={styles.briefingTitle}>
              {selectedDossier.site.title}
            </Title>
            <View style={styles.signalRow}>
              <View style={styles.signalBox}>
                <Text style={styles.signalLabel}>Signal</Text>
                <Text style={styles.signalValue}>{selectedDossier.score}</Text>
              </View>
              <View style={styles.signalBox}>
                <Text style={styles.signalLabel}>Method</Text>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.72}
                  style={styles.signalMethod}>
                  {selectedDossier.method}
                </Text>
              </View>
            </View>
            <BodyText style={styles.notes}>{selectedDossier.clueLine}</BodyText>
            <View style={styles.cardActions}>
              <AppButton
                label="Open Case"
                onPress={() => openSite(selectedDossier.site)}
                style={styles.explore}
              />
              <AppButton
                label={prioritySet.has(selectedDossier.site.id) ? 'Unpin' : 'Pin'}
                variant="ghost"
                onPress={() => togglePriority(selectedDossier.site)}
                style={styles.pinAction}
                textStyle={styles.shareText}
              />
            </View>
          </View>

          <View style={styles.queueHeader}>
            <Text style={styles.sectionLabel}>Briefing Queue</Text>
            <Text style={styles.queueCount}>{briefingQueue.length} cases</Text>
          </View>
          {briefingQueue.map(dossier => (
            <Pressable
              key={dossier.site.id}
              onPress={() => selectDossier(dossier)}
              style={[
                styles.queueItem,
                dossier.site.id === selected.id && styles.queueItemActive,
              ]}>
              <Text style={styles.queueCode}>{dossier.caseCode}</Text>
              <View style={styles.queueText}>
                <Text numberOfLines={1} style={styles.queueTitle}>
                  {dossier.site.title}
                </Text>
                <Text numberOfLines={1} style={styles.queueClue}>
                  {dossier.clueLine}
                </Text>
              </View>
              <Text style={styles.queueScore}>{dossier.score}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      {mode === 'dossiers' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          {filtered.map(dossier => (
            <View key={dossier.site.id} style={styles.siteCard}>
              <View style={styles.cardTop}>
                <View style={styles.cardText}>
                  <View style={styles.badgeLine}>
                    <Badge label={dossier.site.category} tone={dossier.site.badgeTone} />
                    <Text style={styles.caseCodeSmall}>{dossier.caseCode}</Text>
                  </View>
                  <Title
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.82}
                    style={styles.siteTitle}>
                    {dossier.site.title}
                  </Title>
                  <Eyebrow numberOfLines={2} style={styles.subtitle}>
                    {dossier.signal} signal - {dossier.site.region}
                  </Eyebrow>
                </View>
                <Pressable
                  onPress={() => openMapSite(dossier.site)}
                  style={styles.pinButton}>
                  <Text style={styles.pinIcon}>⌖</Text>
                </Pressable>
              </View>
              <BodyText style={styles.notes} numberOfLines={theme.layout.isCompact ? 2 : 3}>
                {dossier.site.notes}
              </BodyText>
              <Text style={styles.clueText}>{dossier.clueLine}</Text>
              <View style={styles.cardActions}>
                <AppButton
                  label="Read Case"
                  onPress={() => openSite(dossier.site)}
                  style={styles.explore}
                />
                <AppButton
                  label={prioritySet.has(dossier.site.id) ? 'Pinned' : 'Pin'}
                  variant="ghost"
                  onPress={() => togglePriority(dossier.site)}
                  style={styles.pinAction}
                  textStyle={styles.shareText}
                />
                <AppButton
                  label="Send"
                  variant="ghost"
                  onPress={() => shareSite(dossier)}
                  style={styles.share}
                  textStyle={styles.shareText}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : null}

      {mode === 'map' ? (
        <View style={styles.mapWrap}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={egyptRegion}
            onRegionChangeComplete={setRegion}>
            {filtered.map(dossier => (
              <Marker
                key={dossier.site.id}
                coordinate={{
                  latitude: dossier.site.latitude,
                  longitude: dossier.site.longitude,
                }}
                onPress={() => {
                  setSelected(dossier.site);
                  setPopupVisible(true);
                  focusSite(dossier.site);
                }}>
                <View
                  style={[
                    styles.mapPinOuter,
                    prioritySet.has(dossier.site.id) && styles.mapPinPriority,
                  ]}>
                  <View style={styles.mapPinInner} />
                </View>
              </Marker>
            ))}
          </MapView>
          <View style={styles.mapTag}>
            <Text style={styles.mapTagText}>Evidence Map - Tomb Secrets</Text>
          </View>
          <View style={styles.mapControls}>
            <Pressable onPress={() => zoomBy(0.55)} style={styles.mapControlButton}>
              <Text style={styles.mapControlText}>+</Text>
            </Pressable>
            <Pressable onPress={() => zoomBy(1.75)} style={styles.mapControlButton}>
              <Text style={styles.mapControlText}>-</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                popupVisible ? focusSite(selected) : moveMap(egyptRegion)
              }
              style={styles.mapControlButton}>
              <Text style={styles.mapControlText}>x</Text>
            </Pressable>
          </View>
          {popupVisible ? (
            <View style={styles.mapCard}>
              <View style={styles.mapCloseRow}>
                <Badge label={selectedDossier.signal} tone={selected.badgeTone} />
                <Pressable
                  onPress={() => setPopupVisible(false)}
                  hitSlop={10}
                  style={styles.close}>
                  <Text style={styles.closeText}>x</Text>
                </Pressable>
              </View>
              <Text style={styles.caseCodeSmall}>{selectedDossier.caseCode}</Text>
              <Title
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.82}
                style={styles.mapTitle}>
                {selected.title}
              </Title>
              <BodyText numberOfLines={theme.layout.isCompact ? 2 : 3} style={styles.mapNotes}>
                {selectedDossier.clueLine}
              </BodyText>
              <View style={styles.cardActions}>
                <AppButton
                  label="Open"
                  onPress={() => openSite(selected)}
                  style={styles.explore}
                />
                <AppButton
                  label={prioritySet.has(selected.id) ? 'Unpin' : 'Pin'}
                  variant="ghost"
                  onPress={() => togglePriority(selected)}
                  style={styles.share}
                  textStyle={styles.shareText}
                />
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: screenHorizontal,
    paddingBottom: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 16,
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 14,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  caseCounter: {
    minWidth: theme.layout.isTiny ? 62 : 74,
    minHeight: theme.layout.isTiny ? 42 : 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 16 : 20,
    fontWeight: '900',
  },
  counterLabel: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 7 : 8,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  search: {
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 38 : 42,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: theme.colors.panel,
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 38 : 42,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  segmentActive: {
    backgroundColor: 'rgba(211, 148, 36, 0.09)',
    borderBottomColor: theme.colors.goldBright,
  },
  segmentText: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 12,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.8 : 1.2,
    textTransform: 'uppercase',
  },
  segmentTextActive: {
    color: theme.colors.goldBright,
  },
  listContent: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 10 : 16),
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  briefingCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16,
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  briefingTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  briefingTitle: {
    fontSize: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 21 : 26,
    lineHeight: theme.layout.isTiny ? 23 : theme.layout.isCompact ? 27 : 32,
  },
  signalRow: {
    flexDirection: 'row',
    gap: 8,
  },
  signalBox: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 58 : theme.layout.isCompact ? 64 : 76,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(211, 148, 36, 0.62)',
    backgroundColor: theme.colors.panel,
    justifyContent: 'center',
    paddingHorizontal: theme.layout.isTiny ? 9 : 12,
    gap: 4,
  },
  signalLabel: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  signalValue: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 24 : 30,
    fontWeight: '900',
  },
  signalMethod: {
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 14 : 16,
    lineHeight: theme.layout.isTiny ? 16 : 20,
    textTransform: 'capitalize',
  },
  queueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  queueCount: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : 10,
  },
  queueItem: {
    minHeight: theme.layout.isTiny ? 54 : theme.layout.isCompact ? 60 : 68,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    paddingHorizontal: theme.layout.isTiny ? 9 : 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 8 : 10,
  },
  queueItemActive: {
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.panelSoft,
  },
  queueCode: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : 10,
    fontWeight: '900',
  },
  queueText: {
    flex: 1,
    minWidth: 0,
  },
  queueTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 14 : 16,
  },
  queueClue: {
    color: '#c9a066',
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 10 : 12,
  },
  queueScore: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 15 : 18,
    fontWeight: '900',
  },
  siteCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 11 : 14,
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 12,
    borderTopColor: theme.colors.goldBright,
    borderTopWidth: 2,
  },
  cardTop: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 12,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
    gap: theme.layout.isTiny ? 4 : 6,
  },
  badgeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  caseCode: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  caseCodeSmall: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  siteTitle: {
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 15 : 17,
    lineHeight: theme.layout.isTiny ? 18 : theme.layout.isCompact ? 19 : 21,
  },
  subtitle: {
    letterSpacing: theme.layout.isTiny ? 1.1 : 1.8,
    color: theme.colors.goldSoft,
  },
  pinButton: {
    width: theme.layout.isTiny ? 32 : theme.layout.isCompact ? 36 : 42,
    height: theme.layout.isTiny ? 32 : theme.layout.isCompact ? 36 : 42,
    borderRadius: theme.layout.isTiny ? 8 : 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.panel,
  },
  pinIcon: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 15 : 18,
  },
  notes: {
    color: '#d2ad73',
  },
  clueText: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 10 : 12,
    lineHeight: theme.layout.isTiny ? 15 : 17,
    textTransform: 'capitalize',
  },
  cardActions: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
    alignItems: 'center',
  },
  explore: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 36 : 40,
  },
  pinAction: {
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 36 : 40,
    minWidth: theme.layout.isTiny ? 66 : theme.layout.isCompact ? 72 : 82,
    paddingHorizontal: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 11,
    justifyContent: 'center',
  },
  share: {
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 36 : 40,
    minWidth: theme.layout.isTiny ? 66 : theme.layout.isCompact ? 74 : 86,
    paddingHorizontal: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 11,
    justifyContent: 'center',
  },
  shareText: {
    flex: 1,
    fontSize: theme.layout.isTiny ? 9 : 10,
    textAlign: 'center',
  },
  mapWrap: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapTag: {
    position: 'absolute',
    left: screenHorizontal,
    top: theme.layout.isCompact ? 12 : 18,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 21, 13, 0.94)',
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.layout.isCompact ? 9 : 12,
    paddingVertical: theme.layout.isCompact ? 5 : 7,
  },
  mapTagText: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isCompact ? 9 : 10,
    letterSpacing: theme.layout.isCompact ? 1.1 : 1.7,
    textTransform: 'uppercase',
  },
  mapPinOuter: {
    width: theme.layout.isCompact ? 34 : 40,
    height: theme.layout.isCompact ? 34 : 40,
    borderRadius: theme.layout.isCompact ? 17 : 20,
    borderWidth: 3,
    borderColor: 'rgba(211, 148, 36, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(211, 148, 36, 0.12)',
  },
  mapPinPriority: {
    borderColor: theme.colors.teal,
    backgroundColor: 'rgba(26, 163, 145, 0.16)',
  },
  mapPinInner: {
    width: theme.layout.isCompact ? 19 : 23,
    height: theme.layout.isCompact ? 19 : 23,
    borderRadius: theme.layout.isCompact ? 10 : 12,
    backgroundColor: theme.colors.goldBright,
    borderWidth: 4,
    borderColor: '#100905',
  },
  mapCard: {
    position: 'absolute',
    left: screenHorizontal + 10,
    right: screenHorizontal + 10,
    top: '50%',
    transform: [{translateY: theme.layout.isCompact ? -82 : -92}],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(31, 21, 13, 0.97)',
    padding: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 13,
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
  },
  mapControls: {
    position: 'absolute',
    right: screenHorizontal,
    top: theme.layout.isCompact ? 54 : 70,
    gap: theme.layout.isCompact ? 6 : 8,
  },
  mapControlButton: {
    width: theme.layout.isCompact ? 36 : 42,
    height: theme.layout.isCompact ? 36 : 42,
    borderRadius: theme.layout.isCompact ? 10 : 12,
    borderWidth: 1,
    borderColor: theme.colors.gold,
    backgroundColor: 'rgba(31, 21, 13, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapControlText: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isCompact ? 18 : 22,
    lineHeight: theme.layout.isCompact ? 21 : 25,
  },
  mapCloseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    width: theme.layout.isCompact ? 28 : 32,
    height: theme.layout.isCompact ? 28 : 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: theme.colors.goldSoft,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isCompact ? 16 : 18,
    lineHeight: theme.layout.isCompact ? 20 : 22,
    textTransform: 'uppercase',
  },
  mapTitle: {
    fontSize: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 15 : 17,
  },
  mapNotes: {
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 12 : 13,
    lineHeight: theme.layout.isTiny ? 16 : theme.layout.isCompact ? 17 : 19,
  },
});

export default SecretsScreen;
