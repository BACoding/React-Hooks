import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useRandomInterval(cb, { minDelay, maxDelay }) {
  const onInterval = React.useEffectEvent(cb);
  const intervalId = React.useRef(null);

  const handleClearInterval = React.useCallback(() => {
    return window.clearTimeout(intervalId.current);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const interval = getRandomNumber(minDelay, maxDelay);
      intervalId.current = window.setTimeout(() => {
        onInterval();
        tick();
      }, interval);
    };

    tick();

    return handleClearInterval;
  }, [minDelay, maxDelay, handleClearInterval]);

  return handleClearInterval;
}
