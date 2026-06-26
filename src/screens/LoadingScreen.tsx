import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {assets} from '../assets';
import {getOnboardingDone} from '../storage/storage';
import {theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const html = `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}
.wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.sun{width:84px;height:84px;border-radius:50%;background:radial-gradient(circle,#f8c95b 0%,#b06c17 52%,rgba(176,108,23,0) 70%);filter:blur(.2px);animation:pulse 2s infinite ease-in-out}
.ring{position:absolute;width:150px;height:150px;border:1px solid rgba(240,179,59,.42);border-radius:50%;animation:spin 8s linear infinite}
.ring:before,.ring:after{content:"";position:absolute;left:50%;top:50%;width:11px;height:11px;margin:-5px;border-radius:50%;background:#f0b33b;box-shadow:0 0 18px #f0b33b}
.ring:before{transform:rotate(30deg) translateX(75px)}
.ring:after{transform:rotate(210deg) translateX(75px)}
.tri{position:absolute;width:0;height:0;border-left:88px solid transparent;border-right:88px solid transparent;border-bottom:142px solid rgba(211,148,36,.11);filter:drop-shadow(0 0 18px rgba(211,148,36,.24));transform:translateY(34px)}
@keyframes pulse{0%,100%{transform:scale(.92);opacity:.58}50%{transform:scale(1.04);opacity:.9}}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body><div class="wrap"><div class="tri"></div><div class="ring"></div><div class="sun"></div></div></body>
</html>`;

function LoadingScreen({ navigation }: Props): React.JSX.Element {
  {/** 
  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(async () => {
      const done = await getOnboardingDone();
      if (mounted) {
        navigation.replace(done ? 'MainTabs' : 'Onboarding');
      }
    }, 5000);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [navigation]);
*/}
  return (
    <ImageBackground source={assets.splash} resizeMode="cover" style={styles.root}>
      <View style={styles.dim} />
      <WebView
        originWhitelist={['*']}
        source={{html}}
        scrollEnabled={false}
        style={styles.webview}
        containerStyle={styles.webContainer}
        automaticallyAdjustContentInsets={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 4, 3, 0.25)',
  },
  webContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default LoadingScreen;
