import type { GameValue, Step, Team } from './domain/Game';
import {
  isGamePoint,
  isMatchPoint,
  isSetFinished,
  isSetPoint,
  parseGamePoints,
  pointScored,
} from './GameUtils';

const service: Team = 'A';

describe('Game Utils', () => {
  describe('"isGamePoint" function', () => {
    it('when it is not a tie-break', () => {
      const sets: Step['sets'] = [[3, 4]];
      const props = { sets, service };

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
      const sets: Step['sets'] = [[6, 6]];
      const props = { sets, service };

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
      expect(isSetPoint({ service, sets: [[5, 0]], points: [0, 0] })).toBe(false);
      expect(isSetPoint({ service, sets: [[5, 0]], points: [3, 3] })).toBe(false);
      expect(isSetPoint({ service, sets: [[5, 5]], points: [3, 0] })).toBe(false);
      expect(isSetPoint({ service, sets: [[6, 6]], points: [0, 0] })).toBe(false);
      expect(isSetPoint({ service, sets: [[6, 6]], points: [3, 0] })).toBe(false);
      expect(isSetPoint({ service, sets: [[6, 6]], points: [3, 3] })).toBe(false);
      expect(isSetPoint({ service, sets: [[6, 6]], points: [15, 15] })).toBe(false);
    });

    it('returns "A"', () => {
      expect(isSetPoint({ service, sets: [[5, 2]], points: [3, 0] })).toBe('A');
      expect(isSetPoint({ service, sets: [[5, 2]], points: [4, 3] })).toBe('A');
      expect(isSetPoint({ service, sets: [[5, 2]], points: [9, 8] })).toBe('A');
      expect(isSetPoint({ service, sets: [[6, 6]], points: [6, 0] })).toBe('A');
      expect(isSetPoint({ service, sets: [[6, 6]], points: [15, 14] })).toBe('A');
    });

    it('returns "B"', () => {
      expect(isSetPoint({ service, sets: [[2, 5]], points: [0, 3] })).toBe('B');
      expect(isSetPoint({ service, sets: [[2, 5]], points: [3, 4] })).toBe('B');
      expect(isSetPoint({ service, sets: [[2, 5]], points: [8, 9] })).toBe('B');
      expect(isSetPoint({ service, sets: [[6, 6]], points: [0, 6] })).toBe('B');
      expect(isSetPoint({ service, sets: [[6, 6]], points: [14, 15] })).toBe('B');
    });
  });

  describe('"isMatchPoint" function', () => {
    it('returns false', () => {
      expect(isMatchPoint({ service, sets: [[0, 0]], points: [0, 0] })).toBe(false);
      expect(isMatchPoint({ service, sets: [[5, 0]], points: [3, 0] })).toBe(false);

      expect(
        isMatchPoint({
          service,
          sets: [
            [0, 6],
            [5, 0],
          ],
          points: [3, 0],
        }),
      ).toBe(false);

      expect(
        isMatchPoint(
          {
            service,
            sets: [
              [6, 0],
              [5, 0],
            ],
            points: [3, 0],
          },
          5,
        ),
      ).toBe(false);
    });

    it('returns "A"', () => {
      const points: [number, number] = [3, 0];
      const props = { points, service };

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [6, 0],
            [5, 0],
          ],
        }),
      ).toBe('A');

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [6, 4],
            [3, 6],
            [5, 0],
          ],
        }),
      ).toBe('A');

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [6, 4],
            [6, 6],
          ],
          points: [10, 9],
        }),
      ).toBe('A');
    });

    it('returns "B"', () => {
      const points: [number, number] = [0, 3];
      const props = { points, service };

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [0, 6],
            [0, 5],
          ],
        }),
      ).toBe('B');

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [4, 6],
            [6, 3],
            [0, 5],
          ],
        }),
      ).toBe('B');

      expect(
        isMatchPoint({
          ...props,
          sets: [
            [4, 6],
            [6, 6],
          ],
          points: [9, 10],
        }),
      ).toBe('B');
    });
  });

  describe('"pointScored" function', () => {
    describe('when team A scored', () => {
      type TestCase = {
        message: string;
        from: Omit<Step, 'service'>;
        to: Omit<Step, 'service'>;
      };

      const runTestCases = test.each<TestCase>([
        {
          message: '0-0 -> 15-0',
          from: { sets: [[0, 0]], points: [0, 0] },
          to: { sets: [[0, 0]], points: [1, 0] },
        },
        {
          message: '15-0 -> 30-0',
          from: { sets: [[0, 0]], points: [1, 0] },
          to: { sets: [[0, 0]], points: [2, 0] },
        },
        {
          message: '30-0 -> 40-0',
          from: { sets: [[0, 0]], points: [2, 0] },
          to: { sets: [[0, 0]], points: [3, 0] },
        },
        {
          message: '40-0 -> game won',
          from: { sets: [[0, 0]], points: [3, 0] },
          to: { sets: [[1, 0]], points: [0, 0] },
        },
        {
          message: '40-40 -> AD-40',
          from: { sets: [[0, 0]], points: [3, 3] },
          to: { sets: [[0, 0]], points: [4, 3] },
        },
        {
          message: '40-40 -> AD-40 (long version)',
          from: { sets: [[0, 0]], points: [30, 30] },
          to: { sets: [[0, 0]], points: [31, 30] },
        },
        {
          message: '40-AD -> 40-40',
          from: { sets: [[0, 0]], points: [3, 4] },
          to: { sets: [[0, 0]], points: [4, 4] },
        },
        {
          message: '40-AD -> 40-40 (long version)',
          from: { sets: [[0, 0]], points: [20, 21] },
          to: { sets: [[0, 0]], points: [21, 21] },
        },
        {
          message: 'AD-40 -> game won',
          from: { sets: [[0, 0]], points: [4, 3] },
          to: { sets: [[1, 0]], points: [0, 0] },
        },
        {
          message: 'set point (0-0) -> set won',
          from: { sets: [[5, 0]], points: [4, 3] },
          to: {
            sets: [
              [6, 0],
              [0, 0],
            ],
            points: [0, 0],
          },
        },
        {
          message: 'set point (0-1) -> set won',
          from: {
            sets: [
              [0, 6],
              [5, 0],
            ],
            points: [4, 3],
          },
          to: {
            sets: [
              [0, 6],
              [6, 0],
              [0, 0],
            ],
            points: [0, 0],
          },
        },
        {
          message: 'match point (1-0) -> match won',
          from: {
            sets: [
              [6, 0],
              [5, 0],
            ],
            points: [4, 3],
          },
          to: {
            sets: [
              [6, 0],
              [6, 0],
              [0, 0],
            ],
            points: [0, 0],
          },
        },
        {
          message: 'match point (1-1) -> match won',
          from: {
            sets: [
              [6, 0],
              [0, 6],
              [5, 0],
            ],
            points: [4, 3],
          },
          to: {
            sets: [
              [6, 0],
              [0, 6],
              [6, 0],
              [0, 0], //TODO remove extra set
            ],
            points: [0, 0],
          },
        },
        {
          message: 'tie-break -> set won',
          from: { sets: [[6, 6]], points: [11, 10] },
          to: {
            sets: [
              [7, 6],
              [0, 0],
            ],
            points: [0, 0],
          },
        },
        {
          message: 'tied tie-break -> advantage',
          from: { sets: [[6, 6]], points: [10, 10] },
          to: { sets: [[6, 6]], points: [11, 10] },
        },
        {
          message: 'about to lose tie-break -> even',
          from: { sets: [[6, 6]], points: [10, 11] },
          to: { sets: [[6, 6]], points: [11, 11] },
        },
      ]);

      runTestCases('$message', ({ from, to }) => {
        expect(pointScored({ ...from, service: 'A' }, 'A')).toEqual(expect.objectContaining(to));
      });
    });

    //TODO when team B scored
  });

  describe('"parseGamePoints" function', () => {
    describe('when not in tie-break', () => {
      type TestCase = {
        from: [number, number];
        to: [GameValue, GameValue];
      };

      test.each<TestCase>([
        { from: [0, 0], to: [0, 0] },
        { from: [0, 1], to: [0, 15] },
        { from: [0, 2], to: [0, 30] },
        { from: [0, 3], to: [0, 40] },
        { from: [0, 3], to: [0, 40] },
        { from: [1, 3], to: [15, 40] },
        { from: [2, 3], to: [30, 40] },
        { from: [3, 3], to: [40, 40] },
        { from: [4, 4], to: [40, 40] },
        { from: [10, 10], to: [40, 40] },
        { from: [4, 3], to: ['AD', 40] },
        { from: [5, 4], to: ['AD', 40] },
        { from: [15, 14], to: ['AD', 40] },
        { from: [3, 4], to: [40, 'AD'] },
        { from: [4, 5], to: [40, 'AD'] },
        { from: [14, 15], to: [40, 'AD'] },
      ])('$from should be parsed to $to', ({ from, to }) => {
        expect(parseGamePoints(from, false)).toEqual(to);
      });
    });

    describe('when in tie-break', () => {
      type TestCase = { value: [number, number] };

      test.each<TestCase>([
        { value: [0, 0] },
        { value: [0, 1] },
        { value: [0, 2] },
        { value: [0, 3] },
        { value: [0, 3] },
        { value: [1, 3] },
        { value: [2, 3] },
        { value: [3, 3] },
        { value: [4, 4] },
        { value: [10, 10] },
        { value: [4, 3] },
        { value: [5, 4] },
        { value: [15, 14] },
        { value: [3, 4] },
        { value: [4, 5] },
        { value: [14, 15] },
      ])('$value should be $value', ({ value }) => {
        expect(parseGamePoints(value, true)).toEqual(value);
      });
    });
  });

  describe('"isSetFinished" function', () => {
    it('should return true when set is finished', () => {
      expect(isSetFinished([6, 0])).toBe(true);
      expect(isSetFinished([6, 1])).toBe(true);
      expect(isSetFinished([6, 2])).toBe(true);
      expect(isSetFinished([6, 3])).toBe(true);
      expect(isSetFinished([6, 4])).toBe(true);
      expect(isSetFinished([7, 6])).toBe(true);
      expect(isSetFinished([0, 6])).toBe(true);
      expect(isSetFinished([1, 6])).toBe(true);
      expect(isSetFinished([2, 6])).toBe(true);
      expect(isSetFinished([3, 6])).toBe(true);
      expect(isSetFinished([4, 6])).toBe(true);
      expect(isSetFinished([6, 7])).toBe(true);
    });

    it('should return false when set is not finished', () => {
      expect(isSetFinished([0, 0])).toBe(false);
      expect(isSetFinished([1, 1])).toBe(false);
      expect(isSetFinished([2, 2])).toBe(false);
      expect(isSetFinished([3, 3])).toBe(false);
      expect(isSetFinished([4, 4])).toBe(false);
      expect(isSetFinished([5, 5])).toBe(false);
      expect(isSetFinished([6, 6])).toBe(false);

      expect(isSetFinished([0, 1])).toBe(false);
      expect(isSetFinished([0, 5])).toBe(false);
      expect(isSetFinished([3, 5])).toBe(false);
      expect(isSetFinished([4, 1])).toBe(false);
      expect(isSetFinished([6, 5])).toBe(false);
      expect(isSetFinished([5, 6])).toBe(false);
    });
  });
});
