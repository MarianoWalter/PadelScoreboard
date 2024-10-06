export type GameValue = 0 | 15 | 30 | 40 | 'AD';

export type Team = 'A' | 'B';

export type Step = {
  sets: [number, number][];
  points: [number, number];
  service: Team;
};

export type Game = {
  currentStep: Step;
  historyBack: Step[];
  historyForward: Step[];
};
