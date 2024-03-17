import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function usePageLeave(cb) {
  const onLeave = React.useEffectEvent((e) => {
    const destination = e.relatedTarget || e.toElement;
    if (!destination || destination.nodeName === "HTML") {
      cb();
    }
  });

  React.useEffect(() => {
    document.addEventListener("mouseout", onLeave);

    return () => document.removeEventListener("mouseout", onLeave);
  }, []);
}
