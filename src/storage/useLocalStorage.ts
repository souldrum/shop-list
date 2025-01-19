import { LocalStorage } from "./localStorage";

export const useGetStorageData = <T>(key: string, initialValue: T[]) => {
  const list: T[] = LocalStorage.get(key, initialValue);

  return list;
};

export const useSetStorageData = <T>(key: string, value: T) => {
  LocalStorage.set(key, value);
};
