import { RefObject } from "react";

export type usePopupProps = {
  containerElement: RefObject<HTMLElement>;
};

export type ContentType = "image" | "text";

export type PopupProps = {
  type: ContentType;
  data: string;
};

export type popupDimensions = {
  width: number;
  height: number;
};

export type PopupPosition = "top" | "bottom";
