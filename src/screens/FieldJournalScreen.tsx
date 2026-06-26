import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, Share, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, Badge, BodyText, Eyebrow, Title} from '../components/Primitives';
import ScreenHeader from '../components/ScreenHeader';
import {baseArticles} from '../data/articles';
import type {Article, PersonalNote} from '../data/types';
import {getPersonalNotes} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const noteToArticle = (note: PersonalNote): Article => ({
  id: note.id,
  title: note.title,
  tag: 'Field Note',
  volume: 'Private Entry',
  tone: 'gold',
  preview: note.preview,
  body: [note.body],
  personal: true,
});

function FieldJournalScreen({navigation}: Props): React.JSX.Element {
  const [notes, setNotes] = useState<PersonalNote[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getPersonalNotes().then(value => {
        if (active) {
          setNotes(value);
        }
      });
      return () => {
        active = false;
      };
    }, []),
  );

  const articles = [...notes.map(noteToArticle), ...baseArticles];
  const personalCount = notes.length;

  const share = (article: Article) => {
    Share.share({message: `${article.title}\n${article.preview}`});
  };

  return (
    <AppScaffold>
      <ScreenHeader
        title="Field Journal"
        subtitle={`${articles.length} dossiers · ${personalCount} private entries`}
        action={() => navigation.navigate('FieldNoteEditor')}
        actionLabel="Log"
        actionIcon="+"
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {articles.map(article => (
          <View key={article.id} style={styles.card}>
            <Pressable
              onPress={() => navigation.navigate('DossierDetail', {article})}
              style={styles.readArea}>
              <Badge label={article.tag} tone={article.tone} />
              <Title
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.82}
                style={styles.cardTitle}>
                {article.title}
              </Title>
              <Eyebrow numberOfLines={2} style={styles.volume}>
                {article.volume}
              </Eyebrow>
              <BodyText style={styles.preview} numberOfLines={theme.layout.isCompact ? 2 : 3}>
                {article.preview}
              </BodyText>
            </Pressable>
            <View style={styles.cardActions}>
              <AppButton
                label="Open Dossier"
                variant="ghost"
                onPress={() => navigation.navigate('DossierDetail', {article})}
                style={styles.readButton}
              />
              <AppButton
                label="Share"
                variant="ghost"
                onPress={() => share(article)}
                style={styles.share}
                textStyle={styles.shareText}
              />
            </View>
          </View>
        ))}
        {articles.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📜</Text>
            <Title>No Entries Yet</Title>
            <BodyText>Start a private field journal with your own observation.</BodyText>
          </View>
        ) : null}
      </ScrollView>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 10 : 14,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 10 : 16),
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 11 : 14,
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  readArea: {
    gap: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 5 : 7,
  },
  cardTitle: {
    fontSize: theme.layout.isTiny ? 15 : theme.layout.isCompact ? 16 : 18,
    lineHeight: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 20 : 23,
  },
  volume: {
    color: theme.colors.goldSoft,
    letterSpacing: theme.layout.isTiny ? 1 : 1.6,
  },
  preview: {
    color: '#c9a066',
  },
  cardActions: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
  },
  readButton: {
    flex: 1,
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 36 : 40,
  },
  share: {
    minHeight: theme.layout.isTiny ? 34 : theme.layout.isCompact ? 36 : 40,
    minWidth: theme.layout.isTiny ? 78 : theme.layout.isCompact ? 86 : 96,
    paddingHorizontal: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 11,
    justifyContent: 'center',
  },
  shareText: {
    flex: 1,
    fontSize: theme.layout.isTiny ? 9 : 10,
    textAlign: 'center',
  },
  empty: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyIcon: {
    fontSize: 44,
  },
});

export default FieldJournalScreen;
