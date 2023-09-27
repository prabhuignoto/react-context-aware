// tests/useMousePosition.test.tsx
import { act, renderHook } from "@testing-library/react-hooks";
import { RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MousePositionProps, useMousePosition } from "../useMousePosition"; // Update the path accordingly

describe("useMousePosition", () => {
  // Create a fake element and ref to use for tests
  let targetElement: HTMLElement;
  let targetRef: RefObject<HTMLElement>;

  beforeEach(() => {
    targetElement = document.createElement("div");
    targetRef = { current: targetElement };

    // Append to body to make it a part of the document
    document.body.appendChild(targetElement);
  });

  afterEach(() => {
    // Cleanup
    document.body.removeChild(targetElement);
  });

  it("should return initial mouse position as { x: 0, y: 0 }", () => {
    const { result } = renderHook(() =>
      useMousePosition({ targetRef } as MousePositionProps)
    );
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("should update mouse position when mouse moves over the target element", () => {
    const { result } = renderHook(() =>
      useMousePosition({ targetRef } as MousePositionProps)
    );

    // Simulate mouse move
    act(() => {
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: 50,
        clientY: 60,
      });
      targetElement.dispatchEvent(mouseEvent);
    });

    expect(result.current).toEqual({ x: 50, y: 60 });
  });

  it("should not update mouse position when mouse moves outside the target element", () => {
    const anotherElement = document.createElement("div");
    document.body.appendChild(anotherElement);

    const { result } = renderHook(() =>
      useMousePosition({ targetRef } as MousePositionProps)
    );

    act(() => {
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: 70,
        clientY: 80,
      });
      anotherElement.dispatchEvent(mouseEvent);
    });

    expect(result.current).toEqual({ x: 0, y: 0 });

    document.body.removeChild(anotherElement);
  });

  it("should handle null targetRef gracefully", () => {
    const nullRef: RefObject<HTMLElement> = { current: null };
    const { result } = renderHook(() =>
      useMousePosition({ targetRef: nullRef } as MousePositionProps)
    );
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("should cleanup event listener on unmount", () => {
    const { unmount } = renderHook(() =>
      useMousePosition({ targetRef } as MousePositionProps)
    );

    const spy = vi.spyOn(targetElement, "removeEventListener");

    unmount();

    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    spy.mockRestore();
  });
});
