import { SelectionStyle } from "./core.model";

const getDirection = (movX: number, movY: number) => {
  if (movX === 0 && movY === 0) {
    return null;
  }

  switch (Math.sign(movX)) {
    case -1:
      switch (Math.sign(movY)) {
        case -1:
          return "top left";
        case 1:
          return "bottom left";
        default:
          return "left";
      }
    case 1:
      switch (Math.sign(movY)) {
        case -1:
          return "top right";
        case 1:
          return "bottom right";
        default:
          return "right";
      }
    default:
      return null;
  }
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
