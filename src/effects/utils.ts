import { SelectionStyle } from "./core.model";
import { MouseMovementDirection } from "./mouse-position.model";

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

  let direction = null;

  // Determine the direction of the mouse movement
  direction =
    absMovX > absMovY
      ? movX < 0
        ? "left"
        : "right"
      : movY < 0
      ? "up"
      : "down";

  // Return the direction
  return direction as MouseMovementDirection;
};

const getSelectionDiv = (
  style: SelectionStyle = {
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    borderColor: "rgba(0, 123, 255, 0.5)",
    borderStyle: "dotted",
    borderWidth: 1,
  }
) => {
  const span = document.createElement("span");
  const { backgroundColor, borderColor, borderStyle, borderWidth } = style;
  span.style.cssText = `
        position: absolute;
        z-index: 99999;
        display: block;
        background: ${backgroundColor};
        border: ${borderWidth}px ${borderStyle} ${borderColor};
      `;

  return span;
};

export { getDirection, getSelectionDiv };
