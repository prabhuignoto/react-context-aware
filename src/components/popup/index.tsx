import cx from "classnames";
import { FunctionComponent } from "react";
import { styleobjectToCssText } from "../../effects/utils";
import { PopupProps } from "../../models/popup.model";
import styles from "./popup.module.scss";

type PopupPlaceholderProps = {
  id: string;
};

/**
 * Creates a placeholder element for a popup component.
 * @param {PopupPlaceholderProps} props - The props object containing the id, target, height, width, and position of the popup.
 * @returns {HTMLDivElement} - The created placeholder element.
 */
const createPopupPlaceholder = ({
  id,
}: PopupPlaceholderProps): HTMLDivElement => {
  // Create the placeholder element
  const placeholder = document.createElement("div");
  placeholder.id = id;
  placeholder.style.cssText = styleobjectToCssText({
    position: "fixed",
    zIndex: "9999",
  });
  return placeholder;
};

const Popup: FunctionComponent<PopupProps> = ({ type, data }) => {
  return (
    <div className={cx(styles.wrapper)}>
      {type === "image" ? <img src={data} /> : null}
      {type === "text" ? <span>{data}</span> : null}
    </div>
  );
};

export { Popup, createPopupPlaceholder };
