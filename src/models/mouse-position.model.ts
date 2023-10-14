import { RefObject } from "react";
import { PointerStatus } from "./core.model";

export interface MousePositionProps {
  targetRef: RefObject<HTMLElement>;
  isSelected?: boolean;
}

export type MouseMovementDirection = "left" | "right" | "up" | "down" | null;

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
