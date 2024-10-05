import type { Step } from './domain/Game';
import { isGamePoint, isMatchPoint, isSetPoint, pointScored } from './GameUtils';

describe('Game Utils', () => {
  describe('"isGamePoint" function', () => {
    it('when it is not a tie-break', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 0];
      const games: [number, number] = [0, 0];
      const props = { isTieBreak, sets, games };

      expect(isGamePoint({ ...props, points: [0, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [0, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [0, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [3, 3] })).toBe(false);
      expect(isGamePoint({ ...props, points: [4, 4] })).toBe(false);
      expect(isGamePoint({ ...props, points: [5, 5] })).toBe(false);
      expect(isGamePoint({ ...props, points: [6, 6] })).toBe(false);
      expect(isGamePoint({ ...props, points: [100, 100] })).toBe(false);

      expect(isGamePoint({ ...props, points: [3, 0] })).toBe('A');
      expect(isGamePoint({ ...props, points: [3, 1] })).toBe('A');
      expect(isGamePoint({ ...props, points: [3, 2] })).toBe('A');
      expect(isGamePoint({ ...props, points: [4, 3] })).toBe('A');
      expect(isGamePoint({ ...props, points: [5, 4] })).toBe('A');
      expect(isGamePoint({ ...props, points: [6, 5] })).toBe('A');
      expect(isGamePoint({ ...props, points: [100, 99] })).toBe('A');

      expect(isGamePoint({ ...props, points: [0, 3] })).toBe('B');
      expect(isGamePoint({ ...props, points: [1, 3] })).toBe('B');
      expect(isGamePoint({ ...props, points: [2, 3] })).toBe('B');
      expect(isGamePoint({ ...props, points: [3, 4] })).toBe('B');
      expect(isGamePoint({ ...props, points: [4, 5] })).toBe('B');
      expect(isGamePoint({ ...props, points: [5, 6] })).toBe('B');
      expect(isGamePoint({ ...props, points: [99, 100] })).toBe('B');
    });

    it('when it is a tie-break', () => {
      const isTieBreak = true;
      const sets: [number, number] = [0, 0];
      const games: [number, number] = [0, 0];
      const props = { isTieBreak, sets, games };

      expect(isGamePoint({ ...props, points: [0, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [5, 0] })).toBe(false);
      expect(isGamePoint({ ...props, points: [0, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [0, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [0, 5] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [5, 3] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [3, 5] })).toBe(false);
      expect(isGamePoint({ ...props, points: [1, 1] })).toBe(false);
      expect(isGamePoint({ ...props, points: [2, 2] })).toBe(false);
      expect(isGamePoint({ ...props, points: [3, 3] })).toBe(false);
      expect(isGamePoint({ ...props, points: [4, 4] })).toBe(false);
      expect(isGamePoint({ ...props, points: [5, 5] })).toBe(false);
      expect(isGamePoint({ ...props, points: [6, 6] })).toBe(false);
      expect(isGamePoint({ ...props, points: [7, 7] })).toBe(false);
      expect(isGamePoint({ ...props, points: [8, 8] })).toBe(false);
      expect(isGamePoint({ ...props, points: [100, 100] })).toBe(false);

      expect(isGamePoint({ ...props, points: [6, 0] })).toBe('A');
      expect(isGamePoint({ ...props, points: [6, 1] })).toBe('A');
      expect(isGamePoint({ ...props, points: [6, 2] })).toBe('A');
      expect(isGamePoint({ ...props, points: [6, 5] })).toBe('A');
      expect(isGamePoint({ ...props, points: [7, 6] })).toBe('A');
      expect(isGamePoint({ ...props, points: [8, 7] })).toBe('A');
      expect(isGamePoint({ ...props, points: [100, 99] })).toBe('A');

      expect(isGamePoint({ ...props, points: [0, 6] })).toBe('B');
      expect(isGamePoint({ ...props, points: [1, 6] })).toBe('B');
      expect(isGamePoint({ ...props, points: [2, 6] })).toBe('B');
      expect(isGamePoint({ ...props, points: [5, 6] })).toBe('B');
      expect(isGamePoint({ ...props, points: [6, 7] })).toBe('B');
      expect(isGamePoint({ ...props, points: [7, 8] })).toBe('B');
      expect(isGamePoint({ ...props, points: [99, 100] })).toBe('B');
    });
  });

  describe('"isSetPoint" function', () => {
    it('returns false', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 0];
      const props = { isTieBreak, sets };

      expect(isSetPoint({ ...props, games: [5, 0], points: [0, 0] })).toBe(false);
      expect(isSetPoint({ ...props, games: [5, 0], points: [3, 3] })).toBe(false);
      expect(isSetPoint({ ...props, games: [5, 5], points: [3, 0] })).toBe(false);
      expect(isSetPoint({ ...props, games: [6, 6], points: [0, 0] })).toBe(false);
      expect(isSetPoint({ ...props, games: [6, 6], points: [3, 0] })).toBe(false);
      expect(isSetPoint({ ...props, games: [6, 6], points: [3, 3] })).toBe(false);
      expect(isSetPoint({ ...props, isTieBreak: true, games: [6, 6], points: [15, 15] })).toBe(
        false,
      );
    });

    it('returns "A"', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 0];
      const props = { isTieBreak, sets };

      expect(isSetPoint({ ...props, games: [5, 2], points: [3, 0] })).toBe('A');
      expect(isSetPoint({ ...props, games: [5, 2], points: [4, 3] })).toBe('A');
      expect(isSetPoint({ ...props, games: [5, 2], points: [9, 8] })).toBe('A');
      expect(isSetPoint({ ...props, isTieBreak: true, games: [6, 6], points: [6, 0] })).toBe('A');
      expect(isSetPoint({ ...props, isTieBreak: true, games: [6, 6], points: [15, 14] })).toBe('A');
    });

    it('returns "B"', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 0];
      const props = { isTieBreak, sets };

      expect(isSetPoint({ ...props, games: [2, 5], points: [0, 3] })).toBe('B');
      expect(isSetPoint({ ...props, games: [2, 5], points: [3, 4] })).toBe('B');
      expect(isSetPoint({ ...props, games: [2, 5], points: [8, 9] })).toBe('B');
      expect(isSetPoint({ ...props, isTieBreak: true, games: [6, 6], points: [0, 6] })).toBe('B');
      expect(isSetPoint({ ...props, isTieBreak: true, games: [6, 6], points: [14, 15] })).toBe('B');
    });
  });

  describe('"isMatchPoint" function', () => {
    it('returns false', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 0];
      const games: [number, number] = [0, 0];
      const points: [number, number] = [0, 0];
      const props = { isTieBreak, sets, games, points };

      expect(isMatchPoint({ ...props })).toBe(false);
      expect(isMatchPoint({ ...props, games: [5, 0], points: [3, 0] })).toBe(false);
      expect(isMatchPoint({ ...props, sets: [0, 1], games: [5, 0], points: [3, 0] })).toBe(false);
      expect(isMatchPoint({ ...props, sets: [1, 0], games: [5, 0], points: [3, 0] }, 5)).toBe(
        false,
      );
    });

    it('returns "A"', () => {
      const isTieBreak = false;
      const sets: [number, number] = [1, 0];
      const games: [number, number] = [5, 0];
      const points: [number, number] = [3, 0];
      const props = { isTieBreak, sets, games, points };

      expect(isMatchPoint({ ...props })).toBe('A');
      expect(isMatchPoint({ ...props, sets: [1, 1] })).toBe('A');
      expect(isMatchPoint({ ...props, isTieBreak: true, games: [6, 6], points: [10, 9] })).toBe(
        'A',
      );
    });

    it('returns "B"', () => {
      const isTieBreak = false;
      const sets: [number, number] = [0, 1];
      const games: [number, number] = [0, 5];
      const points: [number, number] = [0, 3];
      const props = { isTieBreak, sets, games, points };

      expect(isMatchPoint({ ...props })).toBe('B');
      expect(isMatchPoint({ ...props, sets: [1, 1] })).toBe('B');
      expect(isMatchPoint({ ...props, isTieBreak: true, games: [6, 6], points: [9, 10] })).toBe(
        'B',
      );
    });
  });

  describe('"pointScored" function', () => {
    describe('when team A scored', () => {
      type TestCase = {
        message: string;
        from: Omit<Step, 'isTieBreak'> & Partial<Pick<Step, 'isTieBreak'>>;
        to: Omit<Step, 'isTieBreak'> & Partial<Pick<Step, 'isTieBreak'>>;
      };

      const runTestCasees = test.each<TestCase>([
        {
          message: '0-0 -> 15-0',
          from: { sets: [0, 0], games: [0, 0], points: [0, 0] },
          to: { sets: [0, 0], games: [0, 0], points: [1, 0] },
        },
        {
          message: '15-0 -> 30-0',
          from: { sets: [0, 0], games: [0, 0], points: [1, 0] },
          to: { sets: [0, 0], games: [0, 0], points: [2, 0] },
        },
        {
          message: '30-0 -> 40-0',
          from: { sets: [0, 0], games: [0, 0], points: [2, 0] },
          to: { sets: [0, 0], games: [0, 0], points: [3, 0] },
        },
        {
          message: '40-0 -> game won',
          from: { sets: [0, 0], games: [0, 0], points: [3, 0] },
          to: { sets: [0, 0], games: [1, 0], points: [0, 0] },
        },
        {
          message: '40-40 -> AD-40',
          from: { sets: [0, 0], games: [0, 0], points: [3, 3] },
          to: { sets: [0, 0], games: [0, 0], points: [4, 3] },
        },
        {
          message: '40-40 -> AD-40 (long version)',
          from: { sets: [0, 0], games: [0, 0], points: [30, 30] },
          to: { sets: [0, 0], games: [0, 0], points: [31, 30] },
        },
        {
          message: '40-AD -> 40-40',
          from: { sets: [0, 0], games: [0, 0], points: [3, 4] },
          to: { sets: [0, 0], games: [0, 0], points: [4, 4] },
        },
        {
          message: '40-AD -> 40-40 (long version)',
          from: { sets: [0, 0], games: [0, 0], points: [20, 21] },
          to: { sets: [0, 0], games: [0, 0], points: [21, 21] },
        },
        {
          message: 'AD-40 -> game won',
          from: { sets: [0, 0], games: [0, 0], points: [4, 3] },
          to: { sets: [0, 0], games: [1, 0], points: [0, 0] },
        },
        {
          message: 'set point (0-0) -> set won',
          from: { sets: [0, 0], games: [5, 0], points: [4, 3] },
          to: { sets: [1, 0], games: [0, 0], points: [0, 0] },
        },
        {
          message: 'set point (0-1) -> set won',
          from: { sets: [0, 1], games: [5, 0], points: [4, 3] },
          to: { sets: [1, 1], games: [0, 0], points: [0, 0] },
        },
        {
          message: 'match point (1-0) -> match won',
          from: { sets: [1, 0], games: [5, 0], points: [4, 3] },
          to: { sets: [2, 0], games: [0, 0], points: [0, 0] },
        },
        {
          message: 'match point (1-1) -> match won',
          from: { sets: [1, 1], games: [5, 0], points: [4, 3] },
          to: { sets: [2, 1], games: [0, 0], points: [0, 0] },
        },
        {
          message: 'tie-break -> set won',
          from: { sets: [0, 0], games: [6, 6], points: [11, 10], isTieBreak: true },
          to: { sets: [1, 0], games: [0, 0], points: [0, 0], isTieBreak: false },
        },
        {
          message: 'tied tie-break -> advantage',
          from: { sets: [0, 0], games: [6, 6], points: [10, 10], isTieBreak: true },
          to: { sets: [0, 0], games: [6, 6], points: [11, 10], isTieBreak: true },
        },
        {
          message: 'about to lose tie-break -> even',
          from: { sets: [0, 0], games: [6, 6], points: [10, 11], isTieBreak: true },
          to: { sets: [0, 0], games: [6, 6], points: [11, 11], isTieBreak: true },
        },
      ]);

      runTestCasees('$message', ({ from, to }) => {
        expect(pointScored({ ...from, isTieBreak: from.isTieBreak ?? false }, 'A')).toEqual(
          expect.objectContaining(to),
        );
      });
    });
  });
});
