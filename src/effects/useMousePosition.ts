import { useCallback, useEffect, useState } from "react";
import {
  MoousePositionType,
  MousePositionFunction,
} from "./mouse-position.model";
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

  const [position, setPosition] = useState<MoousePositionType>({
    x: -1,
    y: -1,
    direction: null,
    isActive: false,
  });

  /**
   * Handles the mousemove event and updates the position state.
   * @param ev - The mousemove event.
   */
  const handleMouseMove = (ev: MouseEvent) => {
    const movX = ev.movementX;
    const movY = ev.movementY;
    const target = targetRef.current;

    if (target) {
      const { offsetLeft, offsetTop } = target;
      setPosition({
        x: ev.clientX - offsetLeft,
        y: ev.clientY - offsetTop,
        direction: getDirection(movX, movY),
        isActive: true,
      });
    }
  };

  /**
   * Handles the mouseenter event and sets the isActive state to true.
   */
  const handleMouseEnter = useCallback(() => {
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
