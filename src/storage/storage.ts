import AsyncStorage from '@react-native-async-storage/async-storage';
import type {PersonalNote} from '../data/types';

const keys = {
  onboardingDone: 'tombSecrets:onboardingDone',
  personalNotes: 'tombSecrets:fieldNotes',
  prioritySiteIds: 'tombSecrets:prioritySiteIds',
  trialBest: 'tombSecrets:clueTrialBest',
  cipherSolved: 'tombSecrets:cipherSolved',
  cipherAttempts: 'tombSecrets:cipherAttempts',
  relicAssemblyBest: 'tombSecrets:relicAssemblyBest',
};

export async function getOnboardingDone(): Promise<boolean> {
  return (await AsyncStorage.getItem(keys.onboardingDone)) === 'true';
}

export async function setOnboardingDone(): Promise<void> {
  await AsyncStorage.setItem(keys.onboardingDone, 'true');
}

export async function getPersonalNotes(): Promise<PersonalNote[]> {
  const raw = await AsyncStorage.getItem(keys.personalNotes);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function savePersonalNotes(notes: PersonalNote[]): Promise<void> {
  await AsyncStorage.setItem(keys.personalNotes, JSON.stringify(notes));
}

export async function getNumberValue(key: keyof typeof keys): Promise<number> {
  const raw = await AsyncStorage.getItem(keys[key]);
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

export async function setNumberValue(
  key: keyof typeof keys,
  value: number,
): Promise<void> {
  await AsyncStorage.setItem(keys[key], String(value));
}

export async function getJsonValue<T>(
  key: keyof typeof keys,
  fallback: T,
): Promise<T> {
  const raw = await AsyncStorage.getItem(keys[key]);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setJsonValue<T>(
  key: keyof typeof keys,
  value: T,
): Promise<void> {
  await AsyncStorage.setItem(keys[key], JSON.stringify(value));
}

export {keys as storageKeys};
