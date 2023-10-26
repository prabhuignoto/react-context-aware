import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Popup } from "../components/popup";
import {
  ContentType,
  PopupPosition,
  TargetRect,
  popupDimensions,
  usePopupProps,
} from "../models/popup.model";
import { createPopupPlaceholder, getAllHtmlAttrValues } from "./utils";

const usePopup: (props: usePopupProps) => void = (props) => {
  const { containerElement, popupGap = 0 } = props;

  const targetsRef = useRef<Element[] | null>();
  const activePlaceholderId = useRef("");
  const placeHolderRef = useRef<HTMLElement | null>(null);

  // this tracks the current active popup type
  const [activePopupType, setActivePopupType] = useState<ContentType>("text");

  // this tracks the current active popup data
  const [activePopupData, setActivePopupData] = useState<string>("");

  // this tracks the current active popup dimensions
  const [activePopupDimensions, setActivePopupDimensions] =
    useState<popupDimensions>({
      height: 0,
      width: 0,
    });

  // this tracks the current active target rect
  const [activeTargetRect, setActiveTargetRect] = useState<TargetRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // this tracks the current active popup position
  const [activePopupPosition, setActivePopupPosition] =
    useState<PopupPosition>("bottom");

  useEffect(() => {
    // create the placeholder element
    const id = `placeholder-${nanoid()}`;

    const placeholder = createPopupPlaceholder({
      id,
    });

    // insert it into the container element
    if (placeholder) {
      placeHolderRef.current = placeholder;
      containerElement.current?.appendChild(placeholder);
    }
  }, []);

  const getPopupString = useMemo(() => {
    const popupString = renderToString(
      <Popup type={activePopupType as ContentType} data={activePopupData} />,
    );

    return popupString;
  }, [activePopupData, activePopupType]);

  // handles mouse FileSystemEntry, shows the poup on mouse enter
  const handleMouseEnter = useCallback((ev: Event) => {
    // const { height: popupHeight, width: popupWidth } = popupDimensions;
    const target = ev.target as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    const container = containerElement.current;

    const [type, position, content, popupHeight, popupWidth] =
      getAllHtmlAttrValues({
        ele: target,
        names: ["type", "position", "content", "height", "width"],
      });

    const id = `placeholder-${nanoid()}`;
    activePlaceholderId.current = id;

    if (content && type && position && container) {
      setActivePopupData(content);
      setActivePopupType(type as ContentType);
      setActivePopupPosition(position as "top" | "bottom");
      setActiveTargetRect({
        x: targetRect.x,
        y: targetRect.y,
        width: targetRect.width,
        height: targetRect.height,
      });
      setActivePopupDimensions({
        height: Number(popupHeight),
        width: Number(popupWidth),
      });
    }
  }, []);

  useEffect(() => {
    if (getPopupString) {
      const placeholder = placeHolderRef.current;
      if (placeholder) {
        placeholder.innerHTML = getPopupString;
      }
    }
  }, [getPopupString]);

  useEffect(() => {
    const { width, height } = activePopupDimensions;
    const { x, y, width: targetWidth, height: targetHeight } = activeTargetRect;
    const placeholder = placeHolderRef.current;
    let left = 0;
    let top = 0;

    if (activePopupPosition === "top" || activePopupPosition === "bottom") {
      left = x - Math.round(width / 2) + targetWidth / 2;
      top = y + (activePopupPosition === "top" ? -height : targetHeight);
    } else if (
      activePopupPosition === "left" ||
      activePopupPosition === "right"
    ) {
      left =
        x +
        (activePopupPosition === "left"
          ? -(width + popupGap)
          : targetWidth + popupGap);
      top = y - Math.round(height / 2) + targetHeight / 2;
    }

    if (placeholder) {
      placeholder.style.cssText += `
        position: fixed;
        z-index: 9999;
        left: ${left}px;
        top: ${top}px;
        height: ${height}px;
        width: ${width}px;
      `;
    }
  }, [
    activePopupDimensions,
    activePopupPosition,
    activeTargetRect.x,
    activeTargetRect.y,
  ]);

  const handleMouseLeave = useCallback(() => {
    const placeHolder = placeHolderRef.current;

    if (placeHolder) {
      placeHolder.innerHTML = "";
      setActivePopupData("");
      setActivePopupDimensions({
        height: 0,
        width: 0,
      });
      setActiveTargetRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
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
