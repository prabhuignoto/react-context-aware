import { useCallback, useEffect, useRef, useState } from "react";
import { useThrottledCallback } from "use-debounce";
import { PointerStatus } from "../models/core.model";
import {
  MousePositionFunction,
  MousePositionType,
} from "../models/mouse-position.model";
import { getDirection } from "./utils";

/**
 * A custom React hook that provides the current mouse position and status relative to a target element.
 */
const useMousePosition: MousePositionFunction = ({ targetRef, isSelected }) => {
  const [position, setPosition] = useState<MousePositionType>({
    x: -1,
    y: -1,
    direction: null,
    isActive: false,
    pointerStatus: "default",
  });
  const [isActive, setIsActive] = useState(false);
  const activePointerStatus = useRef<PointerStatus>("default");

  // Event handlers are now individual functions, improving modularity
  const updatePosition = useCallback(
    (x: number, y: number, movX: number, movY: number) => {
      const direction = getDirection(movX, movY);
      setPosition({
        x,
        y,
        direction,
        isActive: true,
        pointerStatus: activePointerStatus.current,
      });
    },
    []
  );

  const updatePointerStatus = useCallback((pointerStatus: PointerStatus) => {
    activePointerStatus.current = pointerStatus;
    setPosition((prev) => ({ ...prev, pointerStatus }));
  }, []);

  // Wrap the logic for mouse movement in a throttled callback
  const handleMouseMove = useThrottledCallback((ev: MouseEvent) => {
    const target = targetRef.current;
    if (target) {
      const { clientX, clientY, movementX, movementY } = ev;
      const { offsetLeft, offsetTop } = target; // Access offset properties from the target element
      updatePosition(
        clientX - offsetLeft,
        clientY - offsetTop,
        movementX,
        movementY
      );
    }
  }, 5);

  // Set up modular functions for mouse enter and leave
  const determinePointerStatus = useCallback(
    (target: HTMLElement): PointerStatus => {
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        return "hyperlink";
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return "text";
      }
      return "default";
    },
    []
  );

  const handleMouseEnter = useCallback(
    (ev: MouseEvent) => {
      if (isSelected) return;

      const pointerStatus = determinePointerStatus(ev.target as HTMLElement);
      updatePointerStatus(pointerStatus);
      setIsActive(true);
    },
    [isSelected, determinePointerStatus, updatePointerStatus]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setPosition((prev) => ({ ...prev, isActive: false }));
  }, []);

  // Attach event listeners in an effect hook
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ...position, isActive };
};

export { useMousePosition };
