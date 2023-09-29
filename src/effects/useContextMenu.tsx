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

  const handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    const _target = target.current;
    const _placeholder = placeholder.current;

    if (_target && _placeholder && !contextMenuOpen) {
      const { clientX, clientY } = ev;
      const { offsetLeft, offsetTop } = _target;
      const calcTop = clientY - offsetTop;
      const calcLeft = clientX - offsetLeft;

      _placeholder.innerHTML = menuHTMLstring.current || "";
      _placeholder.style.top = `${calcTop}px`;
      _placeholder.style.left = `${calcLeft}px`;
      _placeholder.style.visibility = "visible";

      setContextMenuOpen(true);
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
      _placeholder.className = styles.context_menu_placeholder;

      _target.append(_placeholder);
    }
  }, [target]);

  const handleClose = () => {
    const _placeholder = placeholder.current;

    if (_placeholder) {
      _placeholder.style.visibility = "hidden";
      setContextMenuOpen(false);
    }
  };

  useEffect(() => {
    const element = target.current;

    element?.addEventListener("contextmenu", handleContextMenu);
    element?.addEventListener("mousedown", handleClose);

    return () => {
      element?.removeEventListener("contextmenu", handleContextMenu);
      element?.removeEventListener("mousedown", handleClose);
    };
  }, [target]);
};

export { useContextMenu };
