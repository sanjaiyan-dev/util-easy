export interface handleStorage_setPropertyParams<T> {
  readonly key: string;
  readonly item: T;
}

export interface handleStorage_getPropertyParams {
  readonly key: string;
}

export interface handleStorage_removePropertyParams
  extends handleStorage_getPropertyParams {}
