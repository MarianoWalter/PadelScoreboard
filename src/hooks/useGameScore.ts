import type { Reducer } from 'react';
import { useCallback, useMemo, useReducer } from 'react';
import { isMatchPoint, isSetPoint, isTieBreak, parseGamePoints, pointScored } from '../GameUtils';
import type { Game } from '../domain/Game';

const INITIAL_STATE: Game = {
  currentStep: {
    sets: [[0, 0]],
    points: [0, 0],
    service: 'A',
  },
  historyBack: [],
  historyForward: [],
};

type Action = 'team_a_scored' | 'team_b_scored' | 'undo' | 'redo' | 'service_changed';

//TODO implement initial score (saved game)
export const useGameScore = () => {
  const [state, dispatch] = useReducer<Reducer<Game, Action>>((state, action) => {
    const pushCurrentStepToHistory = (): Pick<Game, 'historyBack' | 'historyForward'> => ({
      historyBack: [...state.historyBack, state.currentStep],
      historyForward: [],
    });

    switch (action) {
      case 'team_a_scored':
      case 'team_b_scored':
        return {
          ...state,
          ...pushCurrentStepToHistory(),
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

      case 'service_changed':
        return {
          ...state,
          ...pushCurrentStepToHistory(),
          currentStep: {
            ...state.currentStep,
            service: state.currentStep.service === 'A' ? 'B' : 'A',
          },
        };
    }
  }, INITIAL_STATE);

  const score = useMemo(
    () => ({
      sets: state.currentStep.sets,
      points: state.currentStep.points,
      parsedPoints: parseGamePoints(state.currentStep.points, isTieBreak(state.currentStep)),
      isTieBreak: isTieBreak(state.currentStep),
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
  const changeService = useCallback(() => dispatch('service_changed'), [dispatch]);

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
    service: state.currentStep.service,
    changeService,
  };
};
