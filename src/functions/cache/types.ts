type LocalStorageCache = "force-static" | "local-storage";
type SessionCache = "session-storage" | "";
export type CacheType = LocalStorageCache | SessionCache;

export interface MemoizeParams<T> {
  callback: T;
  readonly optimistic?: boolean;
}
