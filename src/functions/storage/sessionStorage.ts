import { lowPriority } from "../scheduler";
import { addTwoStrings } from "../../utils";
import type {
  handleStorage_getPropertyParams,
  handleStorage_setPropertyParams,
} from "./types";

const handleSessionStorage = (id: string = "") => {
  const storage = window?.sessionStorage;
  const cache = new Map();

  const setProperty = <T>({
    key,
    item,
  }: handleStorage_setPropertyParams<T>) => {
    const mainKey = addTwoStrings(id, key);

    lowPriority(() => {
      cache.set(mainKey, JSON.stringify(item));
    });
    storage.setItem(mainKey, JSON.stringify(item));
  };

  const getProperty = <ReturnType>({
    key,
  }: handleStorage_getPropertyParams): ReturnType | null => {
    const mainKey = addTwoStrings(id, key);
    if (cache.has(mainKey)) {
      return JSON.parse(cache.get(mainKey));
    } else {
      return JSON.parse(storage.getItem(mainKey)!);
    }
  };

  const clearAll = () => {
    storage.clear();
    cache.clear();
  };

  return {
    setProperty,
    getProperty,
    clearAll,
  };
};

export { handleSessionStorage };
