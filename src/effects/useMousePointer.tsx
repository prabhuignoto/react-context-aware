import { useEffect, useMemo, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { MousePointerProps } from "../models/mouse-pointer.model";
import { defaultIcons, pointerStyleDefaults } from "./default";
import { useMouseWheel } from "./useMouseWheel";

export type MousePointerFunction = (props: MousePointerProps) => void;

const useMousePointer: MousePointerFunction = ({
  container,
  mouseX,
  mouseY,
  isActive = false,
  pointerStyle = pointerStyleDefaults,
  status = "default",
  icons = defaultIcons,
}) => {
  const pointerRef = useRef<HTMLSpanElement>();

  const { scaleFactor } = useMouseWheel({
    targetRef: container,
    minScaleFactor: 0.5,
    maxScaleFactor: 3.0,
  });

  useEffect(() => {
    const pointer = pointerRef.current;
    const { size } = pointerStyle;

    if (!pointer || !size) return;

    if (isActive) {
      pointer.style.top = `${mouseY}px`;
      pointer.style.left = `${mouseX}px`;
      pointer.style.display = "block";
    } else if (!isActive) {
      pointer.style.display = "none";
    }
  }, [mouseX, mouseY, isActive, pointerRef]);

  const getSVG = useMemo(() => {
    switch (status) {
      case "busy":
        return icons?.busy;
      case "text":
        return icons?.text;
      case "hyperlink":
        return icons?.hyperlink;
      default:
        return icons?.pointer;
    }
  }, [status, icons]);

  useEffect(() => {
    const pointerElement = pointerRef.current;
    if (status && pointerElement && getSVG) {
      pointerElement.innerHTML = ReactDOMServer.renderToString(getSVG);
    }
  }, [status, getSVG]);

  useEffect(() => {
    const pointerElement = pointerRef.current;
    const { size } = pointerStyle;

    if (pointerElement && size) {
      pointerElement.style.transform = `scale(${scaleFactor})`;
    }
  }, [scaleFactor]);

  useEffect(() => {
    const parent = container.current;
    const { color, size } = pointerStyle;

    if (parent && size && getSVG) {
      const element = document.createElement("span");
      element.innerHTML = ReactDOMServer.renderToString(getSVG);
      pointerRef.current = element;
      element.style.cssText = `
        position: absolute;
        top: ${mouseY > -1 ? mouseY - size : 0}px;
        left: ${mouseX > -1 ? mouseX - size : 0}px;
        width: ${size}px;
        height: ${size}px;
        z-index: 999999;
        pointer-events: none;
        display: none;
        fill: ${color};
        user-select: none;
        color: ${color};
        padding: 0;
        `;

      parent.appendChild(element);
    }
  }, [container]);
};

export { useMousePointer };
