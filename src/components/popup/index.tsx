import cx from "classnames";
import { FunctionComponent } from "react";
import { PopupProps } from "../../models/popup.model";
import styles from "./popup.module.scss";
import { styleobjectToCssText } from "../../effects/utils";

type PopupPlaceholderProps = {
  id: string;
  target: HTMLElement;
  height: number;
  width: number;
  position: "top" | "bottom";
};

/**
 * Creates a placeholder element for a popup component.
 * @param {PopupPlaceholderProps} props - The props object containing the id, target, height, width, and position of the popup.
 * @returns {HTMLDivElement} - The created placeholder element.
 */
const createPopupPlaceholder = ({
  id,
  target,
  height,
  width,
  position,
}: PopupPlaceholderProps): HTMLDivElement => {
  const targetRect = target.getBoundingClientRect();

  // Create the placeholder element
  const placeholder = document.createElement("div");
  placeholder.id = id;
  // placeholder.style.cssText = `
  //   position: fixed;
  //   z-index: 9999;
  //   left: ${
  //     targetRect.x - Math.round(width / 2) + Math.round(targetRect.width / 2)
  //   }px;
  //   top: ${targetRect.y + (position === "top" ? -height : targetRect.height)}px;
  //   height: ${height}px;
  //   width: ${width}px;
  // `;
  placeholder.style.cssText = styleobjectToCssText({
    position: "fixed",
    zIndex: "9999",
    left: `${
      targetRect.x - Math.round(width / 2) + Math.round(targetRect.width / 2)
    }px`,
    top: `${
      targetRect.y + (position === "top" ? -height : targetRect.height)
    }px`,
    height: `${height}px`,
    width: `${width}px`,
  });
  return placeholder;
};

const Popup: FunctionComponent<PopupProps> = ({
  type,
  data,
  position,
  targetElementRect,
}) => {
  return (
    <div className={cx(styles.wrapper)}>
      {type === "image" ? <img src={data} /> : null}
      {type === "text" ? <span>{data}</span> : null}
    </div>
  );
};

export { Popup, createPopupPlaceholder };
