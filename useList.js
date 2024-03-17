import * as React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.newList;
    case "push":
      return [...state, action.element];
    case "remove":
      return state.filter((element, index) => {
        if (index !== action.index) {
          return element;
        }
      });
    case "insert":
      return [
        ...state.slice(0, action.index),
        action.newElement,
        ...state.slice(action.index),
      ];
    case "update":
      return state.map((element, index) =>
        index === action.index ? action.updatedElement : element
      );
    case "clear":
      return [];
    default:
      throw new Error("This action isn't supported");
  }
};

export default function useList(defaultList = []) {
  const [list, dispatch] = React.useReducer(reducer, defaultList);

  const set = React.useCallback((newList) => {
    dispatch({ type: "set", newList });
  }, []);

  const push = React.useCallback((element) => {
    dispatch({ type: "push", element });
  }, []);

  const removeAt = React.useCallback((index) => {
    dispatch({ type: "remove", index });
  }, []);

  const insertAt = React.useCallback((index, newElement) => {
    dispatch({ type: "insert", index, newElement });
  }, []);

  const updateAt = React.useCallback((index, updatedElement) => {
    dispatch({ type: "update", index, updatedElement });
  }, []);

  const clear = React.useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}

/*
import * as React from "react";

export default function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((l) => {
    setList(l);
  }, []);

  const push = React.useCallback((element) => {
    setList((l) => [...l, element]);
  }, []);

  const removeAt = React.useCallback((index) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
  }, []);

  const insertAt = React.useCallback((index, element) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)]);
  }, []);

  const updateAt = React.useCallback((index, element) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)));
  }, []);

  const clear = React.useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
*/
