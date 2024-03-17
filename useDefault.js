import { useState } from "react";

export default function useDefault(initialValue, defaultValue) {
  const [state, setState] = useState(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
}
