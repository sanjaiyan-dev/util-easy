import type { LowPriorityWithTimeoutParams } from "./types";

const lowPriority =
  typeof requestIdleCallback === "function"
    ? requestIdleCallback
    : queueMicrotask;

const lowPriorityWithTimeout = ({
  callback,
  timeout,
}: LowPriorityWithTimeoutParams) => {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, timeout);
  }
};

export { lowPriority, lowPriorityWithTimeout };
