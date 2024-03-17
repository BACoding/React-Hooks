import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const onEvent = React.useEffectEvent(cb);
  const intervalId = React.useRef(null);
  const immediatelyCalled = React.useRef(
    startImmediately === true ? false : null
  );

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(intervalId.current);
  }, []);

  React.useEffect(() => {
    if (when === true) {
      intervalId.current = window.setInterval(onEvent, ms);

      if (startImmediately === true && immediatelyCalled.current === false) {
        onEvent();
        immediatelyCalled.current = true;
      }
    }

    return handleClearInterval;
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
}
