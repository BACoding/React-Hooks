import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...args) {
  const initialRenderRef = React.useRef(true);

  const handleLog = React.useEffectEvent((e) => {
    console.log(`${name} ${e}:`, args);
  });

  React.useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog("updated");
    }
  });

  React.useEffect(() => {
    handleLog("mounted");
    initialRenderRef.current = false;

    return () => {
      handleLog("unmounted");
      initialRenderRef.current = true;
    };
  }, []);
}
