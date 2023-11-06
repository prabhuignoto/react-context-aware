import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MouseSelectionDimensions,
  MouseSelectionFunction,
} from '../models/mouse-selection.model';
import { defaultIcons, defaultTheme, selectionStyleDefaults } from './default';
import { useContextMenu } from './useContextMenu';
import { useMousePointer } from './useMousePointer';
import { useMousePosition } from './useMousePosition';
import { useMouseWheel } from './useMouseWheel';
import { usePopup } from './usePopup';
import { useTheme } from './useTheme';
import { getSelectionDiv, isTagTypeSpecial } from './utils';

/**
 * A custom hook that enables mouse selection on a target element.
 * @param targetRef - A React ref object that points to the target element.
 * @param pointerStyle - An object that defines the style of the mouse pointer.
 * @param selectionStyle - An object that defines the style of the selection box.
 * @param status - A string that defines the status of the mouse selection.
 * @param contextMenu - An object that defines the context menu options.
 * @returns An object that contains the dimensions and position of the mouse selection.
 */
const useMouseSelection: MouseSelectionFunction = ({
  targetRef,
  pointerStyle = { color: '#000', size: 20 },
  selectionStyle = selectionStyleDefaults,
  status = 'default',
  contextMenu,
  theme = defaultTheme,
  icons = defaultIcons,
  toolbar,
  darkMode,
  onContextMenuSelected,
  popupGap = 10,
}) => {
  const pressed = useRef(false);
  const targetElement = useRef<HTMLElement>();
  const selectionRef = useRef<HTMLSpanElement>();
  const startMousePosition = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isSelected, setIsSelected] = useState(false);
  const contextMenuPlaceholder = useRef<HTMLDivElement>(
    document.createElement('div')
  );

  const [dimensions, setDimensions] = useState<MouseSelectionDimensions>({
    width: 0,
    height: 0,
    flipX: false,
    flipY: false,
  });

  // setup context menu
  useContextMenu({
    target: targetRef,
    contextMenuOptions: contextMenu,
    toolbar,
    // placeholder: contextMenuPlaceholder,
    onContextMenuSelected,
  });

  const {
    x: mouseX,
    y: mouseY,
    // direction,
    isActive,
    pointerStatus,
  } = useMousePosition({
    targetRef,
    isSelected,
    menuPlaceholder: contextMenuPlaceholder,
    status,
  });

  // Apply theme to the target element.
  useTheme({
    target: targetElement.current,
    theme,
    darkMode,
  });

  usePopup({
    containerElement: targetRef,
    popupGap,
  });

  // Update mouse pointer style.
  useMousePointer({
    container: targetRef,
    mouseX,
    mouseY,
    // direction,
    pointerStyle,
    isActive,
    status: pointerStatus,
    icons,
    isBeingSelected: isSelected,
  });

  // setup mouse wheel
  useMouseWheel({
    targetRef,
  });

  const isSpecialTag = useCallback(isTagTypeSpecial, []);

  /**
   * A callback function that handles the mouse down event.
   * @param ev - The mouse event object.
   */
  const handleMouseDown = useCallback(
    (ev: MouseEvent) => {
      const element = ev.target as HTMLElement;
      setIsSelected(true);

      if (status === 'default' && !isSpecialTag(element)) {
        ev.preventDefault();
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

  /**
   * A callback function that handles the mouse up event.
   */
  const handleMouseUp = useCallback(() => {
    if (pressed.current) {
      pressed.current = false;
      startMousePosition.current = {
        x: 0,
        y: 0,
      };
      setDimensions({
        width: 0,
        height: 0,
      });
    }
    setIsSelected(false);
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
      element.style.position = 'relative';

      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);

      element.style.cursor = 'none';

      element.querySelectorAll('a, input, textarea, button').forEach((el) => {
        const ele = el as HTMLElement;
        ele.style.cursor = 'none';
      });

      const span = getSelectionDiv({
        ...selectionStyle,
      });
      selectionRef.current = span;

      if (!element.contains(span)) {
        element.appendChild(span);
      }
    }

    return () => {
      if (targetElement) {
        const element = targetElement.current as HTMLElement;
        element?.removeEventListener('mousedown', handleMouseDown);
        element?.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [targetElement]);

  const returnValue = useMemo(() => {
    const { width, height, flipX, flipY } = dimensions;
    const { x, y } = startMousePosition.current;

    if (isActive && width && width > 0 && height && height > 0) {
      return {
        x,
        y,
        width,
        height,
        flipX: Boolean(flipX),
        flipY: Boolean(flipY),
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
    const { size } = pointerStyle;
    const { height, width, x, flipX, flipY, y } = returnValue;

    if (selection && size) {
      selection.style.width = `${width}px`;
      selection.style.height = `${height}px`;
      selection.style.left = `${flipX ? x - width : x}px`;
      selection.style.top = `${flipY ? y - height : y}px`;
    }
  }, [dimensions, pointerStyle, selectionRef, startMousePosition, isActive]);
};

export { useMouseSelection };
