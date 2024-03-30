import { useEffect, useState } from "react";

export const useDebouncedValue = (debounceValue, duration = 500) => {
  const [value, setValue] = useState(debounceValue);
  useEffect(() => {
    let timer = setTimeout(() => {
      setValue(debounceValue);
    }, duration);
    return () => clearTimeout(timer);
  }, [debounceValue, duration]);
  return value;
};
