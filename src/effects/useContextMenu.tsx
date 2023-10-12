import { RefObject, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Menu } from "../components/menu";
import { ContextMenuOptions } from "./core.model";
import styles from "./styles.module.scss";

type UseContextMenuProps = {
  target: RefObject<HTMLElement>;
  contextMenuOptions?: ContextMenuOptions;
};

type useContextMenuFunction = (props: UseContextMenuProps) => void;

const useContextMenu: useContextMenuFunction = ({
  target,
  contextMenuOptions,
}) => {
  const menuHTMLstring = useRef<string>();
  const placeholder = useRef<HTMLDivElement>(document.createElement("div"));

  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const isFirstRender = useRef(true);

  const handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    if (ev.button !== 2) return;

    const _target = target.current;
    const _placeholder = placeholder.current;

    console.log("coming", contextMenuOpen);

    if (_target && _placeholder && !contextMenuOpen) {
      const { clientX, clientY } = ev;
      const { offsetLeft, offsetTop } = _target;
      const calcTop = clientY - offsetTop;
      const calcLeft = clientX - offsetLeft;

      _placeholder.innerHTML = menuHTMLstring.current || "";
      _placeholder.classList.add(styles.context_menu_placeholder);
      _placeholder.style.top = `${calcTop}px`;
      _placeholder.style.left = `${calcLeft}px`;

      setContextMenuOpen(true);
    }
  };

  useEffect(() => {
    const _placeholder = placeholder.current;

    if (_placeholder && !isFirstRender.current) {
      if (contextMenuOpen) {
        _placeholder.classList.remove(styles.menu_close);
        _placeholder.classList.add(styles.menu_open);
      } else {
        _placeholder.classList.remove(styles.menu_open);
        _placeholder.classList.add(styles.menu_close);
      }
    }
  }, [contextMenuOpen]);

  const handleTransitionEnd = () => {
    const _placeholder = placeholder.current;

    if (_placeholder) {
      if (contextMenuOpen) {
        _placeholder.classList.remove(styles.menu_open);
      } else {
        _placeholder.classList.remove(styles.menu_close);
      }
    }
  };

  const onSelect = () => {};

  useEffect(() => {
    const _placeholder = placeholder.current;
    const _target = target.current;

    if (_placeholder && contextMenuOptions && _target) {
      menuHTMLstring.current = renderToString(
        <Menu {...contextMenuOptions} onSelect={onSelect} />
      );

      if (!_target.contains(_placeholder)) {
        _target.append(_placeholder);
      }
    }
  }, [target]);

  const handleClose = (ev: MouseEvent) => {
    if (ev.button !== 0) return;

    const _placeholder = placeholder.current;

    if (_placeholder) {
      setContextMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, []);

  useEffect(() => {
    const element = target.current;

    element?.addEventListener("contextmenu", handleContextMenu);
    element?.addEventListener("mousedown", handleClose);
    element?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      element?.removeEventListener("contextmenu", handleContextMenu);
      element?.removeEventListener("mousedown", handleClose);
    };
  }, [target]);
};

export { useContextMenu };
