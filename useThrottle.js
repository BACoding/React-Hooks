import * as React from "react";

export default function useThrottle(value, interval = 500) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      setThrottledValue(value);
      lastUpdated.current = now;
    } else {
      const id = window.setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = now;
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}
