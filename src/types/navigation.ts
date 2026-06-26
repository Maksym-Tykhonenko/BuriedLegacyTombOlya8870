import type {Article, LocationSite, CipherRiddle} from '../data/types';

export type MainTabKey = 'secrets' | 'journal' | 'trial' | 'cipher' | 'relic';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  MainTabs: {tab?: MainTabKey} | undefined;
  SecretSite: {site: LocationSite};
  DossierDetail: {article: Article};
  FieldNoteEditor: {noteId?: string} | undefined;
  ClueTrial: undefined;
  TrialReport: {score: number; total: number};
  CipherChamber: {riddle: CipherRiddle};
  RelicAssemblyGame: {level?: number} | undefined;
  RelicAssemblyResult: {completed: number; total: number; time: number; isRecord: boolean};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
