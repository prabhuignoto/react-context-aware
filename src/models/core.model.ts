import { MenuItemModel } from "../components/menu/menu.model";

export interface Props {
  pointerStyle?: PointerStyle;
  selectionStyle?: SelectionStyle;
  status?: PointerStatus;
  contextMenu?: ContextMenuOptions;
}

export interface ContextMenuOptions {
  items: MenuItemModel[];
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

export type PointerStatus =
  | "busy"
  | "error"
  | "disabled"
  | "default"
  | "text"
  | "hyperlink";
