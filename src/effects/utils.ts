import { SelectionStyle } from '../models/core.model';
import { MouseMovementDirection } from '../models/mouse-position.model';
import {
  PopupDimensions,
  PopupPosition,
  TargetRect,
} from '../models/popup.model';

type PopupPlaceholderProps = {
  id: string;
};

const getDirection: (x: number, y: number) => MouseMovementDirection = (
  movX,
  movY
) => {
  // If the mouse movement is zero, return null
  if (movX === 0 && movY === 0) {
    return null;
  }

  // Get the absolute value of the mouse movement in the X and Y axes
  const absMovX = Math.abs(movX);
  const absMovY = Math.abs(movY);

  let direction = '';

  // Determine the direction of the mouse movement
  direction =
    absMovX > absMovY
      ? movX < 0
        ? 'left'
        : 'right'
      : movY < 0
      ? 'up'
      : 'down';

  // Return the direction
  return direction as MouseMovementDirection;
};

const getSelectionDiv = (
  style: SelectionStyle = {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderColor: 'rgba(0, 123, 255, 0.5)',
    borderStyle: 'dotted',
    borderWidth: 1,
  }
) => {
  const span = document.createElement('span');
  const { backgroundColor, borderColor, borderStyle, borderWidth } = style;
  span.style.cssText = styleobjectToCssText({
    position: 'absolute',
    zIndex: 99999,
    display: 'block',
    background: backgroundColor,
    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
  });

  return span;
};

const getPointerImageWrapperDiv = () => {
  const imageWrapper = document.createElement('span');
  imageWrapper.style.cssText = styleobjectToCssText({
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
  });

  return imageWrapper;
};

const isTagTypeSpecial = (el: HTMLElement) => {
  const { tagName } = el;
  return (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'BUTTON' ||
    tagName === 'A'
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styleobjectToCssText = (style: any) => {
  return Object.keys(style).reduce((acc, key) => {
    return `${acc}${key}:${style[key]};`;
  }, '');
};

/**
 * Creates a placeholder element for a popup component.
 * @param {PopupPlaceholderProps} props - The props object containing the id, target, height, width, and position of the popup.
 * @returns {HTMLDivElement} - The created placeholder element.
 */
const createPopupPlaceholder = ({
  id,
}: PopupPlaceholderProps): HTMLDivElement => {
  // const targetRect = target.getBoundingClientRect();

  // Create the placeholder element
  const placeholder = document.createElement('div');
  placeholder.id = id;
  placeholder.style.cssText = styleobjectToCssText({
    position: 'fixed',
    zIndex: '9999',
  });
  return placeholder;
};

const getAllHtmlAttrValues: (props: {
  ele: HTMLElement;
  names: string[];
}) => (string | null)[] = ({ ele, names }) => {
  if (ele) {
    return names.map((name) => ele.getAttribute(`data-${name}`));
  } else {
    return [];
  }
};

export {
  createPopupPlaceholder,
  getAllHtmlAttrValues,
  getDirection,
  getPointerImageWrapperDiv,
  getSelectionDiv,
  isTagTypeSpecial,
  styleobjectToCssText,
};

// Helper function to calculate popup position
export function calculatePopupPosition(
  position: PopupPosition,
  targetRect: TargetRect,
  dimensions: PopupDimensions,
  popupGap: number
): { top: number; left: number } {
  let left = 0;
  let top = 0;
  const { x, y, width: targetWidth, height: targetHeight } = targetRect;

  // Calculate the popup position
  switch (position) {
    case 'top':
      top = y - dimensions.height;
      break;
    case 'bottom':
      top = y + targetHeight;
      break;
    case 'left':
      left = x - dimensions.width - popupGap;
      break;
    case 'right':
      left = x + targetWidth + popupGap;
      break;
  }

  // Center the popup horizontally for top and bottom positions
  if (position === 'top' || position === 'bottom') {
    left = x + targetWidth / 2 - dimensions.width / 2;
  }

  // Center the popup vertically for left and right positions
  if (position === 'left' || position === 'right') {
    top = y + targetHeight / 2 - dimensions.height / 2;
  }

  return { top, left };
}
