import { useCallback, useEffect, useRef, useState } from "react";
import { PointerStatus } from "../models/core.model";
import {
  MousePositionFunction,
  MousePositionType,
} from "../models/mouse-position.model";
import { getDirection } from "./utils";

/**
 * Returns the current position of the mouse relative to the target element.
 * @param props - The props object.
 * @param props.targetRef - The ref object for the target element.
 * @returns An object containing the current position of the mouse and whether the mouse is active or not.
 */
const useMousePosition: MousePositionFunction = (props) => {
  const { targetRef } = props;
  const [isActive, setIsActive] = useState(false);
  const activePointerStatus = useRef<PointerStatus>("default");

  const [position, setPosition] = useState<MousePositionType>({
    x: -1,
    y: -1,
    direction: null,
    isActive: false,
    pointerStatus: "default",
  });

  /**
   * Handles the mousemove event and updates the position state.
   * @param ev - The mousemove event.
   */
  const handleMouseMove = (ev: MouseEvent) => {
    const target = targetRef.current;

    if (target) {
      const movX = ev.movementX;
      const movY = ev.movementY;
      const { offsetLeft, offsetTop } = target;
      setPosition((prev) => ({
        ...prev,
        x: ev.clientX - offsetLeft,
        y: ev.clientY - offsetTop,
        direction: getDirection(movX, movY),
        isActive: true,
      }));
    }
  };

  /**
   * Handles the mouseenter event and sets the isActive state to true.
   */
  const handleMouseEnter = useCallback((ev: MouseEvent) => {
    const target = ev.target as HTMLElement;

    if (target.tagName === "A" || target.tagName === "BUTTON") {
      activePointerStatus.current = "hyperlink";
      setPosition((prev) => ({ ...prev, pointerStatus: "hyperlink" }));
    } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
      setPosition((prev) => ({ ...prev, pointerStatus: "text" }));
      activePointerStatus.current = "text";
    } else {
      setPosition((prev) => ({ ...prev, pointerStatus: "default" }));
      activePointerStatus.current = "default";
    }

    setIsActive(true);
  }, []);

  /**
   * Handles the mouseleave event and sets the isActive state to false.
   */
  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseover", handleMouseEnter);
    element.addEventListener("mouseout", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseover", handleMouseEnter);
      element.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [targetRef]);

  return { ...position, isActive };
};

export { useMousePosition };
