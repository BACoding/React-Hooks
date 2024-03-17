import * as React from "react";

export default function useTimeout(cb, ms) {
  const idRef = React.useRef(null);
  const cbRef = React.useRef(cb);

  const handleClearTimeout = React.useCallback(() => {
    window.clearTimeout(idRef.current);
  }, []);

  React.useEffect(() => {
    cbRef.current = cb;
  });

  React.useEffect(() => {
    idRef.current = window.setTimeout(cbRef.current, ms);

    return handleClearTimeout;
  }, [ms, handleClearTimeout]);

  return handleClearTimeout;
}

/*
  WE HAVE TO HACK IT BECAUSE UNLESS THE USER MEMOIZES THE CALLBACK FUNCTION, THE REFERENCE IS GOING TO CHANGE ON EVERY RENDER MEANING, ADDING THE CALLBACK FUNCTION
  TO OUT USEEFFECT RUN AT EVERY RENDER BECAUSE THE CALLBACK IS A REFERENCE VALUE AND THAT REFERENCE IS DIFFERENT ON EVERY RENDER
*/

// USING EXPERIMENTAL useEffectEvent;
/*
import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  const idRef = React.useRef(null);
  const onTimeout = React.useEffectEvent(cb);

  const handleClearTimeout = React.useCallback(() => {
    window.clearTimeout(idRef.current);
  }, []);

  React.useEffect(() => {
    idRef.current = window.setTimeout(onTimeout, ms);

    return handleClearTimeout;
  }, [ms, handleClearTimeout])
  
  return handleClearTimeout;
}
*/
