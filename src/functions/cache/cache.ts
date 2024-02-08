import { addTwoStrings } from "../../utils";
import { handleLocalStorage } from "../storage";
import { CacheParams } from "./types";

const unstable_cacheFunctionBrowser = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>({
  callback,
  cacheType = "localStorage",
}: CacheParams<T>) => {
  if (cacheType === "localStorage") {
    const cacheLocalStorageInstance = handleLocalStorage(
      "util-easy:cacheFunction",
    );

    return (...args: Parameters<T>) => {
      const cacheKey = addTwoStrings(JSON.stringify(args), callback.toString());

      if (cacheLocalStorageInstance.getProperty({ key: cacheKey })) {
        return cacheLocalStorageInstance.getProperty<ReturnType<T>>({
          key: cacheKey,
        });
      } else {
        const result = callback(...args);
        cacheLocalStorageInstance.setProperty({ key: cacheKey, item: result });
        return result;
      }
    };
  }
};
export { unstable_cacheFunctionBrowser };
