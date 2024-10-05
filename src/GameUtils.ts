import type { Step } from './domain/Game';

export const isGamePoint = (currentStep: Step): 'A' | 'B' | false => {
  // When in tie-break the goal is to reach 7, in normal game it's 4 (15->1, 30->2, 40-> 3)
  const goal = currentStep.isTieBreak ? 7 : 4;

  const [pointsA, pointsB] = currentStep.points;

  if (pointsA < goal - 1 && pointsB < goal - 1) {
    return false;
  }

  const diff = pointsA - pointsB;

  if (diff === 0) {
    return false;
  }

  return diff > 0 ? 'A' : 'B';
};

export const isSetPoint = (currentStep: Step): 'A' | 'B' | false => {
  const teamWithGamePoint = isGamePoint(currentStep);

  if (!teamWithGamePoint) {
    return false;
  }

  const [gamesA, gamesB] = currentStep.games;

  if (currentStep.isTieBreak) {
    return teamWithGamePoint;
  }

  if (gamesA === gamesB || (gamesA < 5 && gamesB < 5)) {
    return false;
  }

  if (teamWithGamePoint === 'A') {
    if (gamesA + 1 - gamesB >= 2) {
      return 'A';
    }
  } else {
    if (gamesB + 1 - gamesA >= 2) {
      return 'B';
    }
  }

  return false;
};

export const isMatchPoint = (currentStep: Step, totalSets: 3 | 5 = 3): 'A' | 'B' | false => {
  const setsGoal = Math.ceil(totalSets / 2);
  const teamWithSetPoint = isSetPoint(currentStep);

  if (!teamWithSetPoint) {
    return false;
  }

  const setsWon = currentStep.sets[teamWithSetPoint === 'A' ? 0 : 1];

  if (setsWon + 1 >= setsGoal) {
    return teamWithSetPoint;
  }

  return false;
};

export const pointScored = (currentStep: Step, team: 'A' | 'B'): Step => {
  const setsUpdated: typeof currentStep.sets = [...currentStep.sets];
  let gamesUpdated: typeof currentStep.games = [...currentStep.games];
  let pointsUpdated: typeof currentStep.points = [...currentStep.points];

  const result = (): Step => ({
    sets: setsUpdated,
    games: gamesUpdated,
    points: pointsUpdated,
    isTieBreak: gamesUpdated[0] === 6 && gamesUpdated[1] === 6,
  });

  const teamIndex = team === 'A' ? 0 : 1;

  const setForTeam = isSetPoint(currentStep);
  if (setForTeam && setForTeam === team) {
    setsUpdated[teamIndex] = setsUpdated[teamIndex] + 1;
    gamesUpdated = [0, 0];
    pointsUpdated = [0, 0];
    return result();
  }

  const gameForTeam = isGamePoint(currentStep);
  if (gameForTeam && gameForTeam === team) {
    gamesUpdated[teamIndex] = gamesUpdated[teamIndex] + 1;
    pointsUpdated = [0, 0];
    return result();
  }

  pointsUpdated[teamIndex] = pointsUpdated[teamIndex] + 1;
  return result();
};

// Function that parses [3, 2] into [40, 30], or [5, 6] into [40, AD]
export const parseGamePoints = (
  score: [number, number],
  isTieBreak: boolean,
): [number | 'AD', number | 'AD'] => {
  if (isTieBreak) {
    return score;
  }

  const parse = (value: number) => {
    switch (value) {
      case 0:
        return 0;
      case 1:
        return 15;
      case 2:
        return 30;
      default:
        return 40;
    }
  };

  const [pointsA, pointsB] = score;
  const diff = pointsA - pointsB;

  if (pointsA >= 3 && pointsB >= 3 && diff !== 0) {
    return diff > 0 ? ['AD', 40] : [40, 'AD'];
  }

  return [parse(pointsA), parse(pointsB)];
};
