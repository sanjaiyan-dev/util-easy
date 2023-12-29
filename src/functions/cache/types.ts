export interface MemoizeParams<T extends Function> {
  callback: T;
  readonly optimistic: boolean;
}
