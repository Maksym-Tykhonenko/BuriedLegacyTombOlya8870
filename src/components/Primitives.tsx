import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../theme/theme';

type ButtonProps = PressableProps & {
  label: string;
  icon?: string;
  variant?: 'primary' | 'ghost' | 'danger';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Title({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps): React.JSX.Element {
  return (
    <Text maxFontSizeMultiplier={1.15} {...props} style={[styles.title, style]}>
      {children}
    </Text>
  );
}

export function Eyebrow({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps): React.JSX.Element {
  return (
    <Text
      maxFontSizeMultiplier={1.1}
      {...props}
      style={[styles.eyebrow, style]}>
      {children}
    </Text>
  );
}

export function BodyText({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps): React.JSX.Element {
  return (
    <Text maxFontSizeMultiplier={1.2} {...props} style={[styles.body, style]}>
      {children}
    </Text>
  );
}

export function AppButton({
  label,
  icon,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        variant === 'ghost' && styles.buttonGhost,
        variant === 'danger' && styles.buttonDanger,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
        style,
      ]}>
      {icon ? <Text style={styles.buttonIcon}>{icon}</Text> : null}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.76}
        maxFontSizeMultiplier={1.05}
        style={[
          styles.buttonText,
          variant === 'ghost' && styles.buttonGhostText,
          disabled && styles.buttonDisabledText,
          textStyle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Badge({
  label,
  tone = 'teal',
}: {
  label: string;
  tone?: 'teal' | 'gold' | 'red';
}): React.JSX.Element {
  return (
    <View
      style={[
        styles.badge,
        tone === 'gold' && styles.badgeGold,
        tone === 'red' && styles.badgeRed,
      ]}>
      <Text
        style={[
          styles.badgeText,
          tone === 'gold' && styles.badgeTextGold,
          tone === 'red' && styles.badgeTextRed,
        ]}
        numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export const TextField = React.forwardRef<TextInput, TextInputProps>(
  function TextField(props, ref): React.JSX.Element {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor="rgba(244, 223, 189, 0.42)"
        selectionColor={theme.colors.goldBright}
        {...props}
        style={[
          styles.input,
          props.multiline && styles.inputMultiline,
          props.style,
        ]}
      />
    );
  },
);

export function Separator(): React.JSX.Element {
  return (
    <View style={styles.separator}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorGlyph}>∨</Text>
      <View style={styles.separatorLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 17 : theme.layout.isCompact ? 19 : 24,
    fontWeight: '700',
    letterSpacing: 0,
  },
  eyebrow: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 9 : 11,
    fontWeight: '700',
    letterSpacing: theme.layout.isTiny ? 1.2 : theme.layout.isCompact ? 1.8 : 2.8,
    textTransform: 'uppercase',
  },
  body: {
    color: theme.colors.textMuted,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 12 : 15,
    lineHeight: theme.layout.isTiny ? 17 : theme.layout.isCompact ? 19 : 24,
  },
  button: {
    minHeight: theme.layout.isTiny ? 36 : theme.layout.isCompact ? 40 : 44,
    borderRadius: 8,
    backgroundColor: theme.colors.gold,
    borderWidth: 1,
    borderColor: theme.colors.goldBright,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 5 : 8,
    paddingHorizontal: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16,
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 4,
  },
  buttonGhost: {
    backgroundColor: theme.colors.panelDeep,
    borderColor: theme.colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDanger: {
    backgroundColor: '#9b2524',
    borderColor: '#cf3d39',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    transform: [{scale: 0.98}],
  },
  buttonText: {
    color: '#080503',
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 11 : 13,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 0.6 : theme.layout.isCompact ? 0.9 : 1.4,
    textTransform: 'uppercase',
  },
  buttonGhostText: {
    color: theme.colors.text,
  },
  buttonDisabledText: {
    color: theme.colors.panelDeep,
  },
  buttonIcon: {
    color: '#080503',
    fontSize: theme.layout.isTiny ? 11 : theme.layout.isCompact ? 12 : 14,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#166c61',
    backgroundColor: 'rgba(21, 105, 91, 0.25)',
    paddingHorizontal: theme.layout.isTiny ? 8 : 10,
    paddingVertical: theme.layout.isTiny ? 4 : 5,
    maxWidth: '100%',
  },
  badgeGold: {
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(137, 92, 22, 0.22)',
  },
  badgeRed: {
    borderColor: '#8d2a25',
    backgroundColor: 'rgba(120, 30, 26, 0.26)',
  },
  badgeText: {
    color: theme.colors.teal,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 9 : 10,
    fontWeight: '800',
    letterSpacing: theme.layout.isTiny ? 1.1 : 1.6,
    textTransform: 'uppercase',
  },
  badgeTextGold: {
    color: theme.colors.gold,
  },
  badgeTextRed: {
    color: theme.colors.red,
  },
  input: {
    minHeight: theme.layout.isTiny ? 38 : theme.layout.isCompact ? 42 : 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panel,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
    paddingHorizontal: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 14,
    fontSize: theme.layout.isTiny ? 12 : theme.layout.isCompact ? 13 : 15,
  },
  inputMultiline: {
    minHeight: theme.layout.isTiny ? 116 : theme.layout.isCompact ? 132 : 164,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 8 : 12,
    marginVertical: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 10 : 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(111, 71, 20, 0.55)',
  },
  separatorGlyph: {
    color: theme.colors.goldDark,
    fontSize: 22,
    marginTop: -4,
  },
});
