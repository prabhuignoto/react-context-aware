import { useEffect, useMemo, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { MousePointerProps } from '../models/mouse-pointer.model';
import { defaultIcons, pointerStyleDefaults } from './default';
import { useMouseWheel } from './useMouseWheel';
import { getPointerImageWrapperDiv } from './utils';

export type MousePointerFunction = (props: MousePointerProps) => void;

/**
 * A custom hook that returns a function to render a mouse pointer.
 * @param container - The container element where the mouse pointer will be rendered.
 * @param mouseX - The x-coordinate of the mouse pointer.
 * @param mouseY - The y-coordinate of the mouse pointer.
 * @param isActive - A boolean indicating whether the mouse pointer is active.
 * @param pointerStyle - An object containing the style properties for the mouse pointer.
 * @param status - A string indicating the status of the mouse pointer.
 * @param icons - An object containing the icons for the mouse pointer.
 * @param isBeingSelected - A boolean indicating whether the mouse pointer is being selected.
 */
const useMousePointer: MousePointerFunction = ({
  container,
  mouseX,
  mouseY,
  isActive = false,
  pointerStyle = pointerStyleDefaults,
  status = 'default',
  icons = defaultIcons,
  isBeingSelected,
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
      pointer.style.display = 'block';
    } else if (!isActive) {
      pointer.style.display = 'none';
    }
  }, [mouseX, mouseY, isActive, pointerRef]);

  const getSVG = useMemo(() => {
    if (isBeingSelected) {
      return;
    }

    switch (status) {
      case 'busy':
        return icons?.busy;
      case 'text':
        return icons?.text;
      case 'hyperlink':
        return icons?.hyperlink;
      default:
        return icons?.pointer;
    }
  }, [status, icons, isBeingSelected]);

  useEffect(() => {
    const pointerElement = pointerRef.current;
    if (status && pointerElement && getSVG) {
      const imageWrapper = getPointerImageWrapperDiv();
      imageWrapper.innerHTML = ReactDOMServer.renderToString(getSVG);
      pointerElement.innerHTML = '';
      pointerElement.appendChild(imageWrapper);
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
    const { size } = pointerStyle;

    if (parent && size && getSVG && mouseX && mouseY) {
      const imageWrapper = getPointerImageWrapperDiv();
      imageWrapper.innerHTML = ReactDOMServer.renderToString(getSVG);
      const element = document.createElement('div');

      pointerRef.current = element;
      element.style.cssText = `
        position: absolute;
        top: ${mouseY > -1 ? mouseY - size / 2 : 0}px;
        left: ${mouseX > -1 ? mouseX - size / 2 : 0}px;
        width: ${size}px;
        height: ${size}px;
        z-index: 999999;
        pointer-events: none;
        display: none;
        fill: var(--rc-context-menu-primary);
        color: var(--rc-context-menu-primary);
        padding: 0;
      `;

      element.appendChild(imageWrapper);
      parent.appendChild(element);
    }
  }, [container]);
};

export { useMousePointer };
