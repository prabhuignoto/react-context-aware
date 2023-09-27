import { RefObject } from "react";

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

export type MoousePositionType = {
  x: number;
  y: number;
  direction: MouseMovementDirection;
  isActive: boolean;
};

export type MousePositionFunction = (
  props: MousePositionProps
) => MoousePositionType;
