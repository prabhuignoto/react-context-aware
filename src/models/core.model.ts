import { ReactElement, ReactNode } from "react";
import { MenuItemModel } from "../components/menu/menu.model";
import { Theme } from "../theme";

export interface Props {
  pointerStyle?: PointerStyle;
  selectionStyle?: SelectionStyle;
  status?: PointerStatus;
  contextMenu?: ContextMenuOptions;
  theme?: Theme;
  icons?: {
    pointer?: ReactElement;
    text?: ReactElement;
    hyperlink?: ReactElement;
    disabled?: ReactElement;
    busy?: ReactElement;
    error?: ReactElement;
  };
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
