// Import necessary dependencies for testing
import { renderHook } from '@testing-library/react-hooks';
// import { unmountComponentAtNode } from "react-dom";
import { waitFor } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useMousePosition } from '../useMousePosition'; // Adjust the import path

let container: HTMLElement;

beforeEach(() => {
  // Set up a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exiting
  // unmountComponentAtNode(container);
  container.remove();
});

test('useMousePosition hook initializes with default values', () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );
  const { x, y, direction, isActive, pointerStatus } = result.current;

  expect(x).toBe(-1);
  expect(y).toBe(-1);
  expect(direction).toBeNull();
  expect(isActive).toBe(false);
  expect(pointerStatus).toBe('default');
});

test('useMousePosition hook updates position on mousemove', () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    container.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 100, clientY: 100 })
    );
  });

  const { x, y } = result.current;

  expect(x).toBe(100);
  expect(y).toBe(100);
  // You can add more assertions for direction and isActive based on your logic
});

test('useMousePosition hook handles mouseenter and updates pointerStatus', () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    container.dispatchEvent(new MouseEvent('mouseenter'));
  });

  const { pointerStatus } = result.current;

  expect(pointerStatus).toBe('default'); // Update this based on your logic
});

test('useMousePosition hook updates position with throttling', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    // Simulate rapid mouse movements that should be throttled
    for (let i = 0; i < 10; i++) {
      container.dispatchEvent(
        new MouseEvent('mousemove', { clientX: i * 10, clientY: i * 10 })
      );
    }
  });

  // Wait for the throttle delay
  await waitForNextUpdate();

  // Check the position after throttling
  // Expect the last position to be recorded, not the intermediate ones
  const { x, y } = result.current;
  expect(x).toBe(90);
  expect(y).toBe(90);
});

test('useMousePosition hook sets isActive correctly on mouse enter and leave', async () => {
  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  act(() => {
    container.dispatchEvent(new MouseEvent('mouseenter'));
  });

  waitFor(() => {
    expect(result.current.isActive).toBe(true);
  });

  act(() => {
    container.dispatchEvent(new MouseEvent('mouseleave'));
  });

  waitFor(() => {
    expect(result.current.isActive).toBe(false);
  });
});

test('useMousePosition hook updates pointerStatus based on element type', async () => {
  // Create a mock anchor and button elements for testing
  const mockAnchor = document.createElement('a');
  const mockButton = document.createElement('button');

  const { result } = renderHook(() =>
    useMousePosition({ targetRef: { current: mockAnchor }, isSelected: false })
  );

  act(() => {
    mockAnchor.dispatchEvent(new MouseEvent('mouseenter'));
  });

  waitFor(() => {
    expect(result.current.pointerStatus).toBe('hyperlink');
  });

  act(() => {
    mockButton.dispatchEvent(new MouseEvent('mouseenter'));
  });

  waitFor(() => {
    expect(result.current.pointerStatus).toBe('hyperlink'); // should be updated based on logic
  });
});

test('useMousePosition hook cleans up event listeners on unmount', async () => {
  const addEventListenerSpy = vi.spyOn(
    HTMLElement.prototype,
    'addEventListener'
  );
  const removeEventListenerSpy = vi.spyOn(
    HTMLElement.prototype,
    'removeEventListener'
  );

  const { unmount } = renderHook(() =>
    useMousePosition({ targetRef: { current: container }, isSelected: false })
  );

  unmount();

  waitFor(() => {
    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(addEventListenerSpy.mock.calls.length).toBe(
      removeEventListenerSpy.mock.calls.length
    );
  });

  // Clean up spies
  addEventListenerSpy.mockRestore();
  removeEventListenerSpy.mockRestore();
});
