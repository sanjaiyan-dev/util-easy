import { lowPriority } from "../scheduler";
import { addTwoStrings } from "../../utils";
import type {
  handleStorage_getPropertyParams,
  handleStorage_removePropertyParams,
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

  const clearProperty = <ReturnType>({
    key,
  }: handleStorage_removePropertyParams) => {
    const mainKey = addTwoStrings(id, key);
    const currentPropertyInKey = storage.getItem(mainKey);

    if (currentPropertyInKey === null) {
      return {
        success: false,
        reason: "Unable to find any property with the given key.",
      };
    }
    cache.delete(mainKey);
    storage.removeItem(mainKey);
    return {
      success: true,
      item: JSON.parse(currentPropertyInKey) as ReturnType,
    };
  };

  const clearAll = () => {
    storage.clear();
    cache.clear();
  };

  return {
    setProperty,
    getProperty,
    clearProperty,
    clearAll,
  };
};

export { handleSessionStorage };
