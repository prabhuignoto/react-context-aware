import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useTheme } from "../useTheme"; // adjust the import path as necessary

// Mock theme data to be used in tests
const mockTheme = {
  primary: "blue",
  secondary: "red",
  iconSize: "2rem",
  fontSize: "16px",
  darkMode: {
    menuBackgroundColor: "darkblue",
    menuColor: "darkred",
    menuItemHoverColor: "darkgrey",
  },
  defaultMode: {
    menuBackgroundColor: "lightblue",
    menuColor: "lightred",
    menuItemHoverColor: "lightgrey",
  },
};

describe("useTheme hook", () => {
  it("should not set any styles if no target or theme is provided", () => {
    const { result } = renderHook(() =>
      useTheme({
        theme: mockTheme,
      })
    );
    expect(result.current).toBeUndefined();
  });

  it("should set default styles when provided a target and theme", () => {
    // Create a mock target element
    const target = document.createElement("div");

    renderHook(() => useTheme({ target, theme: mockTheme }));

    // Check if default styles are set
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe(
      mockTheme.primary
    );
    expect(target.style.getPropertyValue("--rc-context-menu-secondary")).toBe(
      mockTheme.secondary
    );
  });

  it("should set dark mode styles when darkMode is true", () => {
    const target = document.createElement("div");

    renderHook(() => useTheme({ target, theme: mockTheme, darkMode: true }));

    // Check if dark mode styles are set
    expect(target.style.getPropertyValue("--rc-context-menu-background")).toBe(
      mockTheme.darkMode.menuBackgroundColor
    );
    expect(target.style.getPropertyValue("--rc-context-menu-color")).toBe(
      mockTheme.darkMode.menuColor
    );
  });

  it("should set default mode styles when darkMode is false", () => {
    const target = document.createElement("div");

    renderHook(() => useTheme({ target, theme: mockTheme, darkMode: false }));

    // Check if default mode styles are set
    expect(target.style.getPropertyValue("--rc-context-menu-background")).toBe(
      mockTheme.defaultMode.menuBackgroundColor
    );
    expect(target.style.getPropertyValue("--rc-context-menu-color")).toBe(
      mockTheme.defaultMode.menuColor
    );
  });

  it("should clean up styles on unmount or when target changes", () => {
    const target = document.createElement("div");

    const { unmount } = renderHook(() =>
      useTheme({ target, theme: mockTheme })
    );

    unmount();

    // Check if styles are cleaned up
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe("");
    // ... continue for other properties
  });

  it("should apply styles to a new target when the target changes", () => {
    const target = document.createElement("div");
    const { rerender } = renderHook(
      ({ target }) => useTheme({ target, theme: mockTheme }),
      {
        initialProps: { target },
      }
    );

    // First check for initial target
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe(
      mockTheme.primary
    );

    // Change target and rerender
    const newTarget = document.createElement("div");
    rerender({ target: newTarget });

    // New target should have styles applied
    expect(newTarget.style.getPropertyValue("--rc-context-menu-primary")).toBe(
      mockTheme.primary
    );
    // Old target should no longer have styles
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe("");
  });

  // Test changing the theme
  it("should update styles when theme changes", () => {
    const target = document.createElement("div");
    let currentTheme = mockTheme;
    const { rerender } = renderHook(
      ({ theme }) => useTheme({ target, theme }),
      {
        initialProps: { theme: currentTheme },
      }
    );

    // Check for initial theme styles
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe(
      currentTheme.primary
    );

    // Update theme and rerender
    currentTheme = { ...mockTheme, primary: "green" };
    rerender({ theme: currentTheme });

    // Target should have updated styles
    expect(target.style.getPropertyValue("--rc-context-menu-primary")).toBe(
      "green"
    );
  });

  // Test toggling darkMode
  it("should toggle styles when darkMode changes", () => {
    const target = document.createElement("div");
    const { rerender } = renderHook(
      ({ darkMode }) => useTheme({ target, theme: mockTheme, darkMode }),
      {
        initialProps: { darkMode: false },
      }
    );

    // Check for default mode styles
    expect(target.style.getPropertyValue("--rc-context-menu-background")).toBe(
      mockTheme.defaultMode.menuBackgroundColor
    );

    // Toggle darkMode and rerender
    rerender({ darkMode: true });

    // Target should have dark mode styles applied
    expect(target.style.getPropertyValue("--rc-context-menu-background")).toBe(
      mockTheme.darkMode.menuBackgroundColor
    );
  });

  // Test default values for iconSize and fontSize
  it("should use default iconSize and fontSize when not provided in theme", () => {
    const target = document.createElement("div");
    const customTheme = {
      ...mockTheme,
      iconSize: undefined,
      fontSize: undefined,
    };
    renderHook(() => useTheme({ target, theme: customTheme }));

    // Check if default sizes are applied
    expect(target.style.getPropertyValue("--rc-context-menu-icon-size")).toBe(
      "1.25rem"
    );
    expect(target.style.getPropertyValue("--rc-context-menu-font-size")).toBe(
      "1rem"
    );
  });

  // Test fallback for menuItemHoverColor
  it("should use menuColor as fallback for menuItemHoverColor when not provided", () => {
    const target = document.createElement("div");
    const customTheme = {
      ...mockTheme,
      darkMode: { ...mockTheme.darkMode, menuItemHoverColor: undefined },
      defaultMode: { ...mockTheme.defaultMode, menuItemHoverColor: undefined },
    };

    // Test for default mode
    renderHook(() => useTheme({ target, theme: customTheme, darkMode: false }));
    expect(
      target.style.getPropertyValue("--rc-context-menu-item-hover-color")
    ).toBe(customTheme.defaultMode.menuColor);

    // Test for dark mode
    renderHook(() => useTheme({ target, theme: customTheme, darkMode: true }));
    expect(
      target.style.getPropertyValue("--rc-context-menu-item-hover-color")
    ).toBe(customTheme.darkMode.menuColor);
  });

});
