export interface Props {
  pointerStyle?: PointerStyle;
  selectionStyle?: SelectionStyle;
}

export interface PointerStyle {
  size?: number;
  color: string;
}

export interface SelectionStyle {
  backgroundColor: string;
  borderStyle: "dotted" | "solid" | "dashed";
  borderColor: string;
  borderWidth?: number;
}
