import { useEffect, useRef } from "react";
import PointerSVG from "../assets/pointer.svg";
import { MousePointerProps } from "./mouse-pointer.model";

export type MousePointerFunction = (props: MousePointerProps) => void;

const useMousePointer: MousePointerFunction = ({
  container,
  mouseX,
  mouseY,
  isActive = false,
  pointerStyle = { color: "#000", size: 20 }
  // pointerColor = "#000",
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

  useEffect(() => {
    const parent = container.current;
    const { color, size } = pointerStyle;

    if (parent) {
      const element = document.createElement("span");
      element.innerHTML = `
        <img src="${PointerSVG}" />
      `;
      pointerRef.current = element;
      element.style.cssText = `
        position: absolute;
        top: ${mouseY > -1 ? mouseY : 0}px;
        left: ${mouseX > -1 ? mouseX : 0}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        z-index: 999999;
        pointer-events: none;
        display: none;
        fill: ${color};
        `;

      parent.appendChild(element);
    }
  }, [container]);
};

export { useMousePointer };
