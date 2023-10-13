import { useEffect } from "react";
import { Theme } from "../theme";

type useThemeProps = {
  target?: HTMLElement;
  theme: Theme;
};

const useTheme: (p: useThemeProps) => void = ({ target, theme }) => {
  useEffect(() => {
    if (target && theme) {
      const element = target;
      element.style.setProperty("--rc-context-menu-primary", theme.primary);
      element.style.setProperty("--rc-context-menu-secondary", theme.secondary);
    }
  }, [target, theme]);
};

export { useTheme };
