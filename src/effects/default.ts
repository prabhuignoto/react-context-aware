import { PointerStyle, SelectionStyle } from "../models/core.model";

export const selectionStyleDefaults: SelectionStyle = {
  backgroundColor: "rgba(0,0,0,0.2)",
  borderColor: "rgba(0,0,0,0.5)",
  borderStyle: "dotted",
  borderWidth: 1,
};

export const pointerStyleDefaults: PointerStyle = {
  color: "rgba(0,0,0,0.5)",
  size: 10,
};
