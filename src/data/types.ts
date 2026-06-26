export type LocationSite = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  latitude: number;
  longitude: number;
  region: string;
  landscape: string;
  notes: string;
  badgeTone: 'teal' | 'gold' | 'red';
};

export type Article = {
  id: string;
  title: string;
  tag: string;
  volume: string;
  preview: string;
  body: string[];
  tone: 'teal' | 'gold' | 'red';
  personal?: boolean;
};

export type PersonalNote = {
  id: string;
  title: string;
  preview: string;
  body: string;
  createdAt: string;
};

export type MatchOption = {
  id: string;
  label: string;
};

export type MatchStatement = {
  id: string;
  text: string;
  correctOptionId: string;
};

export type MatchRound = {
  id: string;
  statements: MatchStatement[];
  options: MatchOption[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: MatchOption[];
  correctOptionId: string;
};

export type CipherRiddle = {
  id: number;
  question: string;
  answer: string;
  hint: string;
};
