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

const getSelectionDiv = () => {
  const span = document.createElement("span");
  span.style.cssText = `
        position: absolute;
        z-index: 99999;
        display: block;
        background: rgba(0, 123, 255, 0.1);
        border: 1px solid rgba(0, 123, 255, 0.5);
      `;

  return span;
};

export { getDirection, getSelectionDiv };
