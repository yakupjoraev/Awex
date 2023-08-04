import { useRef, useState, useEffect } from "react";

export function useDropdown<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  useEffect(() => {
    if (!dropdownOpened) {
      return;
    }
    const handleDocumentClick = (ev: MouseEvent) => {
      if (
        containerRef.current &&
        ev.target instanceof Element &&
        !containerRef.current.contains(ev.target)
      ) {
        setDropdownOpened(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownOpened]);

  const toggle = (opened?: boolean) => {
    if (opened === undefined) {
      setDropdownOpened(!dropdownOpened);
    } else {
      setDropdownOpened(opened);
    }
  };

  return { containerRef, opened: dropdownOpened, toggle };
}
