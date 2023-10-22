import { RefObject } from "react";

export type usePopupProps = {
  containerElement: RefObject<HTMLElement>;
};

export type ContentType = "image" | "text";

export type PopupProps = {
  type: ContentType;
  data: string;
  position: string;
  targetElementRect: {
    x: number;
    y: number;
  };
};
