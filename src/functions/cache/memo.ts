import { addTwoStrings } from "../../utils";
import { lowPriority } from "../scheduler";
import { MemoizedAsyncParams, type MemoizeParams } from "./types";

const memoize = <T extends (...args: Parameters<T>) => ReturnType<T>>({
  callback,
  optimistic = true,
}: MemoizeParams<T>) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>) => {
    const cacheKey = addTwoStrings(JSON.stringify(args), callback.toString());

    if (cache.has(cacheKey)) {
      if (optimistic) {
        lowPriority(() => {
          cache.set(cacheKey, callback(...args));
        });
      }
      return cache.get(cacheKey);
    } else {
      const result = callback(...args);
      cache.set(cacheKey, result);
      return result;
    }
  };
};

const memoizeAsync = <
  T extends (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>,
>({
  callback,
  optimistic = true,
  maxRetry = 3,
}: MemoizedAsyncParams<T>) => {
  const cache = new Map<string, ReturnType<T>>();

  return async (...args: Parameters<T>) => {
    const cacheKey = addTwoStrings(JSON.stringify(args), callback.toString());

    if (cache.has(cacheKey)) {
      if (optimistic) {
        lowPriority(() => {
          callback(...args)
            .then((resolvedValue) => {
              cache.set(cacheKey, resolvedValue);
            })
            .catch(() => {});
        });
      }
      return cache.get(cacheKey);
    } else {
      for (
        let currentRetries = 0;
        currentRetries <= maxRetry;
        currentRetries++
      ) {
        try {
          const result = await callback(...args);
          cache.set(cacheKey, result);
          return result;
        } catch {
          if (currentRetries > maxRetry) {
            throw new Error("Error");
          }
        }
      }
    }
  };
};

export { memoize, memoizeAsync };
