import * as React from "react";

export default function useLockBodyScroll() {
  React.useLayoutEffect(() => {
    const cachedOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = cachedOverflow;
    };
  }, []);

  return () => {};
}
