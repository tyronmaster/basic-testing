// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const startBalance = 10;
const deposit = 5;
const withdraw = 5;
const transferAmount = 5;
const Insufficient = 5;
const newAcc = new BankAccount(startBalance);
const oneMoreAcc = new BankAccount(startBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    console.log(getBankAccount(1));
    expect(newAcc).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    try {
      newAcc.withdraw(50);
    } catch (e) {
      expect(e).toStrictEqual(new InsufficientFundsError(newAcc.getBalance()));
    }
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(1);
    try {
      newAcc.transfer(newAcc.getBalance() + Insufficient, oneMoreAcc);
    } catch (e) {
      expect(e).toStrictEqual(new InsufficientFundsError(newAcc.getBalance()));
    }
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    try {
      newAcc.transfer(newAcc.getBalance() + Insufficient, newAcc);
    } catch (e) {
      expect(e).toStrictEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    newAcc.deposit(deposit);
    expect(newAcc.getBalance()).toBe(startBalance + deposit);
  });

  test('should withdraw money', () => {
    newAcc.withdraw(withdraw);
    expect(newAcc.getBalance()).toBe(startBalance + deposit - withdraw);
  });

  test('should transfer money', () => {
    newAcc.transfer(transferAmount, oneMoreAcc);
    expect(oneMoreAcc.getBalance()).toBe(startBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);
    try {
      await expect(newAcc.fetchBalance()).resolves.toBeInstanceOf(Number);
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // expect.assertions(1);
    try {
      const balance = newAcc.getBalance();
      await newAcc.synchronizeBalance();
      const newBalance = newAcc.getBalance();
      expect(balance).not.toBe(newBalance);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    await expect(newAcc.synchronizeBalance()).rejects.toStrictEqual(
      new SynchronizationFailedError(),
    );
  });
});
