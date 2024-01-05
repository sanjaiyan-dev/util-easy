export const enum MemoizeAsyncStatus {
  Success = "success",
  Failed = "failed",
}

export interface MemoizeParams<T> {
  readonly callback: T;
  readonly optimistic?: boolean;
}

export interface MemoizedAsyncParams<T> extends MemoizeParams<T> {
  readonly maxRetry?: number;
}
