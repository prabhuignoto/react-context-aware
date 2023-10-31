import { RefObject } from "react";
import { ContextMenuOptions, Props } from "./core.model";

/**
 * Props for the useContextMenu hook.
 */
type UseContextMenuProps = {
  /**
   * A ref to the target element that the context menu should be attached to.
   */
  target: RefObject<HTMLElement>;

  /**
   * An optional object containing options for the context menu.
   */
  contextMenuOptions?: ContextMenuOptions;

  /**
   * An optional DOMRect object representing the container element's bounding rectangle.
   */
  containerRect?: DOMRect;

  /**
   * A ref to a placeholder element that will be used to position the context menu.
   */
  // placeholder: RefObject<HTMLDivElement>;

  /**
   * A callback function that will be called when a menu item is selected.
   * @param id The ID of the selected menu item.
   */
  onContextMenuSelected?: (p: { id: string; name: string }) => void;
} & Pick<Props, "toolbar">;

/**
 * The signature of the `useContextMenu` hook.
 */
export type useContextMenuFunction = (props: UseContextMenuProps) => void;
