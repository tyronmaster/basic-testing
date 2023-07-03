// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },

  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 3, b: 0, action: Action.Divide, expected: Infinity },

  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 0, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should calculate correctly simpleCalculator(%d, %d, %s)',
    ({
      a,
      b,
      action,
      expected,
    }: {
      a: number;
      b: number;
      action: string;
      expected: number;
    }) => {
      if (action === Action.Divide) {
        expect(simpleCalculator({ a, b, action })).toBeCloseTo(expected);
      } else {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      }
    },
  );
});
