import { RefObject } from "react";
import { Props } from "./core.model";

export interface MouseSelectionProps extends Props {
  targetRef: RefObject<HTMLElement>;
}

export type MouseSelectionReturnType = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  flipX?: boolean;
  flipY?: boolean;
};

export type MouseSelectionDimensions = Partial<
  Pick<MouseSelectionReturnType, "width" | "height" | "flipX" | "flipY">
>;

export type MouseSelectionFunction = (props: MouseSelectionProps) => void;
