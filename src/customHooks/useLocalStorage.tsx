import { useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.log("got error when getting the value", e);
      return initialValue;
    }
  });
  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.log("error in setting local storage", e);
    }
  };
  return [storedValue, setValue];
};
export default useLocalStorage;
