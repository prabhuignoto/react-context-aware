import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Popup, createPopupPlaceholder } from "../components/popup";
import { ContentType, usePopupProps } from "../models/popup.model";

const usePopup: (props: usePopupProps) => void = (props) => {
  const { containerElement } = props;

  const targetsRef = useRef<Element[] | null>();
  const activePlaceholderId = useRef("");

  // handles mouse FileSystemEntry, shows the poup on mouse enter
  const handleMouseEnter = useCallback((ev: Event) => {
    // const { height: popupHeight, width: popupWidth } = popupDimensions;
    const target = ev.target as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    const container = containerElement.current;

    const type = target.getAttribute("data-type");
    const position = target.getAttribute("data-position");
    const data = target.getAttribute("data-data");
    const id = `placeholder-${nanoid()}`;
    const popupHeight = parseInt(target.getAttribute("data-popup-height") + "");
    const popupWidth = parseInt(target.getAttribute("data-popup-width") + "");
    activePlaceholderId.current = id;

    if (data && type && position && container) {
      const placeholder = createPopupPlaceholder({
        id,
        target,
        height: popupHeight,
        width: popupWidth,
        position: "bottom",
      });

      const popupString = renderToString(
        <Popup
          type={type as ContentType}
          data={data}
          position={position}
          targetElementRect={{
            x: targetRect.x,
            y: targetRect.y,
          }}
        />,
      );
      placeholder.innerHTML = popupString;
      container.appendChild(placeholder);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const placeholder = activePlaceholderId.current;
    if (placeholder) {
      const placeholderElement = document.getElementById(placeholder);
      if (placeholderElement) {
        placeholderElement.remove();
      }
    }
  }, []);

  const handleClick = useCallback((ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  useEffect(() => {
    const element = containerElement.current;

    if (element) {
      const targets = Array.from(
        element.querySelectorAll("[data-popup='true']"),
      ) as Element[];

      if (targets.length) {
        targetsRef.current = targets;

        targets.forEach((target) => {
          target.addEventListener("mouseenter", handleMouseEnter);
          target.addEventListener("mouseleave", handleMouseLeave);
          target.addEventListener("click", handleClick);
        });
      }
    }
  }, [containerElement]);

  useEffect(() => {
    return () => {
      const targets = targetsRef.current;

      if (targets?.length) {
        targets.forEach((target) => {
          target.removeEventListener("mouseenter", handleMouseEnter);
          target.removeEventListener("mouseleave", handleMouseLeave);
          target.removeEventListener("click", handleClick);
        });
      }
    };
  }, []);
};

export { usePopup };
