let storage: Storage;

export const setStorage = (value: Storage) => {
  storage = value;
};

if (typeof window !== "undefined") {
  setStorage(window.localStorage);
}

export class LocalStorage {
  static get<T>(key: string, initialValue: T) {
    const value = storage.getItem(key);
    if (typeof value !== "string") return initialValue;

    try {
      return JSON.parse(value);
    } catch {
      return initialValue;
    }
  }

  static set(key: string, value: unknown) {
    storage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    storage.removeItem(key);
  }

  static clear() {
    storage.clear();
  }

  static getLength() {
    return localStorage.length;
  }
}
