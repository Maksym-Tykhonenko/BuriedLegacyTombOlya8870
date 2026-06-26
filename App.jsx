import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme/theme';
///////////
import LoadingScreen from './src/screens/LoadingScreen';
import {
  getRemoteConfig,
  setDefaults,
  setConfigSettings,
  fetchAndActivate,
  getValue,
} from '@react-native-firebase/remote-config';
import remoteConfig from '@react-native-firebase/remote-config';
import { getApp } from '@react-native-firebase/app';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const FALLBACK_URL = 'https://neat-zone-ops.top/';
const INITIAL_URL_TO_OUR_BACK = 'https://fresh-proxy-hq.top/'

function App() {
  const [initialUrl, setInitialUrl] = useState(null);
  const [initialId, setInitialId] = useState('jxR2JGMV');
  const [initialUrlToOurBack, setInitialUrlToOurBack] = useState(INITIAL_URL_TO_OUR_BACK);
  console.log('initialUrlToOurBack', initialUrlToOurBack)
  const [oneSignKkkk, setOneSignKkkk] = useState('6e2759d3-c58b-4205-8553-dd9919734bd7');
  //const [apsDevKey, setApsDevKey] = useState('S2XSefMbc2XcYGFTcekTfc');
  //const [appId, setAppId] = useState('6781527859')

  useEffect(() => {

    {/**  const loadRemoteConfig = async () => {
  try {
    const app = getApp();
    const rc = getRemoteConfig(app);

    await setDefaults(rc, {
      DefLin: FALLBACK_URL,
      InitToBakcUrl: INITIAL_URL_TO_OUR_BACK,
    });

    await setConfigSettings(rc, {
      minimumFetchIntervalMillis: __DEV__ ? 0 : 300000,
    });

    await fetchAndActivate(rc);

    const remoteUrl = getValue(rc, 'DefLin').asString();

    if (remoteUrl && remoteUrl.startsWith('http')) {
      console.log(remoteUrl);
      setInitialUrl(remoteUrl);
    } else {
      setInitialUrl(FALLBACK_URL);
    }

    const remoteUrlToOurBack = getValue(rc, 'InitToBakcUrl').asString();

    if (
      remoteUrlToOurBack &&
      remoteUrlToOurBack.startsWith('http')
    ) {
      console.log(remoteUrlToOurBack);
      setInitialUrlToOurBack(remoteUrlToOurBack);
    } else {
      setInitialUrlToOurBack(INITIAL_URL_TO_OUR_BACK);
    }
  } catch (error) {
    console.log('Remote Config error:', error);
    setInitialUrl(FALLBACK_URL);
    setInitialUrlToOurBack(INITIAL_URL_TO_OUR_BACK);
  }
};*/}

   const loadRemoteConfig = async () => {
      try {
        await remoteConfig().setDefaults({
          DefLin: FALLBACK_URL,
          InitToBakcUrl: INITIAL_URL_TO_OUR_BACK,
        });

        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: __DEV__ ? 0 : 300000,
        });

        await remoteConfig().fetchAndActivate();

        const remoteUrl = remoteConfig().getValue('DefLin').asString();

        if (remoteUrl && remoteUrl.startsWith('http')) {
          console.log(remoteUrl)
          setInitialUrl(remoteUrl);
        } else {
          setInitialUrl(FALLBACK_URL);
        }

        const remoteUrlToOurBack = remoteConfig()
          .getValue('InitToBakcUrl')
          .asString();

        if (remoteUrlToOurBack && remoteUrlToOurBack.startsWith('http')) {
          console.log(remoteUrlToOurBack);
          setInitialUrlToOurBack(remoteUrlToOurBack);
        } else {
          setInitialUrlToOurBack(INITIAL_URL_TO_OUR_BACK);
        }
      } catch (error) {
        console.log('Remote Config error:', error);
        setInitialUrl(FALLBACK_URL);
        setInitialUrlToOurBack(INITIAL_URL_TO_OUR_BACK);
      }
    };

    const initOnsignall = async () => {
      try {
        // Verbose-логи лишаємо тільки в дебазі
        if (__DEV__) {
          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        }

        // OneSignal ініціалізація
        if (oneSignKkkk) {
          OneSignal.initialize(oneSignKkkk);
        }
      } catch (e) {
        console.log('OneSignal init error:', e);
      }
    };
    
    initOnsignall();
    loadRemoteConfig();
    
  }, []);

  if (!initialUrl) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AppNavigator
        initialUrl={initialUrl}
        initialId={initialId}
        initialUrlToOurBack={initialUrlToOurBack}
        oneSignKkkk={oneSignKkkk}
        //apsDevKey={apsDevKey}
        //appId={appId}
      />
    </SafeAreaProvider>
  );
}

export {theme};
export default App;
