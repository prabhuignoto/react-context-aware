import { useEffect } from "react";
import { MenuTheme, Theme } from "../theme";

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

      if (theme.darkMode || theme.defaultMode) {
        const { menuBackgroundColor, menuColor, menuItemHoverColor } = (
          darkMode ? theme.darkMode : theme.defaultMode
        ) as MenuTheme;
        element.style.setProperty(
          "--rc-context-menu-background",
          menuBackgroundColor,
        );
        element.style.setProperty("--rc-context-menu-color", menuColor);
        element.style.setProperty(
          "--rc-context-menu-item-hover-color",
          menuItemHoverColor || menuColor,
        );
      }
    }
  }, [target]);
};

export { useTheme };
