import { describe, expect, test, vi } from "vitest";

import { memoize, memoizeAsync, sqrRootMemo } from "./memo";

describe("Memoize Function", () => {
  test("Return the output", () => {
    expect(sqrRootMemo(2, 6)).toBe(Math.sqrt(2 ** 6));
  });

  test("Should update the cache when optimistic is true", async () => {
    vi.useFakeTimers();
    const expensiveFunction = vi.fn(() => Math.random());
    const memoizedExpensiveFunction = memoize({
      callback: expensiveFunction,
      optimistic: true,
    });

    const result1 = memoizedExpensiveFunction();
    const result2 = memoizedExpensiveFunction();

    expect(result1).toBe(result2);

    await vi.runAllTicks();
    await vi.runAllTimers();

    const result3 = memoizedExpensiveFunction();

    expect(result1).not.toBe(result3);
    expect(expensiveFunction).toHaveBeenCalledTimes(2);
  });
});

describe("Memoize Async Function", () => {
  test("Return the output", async () => {
    const expensiveFunction = vi.fn(async () => {
      return Promise.resolve(Math.random());
    });

    const memoizedAsyncFunction = memoizeAsync({
      callback: expensiveFunction,
      optimistic: true,
    });

    const result1 = await memoizedAsyncFunction();
    const result2 = await memoizedAsyncFunction();

    expect(result1).toBe(result2);
  });

  test("Should update the cache when optimistic is true", async () => {
    vi.useFakeTimers();
    const expensiveFunction = vi.fn(async () => {
      return Math.random();
    });
    const memoizedExpensiveFunction = memoizeAsync({
      callback: expensiveFunction,
      optimistic: true,
    });

    const result1 = await memoizedExpensiveFunction();
    const result2 = await memoizedExpensiveFunction();

    expect(result1).toBe(result2);

    await vi.runAllTicks();
    await vi.runAllTimers();
    await vi.runAllTimersAsync();

    const result3 = await memoizedExpensiveFunction();

    expect(result1).not.toBe(result3);
  });

  test("Retry when error occured", async () => {
    let errorCount = 4;
    const expensiveFunction = vi.fn(async () => {
      if (errorCount >= 0) {
        errorCount--;
        throw new Error("Ooo");
      }
      return 12;
    });
    const memoizedAsyncFunction = memoizeAsync({
      callback: expensiveFunction,
      maxRetry: 5,
    });

    const result = await memoizedAsyncFunction();

    expect(result).toBe(12);
  });
});
