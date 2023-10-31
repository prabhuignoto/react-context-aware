import { waitFor } from "@testing-library/dom";
import { act, renderHook } from "@testing-library/react-hooks";
import { assert, describe, it } from "vitest";
import { usePopup } from "../usePopup"; // Import your hook here

describe("usePopup Hook", () => {
  let containerElement: { current: HTMLElement | null };

  it("should create a placeholder element", () => {
    containerElement = { current: document.createElement("div") };
    renderHook(() => usePopup({ containerElement, popupGap: 10 }));

    // Check if placeholder is created
    const placeholder = containerElement.current?.querySelector(
      '[id^="placeholder-"]'
    );
    assert.ok(placeholder !== null, "Placeholder should be in the document");
  });

  it("should display popup on mouse enter", async () => {
    containerElement = { current: document.createElement("div") };
    renderHook(() => usePopup({ containerElement, popupGap: 10 }));

    const target = document.createElement("div");
    target.setAttribute("data-popup", "true");
    target.setAttribute("data-type", "text");
    target.setAttribute("data-position", "bottom");
    target.setAttribute("data-content", "Hello");
    containerElement.current?.appendChild(target);

    act(() => {
      const mouseEnterEvent = new Event("mouseenter");
      target.dispatchEvent(mouseEnterEvent);
    });

    // Check if popup is displayed
    const popup = containerElement.current?.querySelector('[role="dialog"]');
    waitFor(() => {
      assert.ok(popup !== null, "Popup should be displayed");
    });
  });

  it("should hide popup on mouse leave", () => {
    const target = containerElement.current?.querySelector(
      '[data-popup="true"]'
    );

    act(() => {
      const mouseLeaveEvent = new Event("mouseleave");
      target?.dispatchEvent(mouseLeaveEvent);
    });

    // Check if popup is hidden
    const popup = containerElement.current?.querySelector('[role="dialog"]');
    assert.ok(popup === null, "Popup should be hidden");
  });

  // Add more test cases for edge cases and error conditions
  // ...
});
