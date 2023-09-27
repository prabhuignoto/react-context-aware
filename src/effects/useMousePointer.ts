import { ReactNode, RefObject, useEffect, useRef } from "react";
import PointerSVG from "../assets/pointer.svg";
import { Props } from "./core.model";
import { MouseMovementDirection } from "./mouse-position.model";

export type MousePointerProps = {
  icon?: ReactNode;
  container: RefObject<HTMLElement>;
  mouseX: number;
  mouseY: number;
  direction: MouseMovementDirection;
  isActive?: boolean;
} & Props;

export type MousePointerFunction = (props: MousePointerProps) => void;

const useMousePointer: MousePointerFunction = ({
  container,
  mouseX,
  mouseY,
  pointerSize = 14,
  isActive = false,
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

    if (parent) {
      const element = document.createElement("span");
      element.innerHTML = `
        <img src="${PointerSVG}"/>
      `;
      pointerRef.current = element;
      element.style.cssText = `
        position: absolute;
        top: ${mouseY > -1 ? mouseY : 0}px;
        left: ${mouseX > -1 ? mouseX : 0}px;
        width: ${pointerSize}px;
        height: ${pointerSize}px;
        border-radius: 50%;
        z-index: 999999;
        pointer-events: none;
        display: none;
        `;

      parent.appendChild(element);
    }
  }, [container]);
};

export { useMousePointer };
