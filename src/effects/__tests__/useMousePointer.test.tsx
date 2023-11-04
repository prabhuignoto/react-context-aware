import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useMousePointer } from '../useMousePointer';

describe('useMousePointer hook', () => {
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

  it('should correctly position the pointer', async () => {
    renderHook(() =>
      useMousePointer({
        container,
        mouseX: 10,
        mouseY: 20,
        isActive: true,
        pointerStyle: { size: 10, color: 'red' },
      })
    );

    const pointer = container.current?.querySelector('span');

    waitFor(() => {
      expect(pointer?.style.top).toBe('20px');
      expect(pointer?.style.left).toBe('10px');
    });
  });

  it('should hide the pointer when not active', () => {
    renderHook(() =>
      useMousePointer({
        container,
        isActive: false,
      })
    );

    const pointer = container.current?.querySelector('span');

    waitFor(() => {
      expect(pointer?.style.display).toBe('none');
    });
  });

  it('should correctly change pointer styles based on status', () => {
    const { rerender } = renderHook(
      () =>
        useMousePointer({
          container,
          // status,
          pointerStyle: { size: 10, color: 'blue' },
          icons: {
            busy: <span>busy_icon</span>,
            text: <span>text_icon</span>,
            hyperlink: <span>hyperlink_icon</span>,
            pointer: <span>default_icon</span>,
          },
        }),
      {
        initialProps: { status: 'default' },
      }
    );

    // Checking default status
    let pointer = container.current?.querySelector('span');

    waitFor(() => {
      expect(pointer?.innerHTML).toContain('default_icon');
    });

    // Checking busy status
    rerender({ status: 'busy' });
    pointer = container.current?.querySelector('span');

    waitFor(() => {
      expect(pointer?.innerHTML).toContain('busy_icon');
    });

    // And so on for other statuses
  });

  // it("should update the pointer scale", () => {
  //   const { result } = renderHook(() =>
  //     useMousePointer({
  //       container,
  //       pointerStyle: { size: 10, color: "blue" },
  //     })
  //   );

  //   // Simulate a change in scale factor
  //   act(() => {
  //     result.current({ scaleFactor: 1.5 });
  //   });

  //   const pointer = container.current?.querySelector("span");
  //   expect(pointer?.style.transform).toBe("scale(1.5)");
  // });

  it('should clean up on unmount', () => {
    const { unmount } = renderHook(() =>
      useMousePointer({
        container,
        mouseX: 10,
        mouseY: 20,
        isActive: true,
        pointerStyle: { size: 10, color: 'blue' },
      })
    );

    // Fetch the pointer element before unmounting
    const pointerBeforeUnmount = container.current?.querySelector('span');

    // It should exist in the container before unmounting
    expect(pointerBeforeUnmount).toBeTruthy();

    // Unmount the hook
    unmount();

    // // Fetch the pointer element after unmounting
    const pointerAfterUnmount = container.current?.querySelector('span');

    // // It should not exist in the container after unmounting
    waitFor(() => {
      expect(pointerAfterUnmount).toBeNull();
    });
  });
});
