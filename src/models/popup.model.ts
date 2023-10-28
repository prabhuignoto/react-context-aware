import { RefObject } from "react";
import { Props } from "./core.model";

export type usePopupProps = {
  containerElement: RefObject<HTMLElement>;
} & Pick<Props, "popupGap">;

export type ContentType = "image" | "text";

export type PopupProps = {
  type: ContentType;
  data: string;
  position: "top" | "bottom" | "left" | "right";
};

export type popupDimensions = {
  width: number;
  height: number;
};

export type PopupPosition = "top" | "bottom";

export type TargetRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
