import { RefObject } from "react";
import { PointerStatus } from "./core.model";

export interface MousePositionProps {
  targetRef: RefObject<HTMLElement>;
}

export type MouseMovementDirection =
  | "left"
  | "right"
  | "up"
  | "down"
  | null
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export type MousePositionType = {
  x: number;
  y: number;
  direction: MouseMovementDirection;
  isActive: boolean;
  pointerStatus?: PointerStatus;
};

export type MousePositionFunction = (
  props: MousePositionProps
) => MousePositionType;
