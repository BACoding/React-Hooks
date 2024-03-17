import * as React from "react";

export default function useMouse() {
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const handleMouseMove = (e) => {
      let newState = {
        x: e.pageX,
        y: e.pageY,
      };

      if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();

        newState.elementX = e.pageX - left + window.scrollX;
        newState.elementY = e.pageY - top + window.scrollY;
        newState.elementPositionX = left + window.scrollX;
        newState.elementPositionY = top + window.scrollY;
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        };
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return [state, ref];
}
