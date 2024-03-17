import { useSyncExternalStore } from "react";

const subscribe = (callback) => {
  window.addEventListener("languagechange", callback);

  return () => window.removeEventListener("languagechange", callback);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  throw Error("usePreferredLanguage is a client-only hook");
};

export default function usePreferredLanguage() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
