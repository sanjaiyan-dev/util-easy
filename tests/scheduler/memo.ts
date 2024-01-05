import { memoize, memoizeAsync } from "../../src";

const sqrRoot = (a: number, b: number) => {
  for (let i = 0; i < 10000; i++) {
    a + b;
  }
  return Math.sqrt(a ** b);
};
const sqrRootMemo = memoize({
  callback: sqrRoot,
  optimistic: true,
});

export { memoize, memoizeAsync, sqrRootMemo, sqrRoot };
