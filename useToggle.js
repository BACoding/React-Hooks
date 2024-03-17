import { useState, useCallback } from "react";

export default function useToggle(initialValue = true) {
  const [toggle, setToggle] = useState(() => {
    if (typeof initialValue === "boolean") {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const handleToggle = useCallback((value) => {
    if (typeof value === "boolean") {
      return setToggle(value);
    }

    return setToggle((value) => !value);
  }, []);

  return [toggle, handleToggle];
}
