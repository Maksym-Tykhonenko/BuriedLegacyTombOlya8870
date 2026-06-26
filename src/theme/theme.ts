import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');
const isTiny = height < 650 || width < 340;
const isCompact = height < 740 || width < 380;

export const theme = {
  colors: {
    bg: '#070403',
    panel: '#1f150d',
    panelSoft: '#291b11',
    panelDeep: '#120b07',
    gold: '#d39424',
    goldBright: '#f0b33b',
    goldSoft: '#8a5e20',
    goldDark: '#4f3210',
    text: '#f4dfbd',
    textMuted: '#b88f53',
    teal: '#1aa391',
    tealDeep: '#0d3d35',
    red: '#b9332e',
    redDeep: '#4c1613',
    border: '#6f4714',
    shadow: '#000000',
  },
  fonts: {
    title: Platform.select({ios: 'Georgia', android: 'serif', default: 'serif'}),
    body: Platform.select({ios: 'Georgia', android: 'serif', default: 'serif'}),
  },
  spacing: {
    androidEdge: 30,
    iosNavBottom: 20,
    androidNavBottom: 30,
  },
  layout: {
    width,
    height,
    isTiny,
    isCompact,
    isSmall: isCompact,
  },
};

export const topInset = Platform.OS === 'android' ? theme.spacing.androidEdge : 0;
export const bottomScreenInset = Platform.OS === 'android' ? 30 : 20;
export const bottomNavInset =
  Platform.OS === 'android'
    ? theme.spacing.androidNavBottom
    : theme.spacing.iosNavBottom;
export const screenHorizontal = Math.max(12, Math.min(22, width * 0.04));
export const compactGap = theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16;
