import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Popup } from '../components/popup';
import {
  ActivePopupState,
  ContentType,
  PopupPosition,
  UsePopupProps,
} from '../models/popup.model';
import {
  calculatePopupPosition,
  createPopupPlaceholder,
  getAllHtmlAttrValues,
} from './utils';

// Custom hook for managing popups
const usePopup = (props: UsePopupProps) => {
  const { containerElement, popupGap = 0 } = props;

  // References to keep track of the targets and placeholder
  const targetsRef = useRef<Element[] | null>(null);
  const placeHolderRef = useRef<HTMLElement | null>(null);

  // State to manage the active popup's properties
  const [activePopup, setActivePopup] = useState<ActivePopupState>({
    type: 'text',
    data: '',
    dimensions: { height: 0, width: 0 },
    position: 'bottom',
    targetRect: { x: 0, y: 0, width: 0, height: 0 },
  });

  // Effect to create the placeholder element on mount
  useEffect(() => {
    const id = `placeholder-${nanoid()}`;
    const placeholder = createPopupPlaceholder({ id });
    if (placeholder && containerElement.current) {
      placeHolderRef.current = placeholder;
      containerElement.current.appendChild(placeholder);
    }
  }, [containerElement]);

  // Function to update active popup state
  const updateActivePopup = useCallback((target: HTMLElement) => {
    const targetRect = target.getBoundingClientRect();
    const [type, position, content, popupHeight, popupWidth] =
      getAllHtmlAttrValues({
        ele: target,
        names: ['type', 'position', 'content', 'height', 'width'],
      });

    if (content && type && position && popupHeight && popupWidth) {
      setActivePopup({
        type: type as ContentType,
        data: content,
        position: position as PopupPosition,
        dimensions: {
          height: parseInt(popupHeight) || 0,
          width: parseInt(popupWidth) || 0,
        },
        targetRect: {
          x: targetRect.x,
          y: targetRect.y,
          width: targetRect.width,
          height: targetRect.height,
        },
      });
    }
  }, []);

  // Function to clear the active popup state
  const clearActivePopup = useCallback(() => {
    const placeholder = placeHolderRef.current;
    if (placeholder) {
      placeholder.innerHTML = '';
      setActivePopup((prevState) => ({
        ...prevState,
        data: '',
        dimensions: { height: 0, width: 0 },
        targetRect: { x: 0, y: 0, width: 0, height: 0 },
      }));
    }
  }, []);

  // Function to render the Popup component as a string
  const getPopupString = renderToString(
    <Popup
      type={activePopup.type}
      data={activePopup.data}
      position={activePopup.position}
    />
  );

  // Effect to update the placeholder inner HTML
  useEffect(() => {
    placeHolderRef.current!.innerHTML = getPopupString;
  }, [getPopupString]);

  // Effect to position the popup
  useEffect(() => {
    const { dimensions, position, targetRect } = activePopup;
    const placeholder = placeHolderRef.current;

    if (placeholder) {
      const { top, left } = calculatePopupPosition(
        position,
        targetRect,
        dimensions,
        popupGap
      );
      placeholder.style.cssText = `
        position: fixed;
        z-index: 9999;
        left: ${left}px;
        top: ${top}px;
        height: ${dimensions.height}px;
        width: ${dimensions.width}px;
      `;
    }
  }, [activePopup, popupGap]);

  // Function to prevent default click behavior
  const handleClick = useCallback((ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  // Effect to add event listeners to all targets
  useEffect(() => {
    const element = containerElement.current;
    if (element) {
      const targets = Array.from(
        element.querySelectorAll('[data-popup="true"]')
      ) as Element[];
      if (targets.length) {
        targetsRef.current = targets;
        targets.forEach((target) => {
          target.addEventListener('mouseenter', (e) =>
            updateActivePopup(e.target as HTMLElement)
          );
          target.addEventListener('mouseleave', clearActivePopup);
          target.addEventListener('click', handleClick);
        });
      }
    }

    // Cleanup function to remove event listeners
    return () => {
      targetsRef.current?.forEach((target) => {
        target.removeEventListener('mouseenter', (e) =>
          updateActivePopup(e.target as HTMLElement)
        );
        target.removeEventListener('mouseleave', clearActivePopup);
        target.removeEventListener('click', handleClick);
      });
    };
  }, [containerElement, updateActivePopup, clearActivePopup, handleClick]);

  // No need to return anything as this hook doesn't provide any outward functionality
};

export { usePopup };
