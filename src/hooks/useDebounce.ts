import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): [T, T, (value: T) => void] {
  const [currentValue, setCurrentValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(currentValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentValue, delay]);

  const setValue = (value: T) => {
    setCurrentValue(value);
  };

  return [currentValue, debouncedValue, setValue];
}
