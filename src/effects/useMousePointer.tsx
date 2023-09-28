import { useEffect, useMemo, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import HandUpSVG from "../assets/hand-up.svg";
import BusySVG from "../assets/hour-glass.svg";
import PointerSVG from "../assets/pointer.svg";
import TextSVG from "../assets/text.svg";
import { pointerStyleDefaults } from "./default";
import { MousePointerProps } from "./mouse-pointer.model";

export type MousePointerFunction = (props: MousePointerProps) => void;

const useMousePointer: MousePointerFunction = ({
  container,
  mouseX,
  mouseY,
  isActive = false,
  pointerStyle = pointerStyleDefaults,
  status = "default",
}) => {
  const pointerRef = useRef<HTMLSpanElement>();

  useEffect(() => {
    const pointer = pointerRef.current;

    if (!pointer) return;

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
        return BusySVG;
      case "text":
        return TextSVG;
      case "hyperlink":
        return HandUpSVG;
      default:
        return PointerSVG;
    }
  }, [status]);

  const getImage = useMemo(() => {
    return (
      <img
        src={getSVG}
        style={{
          fill: "red",
          width: "50%",
          height: "50%",
          left: 0,
          top: 0,
          position: "absolute",
        }}
      />
    );
  }, [getSVG]);

  useEffect(() => {
    const pointerElement = pointerRef.current;
    if (status && pointerElement) {
      pointerElement.innerHTML = ReactDOMServer.renderToString(getImage);
    }
  }, [status]);

  useEffect(() => {
    const parent = container.current;
    const { color, size } = pointerStyle;

    if (parent && size) {
      const element = document.createElement("span");
      element.innerHTML = ReactDOMServer.renderToString(getImage);
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
