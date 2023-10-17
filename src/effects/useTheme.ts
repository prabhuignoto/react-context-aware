import { useEffect } from "react";
import { Theme } from "../theme";

type useThemeProps = {
  target?: HTMLElement;
  theme: Theme;
  darkMode?: boolean;
};

const useTheme: (p: useThemeProps) => void = ({ target, theme, darkMode }) => {
  useEffect(() => {
    if (target && theme) {
      const element = target;
      element.style.setProperty("--rc-context-menu-primary", theme.primary);
      element.style.setProperty("--rc-context-menu-secondary", theme.secondary);
      element.style.setProperty(
        "--rc-context-menu-icon-size",
        theme.iconSize || "1.25rem",
      );
      element.style.setProperty(
        "--rc-context-menu-font-size",
        theme.fontSize || "1rem",
      );

      if (theme.menuBackgroundColor) {
        element.style.setProperty(
          "--rc-context-menu-background",
          theme.menuBackgroundColor,
        );
      }

      if (theme.menuColor) {
        element.style.setProperty("--rc-context-menu-color", theme.menuColor);
      }
    }
  }, [target, theme, darkMode]);
};

export { useTheme };
