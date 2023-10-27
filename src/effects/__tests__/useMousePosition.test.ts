// Import necessary dependencies for testing
import { renderHook } from "@testing-library/react-hooks";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { afterEach, beforeEach, expect, test } from "vitest";
import { useMousePosition } from "../useMousePosition"; // Adjust the import path

let container: HTMLElement;

beforeEach(() => {
  // Set up a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("useMousePosition hook initializes with default values", () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );
  const { x, y, direction, isActive, pointerStatus } = result.current;

  expect(x).toBe(-1);
  expect(y).toBe(-1);
  expect(direction).toBeNull();
  expect(isActive).toBe(false);
  expect(pointerStatus).toBe("default");
});

test("useMousePosition hook updates position on mousemove", () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    container.dispatchEvent(
      new MouseEvent("mousemove", { clientX: 100, clientY: 100 })
    );
  });

  const { x, y, direction, isActive } = result.current;

  expect(x).toBe(100);
  expect(y).toBe(100);
  // You can add more assertions for direction and isActive based on your logic
});

test("useMousePosition hook handles mouseenter and updates pointerStatus", () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    container.dispatchEvent(new MouseEvent("mouseenter"));
  });

  const { pointerStatus } = result.current;

  expect(pointerStatus).toBe("default"); // Update this based on your logic
});

// Add more test cases as needed to cover other scenarios and edge cases
