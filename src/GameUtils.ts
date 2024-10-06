import type { Step, Team } from './domain/Game';

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const getCurrentSet = (step: Step) => step.sets[step.sets.length - 1];

export const isSetFinished = (games: [number, number]) => {
  const [a, b] = games;

  if (a === b || (a < 6 && b < 6)) {
    return false;
  }

  // Tie-break
  if (a >= 6 && b >= 6 && a !== b) {
    return true;
  }

  return Math.abs(a - b) >= 2;
};

export const isTieBreak = (step: Step) => {
  const set = getCurrentSet(step);

  return set[0] === 6 && set[1] === 6;
};

export const isGamePoint = (currentStep: Step): Team | false => {
  // When in tie-break the goal is to reach 7, in normal game it's 4 (15->1, 30->2, 40-> 3)
  const goal = isTieBreak(currentStep) ? 7 : 4;

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

export const isSetPoint = (currentStep: Step): Team | false => {
  const teamWithGamePoint = isGamePoint(currentStep);

  if (!teamWithGamePoint) {
    return false;
  }

  if (isTieBreak(currentStep)) {
    return teamWithGamePoint;
  }

  const [gamesA, gamesB] = getCurrentSet(currentStep);

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

export const isMatchPoint = (currentStep: Step, numberOfSets: 3 | 5 = 3): Team | false => {
  const teamWithSetPoint = isSetPoint(currentStep);

  if (!teamWithSetPoint) {
    return false;
  }

  const setsFinished = currentStep.sets.slice(0, -1);
  const setsWon = setsFinished.filter(([a, b]) =>
    teamWithSetPoint === 'A' ? a > b : b > a,
  ).length;
  const setsGoal = Math.ceil(numberOfSets / 2);

  if (setsWon + 1 >= setsGoal) {
    return teamWithSetPoint;
  }

  return false;
};

export const pointScored = (currentStep: Step, team: Team): Step => {
  const setsUpdated = clone(currentStep.sets);
  let pointsUpdated = clone(currentStep.points);

  const result = (): Step => ({
    sets: setsUpdated,
    points: pointsUpdated,
    // TODO if the set is won then the service should be changed to
    // the team that served the first point of the match
    service: team,
  });

  const teamIndex = team === 'A' ? 0 : 1;

  const gameForTeam = isGamePoint(currentStep);
  if (gameForTeam && gameForTeam === team) {
    const lastSet = setsUpdated[setsUpdated.length - 1];
    lastSet[teamIndex] += 1;

    //TODO also check if there are more sets to play
    if (isSetFinished(lastSet)) {
      setsUpdated.push([0, 0]);
    }

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
