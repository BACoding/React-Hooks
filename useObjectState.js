import * as React from "react";

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue) {
  const [state, setState] = React.useState(initialValue);

  const handleUpdateState = React.useCallback((argument) => {
    if (typeof argument === "function") {
      const newValue = argument(state);

      if (Object.prototype.toString.call(newValue) === "[object Object]") {
        setState((s) => ({
          ...s,
          ...newValue,
        }));
      }
    }

    if (Object.prototype.toString.call(argument) === "[object Object]") {
      setState((s) => ({
        ...s,
        ...argument,
      }));
    }
  }, []);

  return [state, handleUpdateState];
}
