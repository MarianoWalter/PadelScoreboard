import { isGamePoint } from './GameUtils';

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
});
