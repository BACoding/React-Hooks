import * as React from "react";

export default function useWindowSize() {
  const [size, setSize] = React.useState({
    height: null,
    width: null,
  });

  React.useLayoutEffect(() => {
    const handleWindowSize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return size;
}
