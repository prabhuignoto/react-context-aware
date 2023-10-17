import { ReactElement } from "react";
import { Busy, HandUp, Pointer, Text } from "../assets";
import { PointerStyle, SelectionStyle } from "../models/core.model";
import { Theme } from "../theme";
import styles from "./styles.module.scss";

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

export const defaultTheme: Theme = {
  primary: "#000",
  secondary: "#ccc",
  darkMode: {
    menuBackgroundColor: "#000",
    menuColor: "#ccc",
    menuItemHoverColor: "#222",
  },
  defaultMode: {
    menuBackgroundColor: "#fff",
    menuColor: "#000",
    menuItemHoverColor: "#f5f5f5",
  },
};

type IconRecord =
  | "pointer"
  | "text"
  | "hyperlink"
  | "disabled"
  | "busy"
  | "error";

export const defaultIcons: Record<IconRecord, ReactElement> = {
  pointer: <Pointer />,
  text: <Text />,
  hyperlink: <HandUp />,
  disabled: <img src="../assets/disabled.svg" className={styles.img} />,
  busy: <Busy />,
  error: <img src="../assets/error.svg" className={styles.img} />,
};
