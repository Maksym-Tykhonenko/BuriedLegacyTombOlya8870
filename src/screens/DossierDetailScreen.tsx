import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import ScreenHeader from '../components/ScreenHeader';
import {AppButton, Badge, BodyText, Eyebrow, Separator, Title} from '../components/Primitives';
import {getPersonalNotes, savePersonalNotes} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DossierDetail'>;

function DossierDetailScreen({navigation, route}: Props): React.JSX.Element {
  const {article} = route.params;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const removeNote = async () => {
    const notes = await getPersonalNotes();
    await savePersonalNotes(notes.filter(note => note.id !== article.id));
    setConfirmDelete(false);
    navigation.navigate('MainTabs', {tab: 'journal'});
  };

  return (
    <AppScaffold>
      <ScreenHeader
        title={article.title}
        subtitle={article.volume}
        back={() => navigation.goBack()}
        share={() => Share.share({message: `${article.title}\n${article.preview}`})}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Badge label={article.tag} tone={article.tone} />
        <Title
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          style={styles.title}>
          {article.title}
        </Title>
        <Eyebrow numberOfLines={2} style={styles.volume}>
          {article.volume}
        </Eyebrow>
        <Separator />
        {article.body.map((paragraph, index) => (
          <BodyText key={`${article.id}-${index}`} style={styles.paragraph}>
            {index === 0 ? (
              <Text style={styles.drop}>{paragraph.slice(0, 1)}</Text>
            ) : null}
            {index === 0 ? paragraph.slice(1) : paragraph}
          </BodyText>
        ))}
        {article.personal ? (
          <View style={styles.personalActions}>
            <AppButton
              label="Edit Note"
              onPress={() => navigation.navigate('FieldNoteEditor', {noteId: article.id})}
              variant="ghost"
              style={styles.personalButton}
            />
            <AppButton
              label="Delete"
              onPress={() => setConfirmDelete(true)}
              variant="danger"
              style={styles.personalButton}
            />
          </View>
        ) : null}
      </ScrollView>
      <Modal visible={confirmDelete} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setConfirmDelete(false)}>
          <Pressable style={styles.modalCard}>
            <Title style={styles.modalTitle}>Delete This Note?</Title>
            <BodyText style={styles.modalText}>
              "{article.title}" will be permanently removed from your archive.
              This cannot be undone.
            </BodyText>
            <View style={styles.modalActions}>
              <AppButton
                label="Cancel"
                variant="ghost"
                onPress={() => setConfirmDelete(false)}
                style={styles.modalButton}
              />
              <AppButton
                label="Delete"
                variant="danger"
                onPress={removeNote}
                style={styles.modalButton}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 20,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 14 : 20),
  },
  title: {
    marginTop: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 10 : 14,
    fontSize: theme.layout.isTiny ? 19 : theme.layout.isCompact ? 21 : 28,
    lineHeight: theme.layout.isTiny ? 24 : theme.layout.isCompact ? 26 : 34,
  },
  volume: {
    marginTop: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 7 : 10,
    color: theme.colors.gold,
  },
  paragraph: {
    color: '#d0a866',
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 14 : 16,
    lineHeight: theme.layout.isTiny ? 21 : theme.layout.isCompact ? 23 : 29,
    marginBottom: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 13 : 18,
  },
  drop: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 32 : theme.layout.isCompact ? 38 : 50,
    lineHeight: theme.layout.isTiny ? 36 : theme.layout.isCompact ? 42 : 54,
  },
  personalActions: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 7 : 10,
    marginTop: 12,
  },
  personalButton: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 4, 3, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenHorizontal,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.panel,
    padding: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 16 : 20,
    gap: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 12 : 16,
  },
  modalTitle: {
    color: theme.colors.red,
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: '#c5a170',
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 7 : 10,
  },
  modalButton: {
    flex: 1,
  },
});

export default DossierDetailScreen;
