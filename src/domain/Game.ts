export type GameValue = 0 | 15 | 30 | 40 | 'AD';

export type Step = {
  sets: [number, number];
  games: [number, number];
  points: [number, number];
  isTieBreak: boolean;
};

export type Game = {
  currentStep: Step;
  historyBack: Step[];
  historyForward: Step[];
};
