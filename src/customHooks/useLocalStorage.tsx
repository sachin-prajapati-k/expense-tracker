import { useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return (item ? JSON.parse(item) : initialValue) as T;
    } catch (e) {
      console.log("got error when getting the value", e);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.log("error in setting local storage", e);
    }
  };
  return [storedValue, setValue] as const;
};
export default useLocalStorage;
