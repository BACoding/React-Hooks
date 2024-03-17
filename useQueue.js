import * as React from "react";

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = React.useCallback((element) => {
    setQueue((array) => {
      return [...array, element];
    });
  }, []);

  const remove = React.useCallback(() => {
    let removedElement;

    setQueue(([first, ...array]) => {
      removedElement = first;

      return array;
    });

    return removedElement;
  }, []);

  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  };
}
