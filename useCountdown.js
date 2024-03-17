import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useCountdown(endTime, options) {
  const [count, setCount] = React.useState(null);
  const intervalId = React.useRef(null);

  const onTick = React.useEffectEvent(() => {
    if (count === 0) {
      handleClearInterval();
      options.onComplete();
    } else {
      setCount(count - 1);
      options.onTick();
    }
  });

  const handleClearInterval = () => {
    window.clearInterval(intervalId.current);
  };

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    intervalId.current = window.setInterval(onTick, options.interval);

    return handleClearInterval;
  }, [options.interval]);

  return count;
}
