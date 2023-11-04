import { waitFor } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMouseWheel } from '../useMouseWheel';

describe('useMouseWheel hook', () => {
  let container: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    container = {
      current: document.createElement('div'),
    };
    document.body.appendChild(container.current!);
  });

  afterEach(() => {
    document.body.removeChild(container.current!);
  });

  it('should handle mouse wheel events', async () => {
    const { result } = renderHook(() =>
      useMouseWheel({ targetRef: container })
    );

    const event = new WheelEvent('wheel', { deltaY: 1 });

    act(() => {
      container.current?.dispatchEvent(event);
    });

    waitFor(() => {
      expect(result.current.scaleFactor).toBe(1.1); // 1.0 (initial) + 0.1 (step)
    });
  });

  it('should not exceed maxScaleFactor', async () => {
    const { result } = renderHook(() =>
      useMouseWheel({ targetRef: container, maxScaleFactor: 1.2 })
    );
    const event = new WheelEvent('wheel', { deltaY: 1 });

    act(() => {
      for (let i = 0; i < 5; i++) {
        container.current?.dispatchEvent(event);
      }
    });

    waitFor(() => {
      expect(result.current.scaleFactor).toBe(1.2);
    });
  });

  it('should not go below minScaleFactor', async () => {
    const { result } = renderHook(() =>
      useMouseWheel({ targetRef: container, minScaleFactor: 0.9 })
    );
    const event = new WheelEvent('wheel', { deltaY: -1 });

    act(() => {
      for (let i = 0; i < 5; i++) {
        container.current?.dispatchEvent(event);
      }
    });
    waitFor(() => {
      expect(result.current.scaleFactor).toBe(0.9);
    });
  });

  it('should clean up event listeners', () => {
    const map: Record<string, EventListenerOrEventListenerObject> = {};

    // Mock addEventListener and removeEventListener
    container.current!.addEventListener = vi.fn((event, callback) => {
      map[event] = callback;
    });

    container.current!.removeEventListener = vi.fn((event) => {
      delete map[event];
    });

    const { unmount } = renderHook(() =>
      useMouseWheel({ targetRef: container })
    );

    expect(map['wheel']).toBeDefined();

    // Unmount the hook
    unmount();

    expect(map['wheel']).toBeUndefined();
  });
});
