import { lowPriority } from "../../utils";
import type { MemoizeParams } from "./types";

const memoize = <T extends (...args: any[]) => any>({
  callback,
  optimistic = true,
}: MemoizeParams<T>): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      if (optimistic) {
        lowPriority(() => {
          cache.set(key, callback(...args));
        });
      }
      return cache.get(key);
    } else {
      const result = callback(...args);
      cache.set(key, result);
      return result;
    }

    return callback(...args);
  }) as T;
};

export { memoize };
