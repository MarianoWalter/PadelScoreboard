import type { Reducer } from 'react';
import { useCallback, useMemo, useReducer } from 'react';
import { isMatchPoint, isSetPoint, parseGamePoints, pointScored } from '../GameUtils';
import type { Game } from '../domain/Game';

const INITIAL_STATE: Game = {
  currentStep: {
    sets: [0, 0],
    games: [0, 0],
    points: [0, 0],
    isTieBreak: false,
  },
  historyBack: [],
  historyForward: [],
};

type Action = 'team_a_scored' | 'team_b_scored' | 'undo' | 'redo';

//TODO implement initial score (saved game)
export const useGameScore = () => {
  const [state, dispatch] = useReducer<Reducer<Game, Action>>((state, action) => {
    switch (action) {
      case 'team_a_scored':
      case 'team_b_scored':
        return {
          ...state,
          historyBack: [...state.historyBack, state.currentStep],
          historyForward: [],
          currentStep: pointScored(state.currentStep, action === 'team_a_scored' ? 'A' : 'B'),
        };

      case 'undo':
        return {
          ...state,
          currentStep: state.historyBack[state.historyBack.length - 1],
          historyBack: state.historyBack.slice(0, state.historyBack.length - 1),
          historyForward: [...state.historyForward, state.currentStep],
        };

      case 'redo':
        return {
          ...state,
          currentStep: state.historyForward[state.historyForward.length - 1],
          historyBack: [...state.historyBack, state.currentStep],
          historyForward: state.historyForward.slice(0, state.historyForward.length - 1),
        };
    }
  }, INITIAL_STATE);

  const score = useMemo(
    () => ({
      sets: state.currentStep.sets,
      games: state.currentStep.games,
      points: state.currentStep.points,
      parsedPoints: parseGamePoints(state.currentStep.points, state.currentStep.isTieBreak),
      isTieBreak: state.currentStep.isTieBreak,
    }),
    [state.currentStep],
  );
  const canUndo = useMemo(() => state.historyBack.length > 0, [state]);
  const canRedo = useMemo(() => state.historyForward.length > 0, [state]);

  const [setPointTeamA, setPointTeamB] = useMemo(() => {
    const setPoint = isSetPoint(state.currentStep);
    return [setPoint === 'A', setPoint === 'B'];
  }, [state.currentStep]);

  const [matchPointTeamA, matchPointTeamB] = useMemo(() => {
    const matchPoint = isMatchPoint(state.currentStep);
    return [matchPoint === 'A', matchPoint === 'B'];
  }, [state.currentStep]);

  const teamAScored = useCallback(() => dispatch('team_a_scored'), [dispatch]);
  const teamBScored = useCallback(() => dispatch('team_b_scored'), [dispatch]);
  const undo = useCallback(() => dispatch('undo'), [dispatch]);
  const redo = useCallback(() => dispatch('redo'), [dispatch]);

  return {
    score,
    teamAScored,
    teamBScored,
    setPointTeamA,
    setPointTeamB,
    matchPointTeamA,
    matchPointTeamB,
    canUndo,
    undo,
    canRedo,
    redo,
  };
};
