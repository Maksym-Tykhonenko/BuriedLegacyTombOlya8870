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
import {AppButton, Eyebrow, TextField} from '../components/Primitives';
import type {PersonalNote} from '../data/types';
import {getPersonalNotes, savePersonalNotes} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FieldNoteEditor'>;
type FieldName = 'title' | 'preview' | 'body';
type Selection = {start: number; end: number};

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
  [',', 'space', '.', 'return', 'done'],
];

const emptySelection = {start: 0, end: 0};
const footerHeight =
  bottomScreenInset + (theme.layout.isTiny ? 54 : theme.layout.isCompact ? 62 : 76);

function FieldNoteEditorScreen({navigation, route}: Props): React.JSX.Element {
  const noteId = route.params?.noteId;
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [activeField, setActiveField] = useState<FieldName | null>('title');
  const [caps, setCaps] = useState(false);
  const [selections, setSelections] = useState<Record<FieldName, Selection>>({
    title: emptySelection,
    preview: emptySelection,
    body: emptySelection,
  });
  const titleRef = useRef<TextInput>(null);
  const previewRef = useRef<TextInput>(null);
  const bodyRef = useRef<TextInput>(null);

  useEffect(() => {
    getPersonalNotes().then(value => {
      setNotes(value);
      const current = value.find(note => note.id === noteId);
      if (current) {
        setTitle(current.title);
        setPreview(current.preview);
        setBody(current.body);
        setSelections({
          title: {start: current.title.length, end: current.title.length},
          preview: {start: current.preview.length, end: current.preview.length},
          body: {start: current.body.length, end: current.body.length},
        });
      }
    });
  }, [noteId]);

  const save = async () => {
    const cleanTitle = title.trim();
    const cleanPreview = preview.trim();
    const cleanBody = body.trim();
    if (!cleanTitle || !cleanPreview || !cleanBody) {
      return;
    }

    const nextNote: PersonalNote = {
      id: noteId ?? `${Date.now()}`,
      title: cleanTitle,
      preview: cleanPreview,
      body: cleanBody,
      createdAt: new Date().toISOString(),
    };

    const nextNotes = noteId
      ? notes.map(note => (note.id === noteId ? nextNote : note))
      : [nextNote, ...notes];
    await savePersonalNotes(nextNotes);
    navigation.navigate('MainTabs', {tab: 'journal'});
  };

  const canSave = Boolean(title.trim() && preview.trim() && body.trim());
  const refs = {
    title: titleRef,
    preview: previewRef,
    body: bodyRef,
  };

  const getValue = (field: FieldName) => {
    if (field === 'title') {
      return title;
    }
    if (field === 'preview') {
      return preview;
    }
    return body;
  };

  const setValue = (field: FieldName, value: string) => {
    if (field === 'title') {
      setTitle(value);
      return;
    }
    if (field === 'preview') {
      setPreview(value);
      return;
    }
    setBody(value);
  };

  const activateField = (field: FieldName) => {
    const length = getValue(field).length;
    setActiveField(field);
    setSelections(value => ({
      ...value,
      [field]:
        value[field].start || value[field].end
          ? value[field]
          : {start: length, end: length},
    }));
  };

  const setFieldSelection = (field: FieldName, selection: Selection) => {
    setSelections(value => ({...value, [field]: selection}));
  };

  const updateActiveText = (text: string) => {
    const field = activeField ?? 'title';
    const value = getValue(field);
    const selection = selections[field];
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    const nextValue = `${value.slice(0, start)}${text}${value.slice(end)}`;
    const caret = start + text.length;
    setActiveField(field);
    setValue(field, nextValue);
    setFieldSelection(field, {start: caret, end: caret});
  };

  const deleteActiveText = () => {
    const field = activeField ?? 'title';
    const value = getValue(field);
    const selection = selections[field];
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    if (!value || (!start && !end)) {
      return;
    }
    const removeFrom = start === end ? Math.max(0, start - 1) : start;
    const nextValue = `${value.slice(0, removeFrom)}${value.slice(end)}`;
    setActiveField(field);
    setValue(field, nextValue);
    setFieldSelection(field, {start: removeFrom, end: removeFrom});
  };

  const closeKeyboard = () => {
    if (activeField) {
      refs[activeField].current?.blur();
    }
    setActiveField(null);
  };

  const pressKey = (key: string) => {
    if (key === 'shift') {
      setCaps(value => !value);
      return;
    }
    if (key === 'backspace') {
      deleteActiveText();
      return;
    }
    if (key === 'space') {
      updateActiveText(' ');
      return;
    }
    if (key === 'return') {
      updateActiveText((activeField ?? 'title') === 'body' ? '\n' : ' ');
      return;
    }
    if (key === 'done') {
      closeKeyboard();
      return;
    }
    updateActiveText(caps ? key.toUpperCase() : key);
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
    if (key === 'return') {
      return '↵';
    }
    if (key === 'done') {
      return 'Done';
    }
    return caps ? key.toUpperCase() : key;
  };

  return (
    <AppScaffold>
      <ScreenHeader
        title={noteId ? 'Edit Field Entry' : 'New Field Entry'}
        subtitle="Record a private observation"
        back={() => navigation.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.field}>
          <Eyebrow>Title</Eyebrow>
          <TextField
            ref={titleRef}
            value={title}
            onChangeText={setTitle}
            onFocus={() => activateField('title')}
            onSelectionChange={event =>
              setFieldSelection('title', event.nativeEvent.selection)
            }
            placeholder="Name your discovery..."
            showSoftInputOnFocus={false}
            selection={activeField === 'title' ? selections.title : undefined}
            style={activeField === 'title' && styles.activeInput}
          />
        </View>
        <View style={styles.field}>
          <Eyebrow>Short Preview</Eyebrow>
          <TextField
            ref={previewRef}
            value={preview}
            onChangeText={setPreview}
            onFocus={() => activateField('preview')}
            onSelectionChange={event =>
              setFieldSelection('preview', event.nativeEvent.selection)
            }
            placeholder="A one-line summary..."
            showSoftInputOnFocus={false}
            selection={activeField === 'preview' ? selections.preview : undefined}
            multiline
            style={[
              styles.preview,
              activeField === 'preview' && styles.activeInput,
            ]}
          />
        </View>
        <View style={styles.field}>
          <Eyebrow>Full Note</Eyebrow>
          <TextField
            ref={bodyRef}
            value={body}
            onChangeText={setBody}
            onFocus={() => activateField('body')}
            onSelectionChange={event =>
              setFieldSelection('body', event.nativeEvent.selection)
            }
            placeholder="Write your field observation here..."
            showSoftInputOnFocus={false}
            selection={activeField === 'body' ? selections.body : undefined}
            multiline
            style={[styles.body, activeField === 'body' && styles.activeInput]}
          />
        </View>
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
                    (key === 'shift' || key === 'backspace' || key === 'done') &&
                      styles.actionKey,
                    pressed && styles.keyPressed,
                  ]}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.76}
                    style={[
                      styles.keyText,
                      (key === 'space' || key === 'done') && styles.actionKeyText,
                    ]}>
                    {keyLabel(key)}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          label="Save Entry"
          onPress={save}
          disabled={!canSave}
          style={styles.save}
        />
      </View>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 12 : 18,
    paddingBottom: footerHeight + (theme.layout.isCompact ? 8 : 12),
    gap: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 14 : 22,
  },
  field: {
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 7 : 10,
  },
  activeInput: {
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.panelSoft,
  },
  preview: {
    minHeight: theme.layout.isTiny ? 40 : theme.layout.isCompact ? 46 : 58,
  },
  body: {
    minHeight: theme.layout.isTiny ? 80 : theme.layout.isCompact ? 104 : 150,
  },
  keyboard: {
    marginTop: theme.layout.isTiny ? -4 : theme.layout.isCompact ? -2 : 0,
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
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
    paddingBottom: bottomScreenInset,
    borderTopWidth: 1,
    borderTopColor: 'rgba(111, 71, 20, 0.55)',
    backgroundColor: theme.colors.panel,
  },
  save: {
    minHeight: theme.layout.isTiny ? 38 : theme.layout.isCompact ? 42 : 48,
  },
});

export default FieldNoteEditorScreen;
