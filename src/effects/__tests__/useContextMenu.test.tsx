import { fireEvent, waitFor } from "@testing-library/dom";
import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContextMenuOptions } from "../../models/core.model";
import { useContextMenu } from "../useContextMenu"; // Update this import to your actual file path

describe("useContextMenu hook", () => {
  let target: React.RefObject<HTMLDivElement>;
  let contextMenuOptions: ContextMenuOptions; // Replace with your actual type
  let onContextMenuSelected = vi.fn();

  beforeEach(() => {
    target = {
      current: document.createElement("div"),
    };
    document.body.appendChild(target.current!);

    contextMenuOptions = {
      items: [
        {
          name: "testName",
          id: "testId",
        },
        {
          name: "testName2",
          id: "testId2",
        },
      ],
    }; // Initialize with your default options

    onContextMenuSelected = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(target.current!);
  });

  it("should initialize properly", () => {
    const { result } = renderHook(() =>
      useContextMenu({
        target,
        contextMenuOptions,
        onContextMenuSelected,
      })
    );
    expect(result.current).toBeUndefined();
  });

  it("should open on right-click", () => {
    renderHook(() =>
      useContextMenu({
        target,
        contextMenuOptions,
        onContextMenuSelected,
      })
    );

    act(() => {
      fireEvent.contextMenu(target.current!, { button: 2 });
    });

    // Assuming that your hook is adding a menu element to the DOM when it opens the context menu
    const contextMenuIsOpen = document.querySelector(
      "[data-testid='context-menu']"
    ); // Replace with an actual selector that you use

    expect(contextMenuIsOpen).toBeInTheDocument();
  });

  it("should close on clicking outside", async () => {
    renderHook(() =>
      useContextMenu({
        target,
        contextMenuOptions,
        onContextMenuSelected,
      })
    );

    // First, open the context menu
    act(() => {
      fireEvent.contextMenu(target.current!, { button: 2 });
    });

    // Then, simulate an outside click
    act(() => {
      fireEvent.mouseDown(document);
    });

    // Assuming that your hook removes the menu element from the DOM when it closes the context menu
    const contextMenuIsClosed = document.querySelector(
      "[data-testid='context-menu']"
    ); // Replace with an actual selector that you use

    waitFor(
      () => {
        expect(contextMenuIsClosed).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should call onContextMenuSelected when an item is selected", () => {
    renderHook(() =>
      useContextMenu({
        target,
        contextMenuOptions,
        onContextMenuSelected,
      })
    );

    act(() => {
      fireEvent.contextMenu(target.current!, { button: 2 });
    });

    // Assuming the context menu is opened and attached to the DOM
    const contextMenu = document.querySelector("[data-testid='context-menu']");

    // Get the first `li` under the `ul` in the context menu
    const firstMenuItem = contextMenu?.querySelector("ul > li:first-child");

    act(() => {
      if (firstMenuItem) {
        fireEvent.click(firstMenuItem);
      }
    });

    waitFor(() => {
      expect(onContextMenuSelected).toHaveBeenCalledWith({
        // Provide the expected data that corresponds to the first menu item
        // This would depend on what data attributes you've set on the menu items
        name: "testName",
        id: "testId",
      });
    });
  });

  it("should clean up event listeners on unmount", () => {
    const { unmount } = renderHook(() =>
      useContextMenu({
        target,
        contextMenuOptions,
        onContextMenuSelected,
      })
    );

    // Unmount the component
    unmount();

    // Now, we check if the event listeners have been removed

    // For example, if you were adding a 'mousedown' event listener:
    act(() => {
      fireEvent.mouseDown(target.current!);
    });

    // Ensure that the event listener is no longer called, indicating that it has been removed
    expect(onContextMenuSelected).not.toHaveBeenCalled();
  });
});
