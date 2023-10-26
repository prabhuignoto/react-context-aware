import { ReactElement, ReactNode } from "react";
import { MenuItemModel } from "../components/menu/menu.model";
import { Theme } from "../theme";

export interface ContextMenuOptions {
  items: MenuItemModel[];
}

export interface PointerStyle {
  color: string;
  size?: number;
}

export type PointerStatus =
  | "busy"
  | "default"
  | "disabled"
  | "error"
  | "hyperlink"
  | "text";

/**
 * Props interface for the core component.
 */
/**
 * Props for the core component.
 */
export interface Props {
  /**
   * Options for the context menu.
   */
  contextMenu?: ContextMenuOptions;
  /**
   * Icons to be used in the component.
   */
  icons?: {
    busy?: ReactElement;
    disabled?: ReactElement;
    error?: ReactElement;
    hyperlink?: ReactElement;
    pointer?: ReactElement;
    text?: ReactElement;
  };
  /**
   * Style for the pointer.
   */
  pointerStyle?: PointerStyle;
  /**
   * Style for the selection.
   */
  selectionStyle?: SelectionStyle;
  /**
   * Status of the pointer.
   */
  status?: PointerStatus;
  /**
   * Theme for the component.
   */
  theme?: Theme;
  /**
   * Toolbar options for the component.
   */
  toolbar?: {
    icons: {
      name: string;
      icon: ReactNode;
    }[];
  };
  /**
   * Whether to use dark mode.
   */
  darkMode?: boolean;
  /**
   * Callback function to be called when a context menu item is selected.
   */
  onContextMenuSelected?: (p: { id: string; name: string }) => void;

  popupGap?: number;
}

export interface SelectionStyle {
  backgroundColor: string;
  borderColor: string;
  borderStyle: "dashed" | "dotted" | "solid";
  borderWidth?: number;
}
