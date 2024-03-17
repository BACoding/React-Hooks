import { useEffect } from "react";

export default function useFavicon(path) {
  useEffect(() => {
    let link = document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = path;
      document.head.appendChild(link);
    } else {
      link.href = path;
    }
  }, [path]);
}
