import { bench, describe } from "vitest";
import { sqrRoot, sqrRootMemo } from "./memo";

describe("Memoize Benchmark", () => {
  bench("Memoized Function", () => {
    for (let i = 0; i < 100; i++) {
      sqrRootMemo(89, 90);
    }
  });

  bench("Non-memoized Function", () => {
    for (let i = 0; i < 100; i++) {
      sqrRoot(89, 90);
    }
  });
});
