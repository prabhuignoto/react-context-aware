import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { selectionStyleDefaults } from "./default";
import {
  MouseSelectionDimensions,
  MouseSelectionFunction,
} from "./mouse-selection.model";
import { useContextMenu } from "./useContextMenu";
import { useMousePointer } from "./useMousePointer";
import { useMousePosition } from "./useMousePosition";
import { getSelectionDiv } from "./utils";

const useMouseSelection: MouseSelectionFunction = ({
  targetRef,
  pointerStyle = { color: "#000", size: 20 },
  selectionStyle = selectionStyleDefaults,
  status = "default",
  contextMenu,
}) => {
  const pressed = useRef(false);
  const targetElement = useRef<HTMLElement>();
  const selectionRef = useRef<HTMLSpanElement>();
  const {
    x: mouseX,
    y: mouseY,
    direction,
    isActive,
    pointerStatus,
  } = useMousePosition({ targetRef });
  const startMousePosition = useRef<{ x: number; y: number }>({
    x: mouseX,
    y: mouseY,
  });

  const [dimensions, setDimensions] = useState<MouseSelectionDimensions>({
    width: 0,
    height: 0,
    flipX: false,
    flipY: false,
  });

  useContextMenu({
    target: targetRef,
    contextMenuOptions: contextMenu,
  });

  useMousePointer({
    container: targetRef,
    mouseX,
    mouseY,
    direction,
    pointerStyle,
    isActive,
    status: pointerStatus,
  });

  const handleMouseDown = useCallback(
    (ev: MouseEvent) => {
      if (status === "default") {
        pressed.current = true;
        const { clientX, clientY } = ev;
        const target = targetRef.current;

        if (target) {
          const { offsetLeft, offsetTop } = target;
          startMousePosition.current = {
            x: clientX - offsetLeft,
            y: clientY - offsetTop,
          };
        }
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseUp = useCallback(() => {
    pressed.current = false;
    startMousePosition.current = {
      x: 0,
      y: 0,
    };
    setDimensions({
      width: 0,
      height: 0,
    });
  }, []);

  useEffect(() => {
    if (!isActive) {
      setDimensions({
        width: 0,
        height: 0,
      });
      pressed.current = false;
      startMousePosition.current = {
        x: 0,
        y: 0,
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (pressed.current) {
      const { x: startX, y: startY } = startMousePosition.current;
      let flipX = false;
      let flipY = false;

      if (mouseX < startX) {
        flipX = true;
      }

      if (mouseY < startY) {
        flipY = true;
      }

      setDimensions({
        width: Math.abs(mouseX - startX),
        height: Math.abs(mouseY - startY),
        flipX,
        flipY,
      });
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (targetRef.current) {
      const element = targetRef.current as HTMLElement;
      targetElement.current = element;
      element.style.position = "relative";

      element.addEventListener("mousedown", handleMouseDown);
      element.addEventListener("mouseup", handleMouseUp);

      element.style.cursor = "none";

      element.querySelectorAll("a, input, textarea, button").forEach((el) => {
        const ele = el as HTMLElement;
        ele.style.cursor = "none";
      });

      const span = getSelectionDiv({
        ...selectionStyle,
      });
      selectionRef.current = span;
      element.appendChild(span);
    }

    return () => {
      if (targetElement) {
        const element = targetElement.current as HTMLElement;
        element?.removeEventListener("mousedown", handleMouseDown);
        element?.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [targetRef]);

  const returnValue = useMemo(() => {
    const { width, height, flipX, flipY } = dimensions;
    const { x, y } = startMousePosition.current;

    if (isActive && width && width > 0 && height && height > 0) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        flipX: !!flipX,
        flipY: !!flipY,
      };
    } else {
      return {
        x: -1,
        y: -1,
        width: 0,
        height: 0,
      };
    }
  }, [dimensions, startMousePosition, isActive]);

  useEffect(() => {
    const selection = selectionRef.current;
    const { height, width, x, flipX, flipY, y } = returnValue;

    if (selection) {
      selection.style.width = `${width}px`;
      selection.style.height = `${height}px`;
      selection.style.left = (flipX ? x - width : x) + "px";
      selection.style.top = (flipY ? y - height : y) + "px";
    }
  }, [returnValue, selectionRef]);
};

export { useMouseSelection };
