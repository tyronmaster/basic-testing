// Uncomment the code below and write your tests
// import exp from 'constants';
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    await expect(resolveValue('value')).resolves.toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect.assertions(1);
    try {
      throwError('Big bada boom error');
    } catch (e) {
      expect(e).toStrictEqual(new Error('Big bada boom error'));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError();
    } catch (e) {
      expect(e).toStrictEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (e) {
      expect(e).toStrictEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(rejectCustomError()).rejects.toStrictEqual(
      new MyAwesomeError(),
    );
  });
});
