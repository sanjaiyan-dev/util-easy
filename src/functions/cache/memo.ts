import { lowPriority } from "../scheduler";
import type { MemoizeParams } from "./types";

const memoize = <T extends (...args: Parameters<T>) => ReturnType<T>>({
  callback,
  optimistic = true,
}: MemoizeParams<T>) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>) => {
    const cacheKey = JSON.stringify(args);

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

export { memoize };
