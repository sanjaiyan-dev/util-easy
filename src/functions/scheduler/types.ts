export interface LowPriorityWithTimeoutParams {
  readonly callback: IdleRequestCallback;
  readonly timeout: number;
}
