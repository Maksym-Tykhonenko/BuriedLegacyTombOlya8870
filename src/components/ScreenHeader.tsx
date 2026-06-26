import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {screenHorizontal, theme} from '../theme/theme';
import {AppButton, BodyText, Title} from './Primitives';

type Props = {
  title: string;
  subtitle?: string;
  back?: () => void;
  share?: () => void;
  actionLabel?: string;
  actionIcon?: string;
  action?: () => void;
};

function ScreenHeader({
  title,
  subtitle,
  back,
  share,
  action,
  actionIcon,
  actionLabel,
}: Props): React.JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={styles.titleWrap}>
          {back ? (
            <Pressable onPress={back} style={styles.backHit}>
              <Text style={styles.backText}>‹ Back</Text>
            </Pressable>
          ) : null}
          <Title
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={styles.title}>
            {title}
          </Title>
          {subtitle ? <BodyText style={styles.subtitle}>{subtitle}</BodyText> : null}
        </View>
        {action ? (
          <AppButton
            label={actionLabel ?? 'New'}
            icon={actionIcon}
            onPress={action}
            style={styles.actionButton}
            textStyle={styles.actionText}
          />
        ) : null}
        {share ? (
          <AppButton
            label="Share"
            onPress={share}
            variant="ghost"
            style={styles.shareButton}
            textStyle={styles.shareText}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.panel,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(111, 71, 20, 0.55)',
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
    paddingBottom: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: theme.layout.isTiny ? 16 : theme.layout.isCompact ? 18 : 22,
    lineHeight: theme.layout.isTiny ? 20 : theme.layout.isCompact ? 22 : 27,
  },
  subtitle: {
    marginTop: 2,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 11 : 12,
    lineHeight: theme.layout.isTiny ? 14 : theme.layout.isCompact ? 15 : 17,
  },
  backHit: {
    alignSelf: 'flex-start',
    paddingBottom: theme.layout.isTiny ? 3 : theme.layout.isCompact ? 5 : 7,
  },
  backText: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 10 : 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  actionButton: {
    minHeight: theme.layout.isTiny ? 29 : theme.layout.isCompact ? 31 : 34,
    paddingHorizontal: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 13,
    borderRadius: 8,
    maxWidth: theme.layout.isTiny ? 76 : 96,
  },
  shareButton: {
    minHeight: theme.layout.isTiny ? 28 : theme.layout.isCompact ? 30 : 32,
    minWidth: theme.layout.isTiny ? 74 : theme.layout.isCompact ? 82 : 94,
    paddingHorizontal: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 11,
    borderRadius: 8,
    maxWidth: theme.layout.isTiny ? 78 : 94,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 10,
    letterSpacing: theme.layout.isTiny ? 0.6 : 1,
  },
  shareText: {
    flex: 1,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 10,
    letterSpacing: theme.layout.isTiny ? 0.6 : 1,
    textAlign: 'center',
  },
});

export default ScreenHeader;
