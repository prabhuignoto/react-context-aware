import { useEffect } from 'react';
import { MenuTheme, Theme } from '../theme';

type useThemeProps = {
  target?: HTMLElement;
  theme: Theme;
  darkMode?: boolean;
};

// useTheme is a custom hook for applying a theme to a target HTML element.
// It uses the theme properties to set CSS custom properties for styling context menus.
const useTheme: (p: useThemeProps) => void = ({
  target,
  theme,
  darkMode = false,
}) => {
  // This useEffect hook is used to update the styles of the target element when
  // the target, theme, or darkMode changes.
  useEffect(() => {
    // If no target or theme is provided, do not attempt to set any styles.
    if (!target || !theme) {
      return;
    }

    // Helper function to set style properties to reduce redundancy.
    const setStyleProperty = (property: string, value: string) => {
      target.style.setProperty(property, value);
    };

    // Setting the primary and secondary colors.
    setStyleProperty('--rc-context-menu-primary', theme.primary);
    setStyleProperty('--rc-context-menu-secondary', theme.secondary);
    // Setting default values for icon size and font size if not provided.
    setStyleProperty(
      '--rc-context-menu-icon-size',
      theme.iconSize ?? '1.25rem'
    );
    setStyleProperty('--rc-context-menu-font-size', theme.fontSize ?? '1rem');

    // Apply dark or default mode theme properties.
    const modeTheme: MenuTheme | undefined = darkMode
      ? theme.darkMode
      : theme.defaultMode;

    if (modeTheme) {
      setStyleProperty(
        '--rc-context-menu-background',
        modeTheme.menuBackgroundColor
      );
      setStyleProperty('--rc-context-menu-color', modeTheme.menuColor);
      // Fallback to menuColor if menuItemHoverColor is not provided.
      setStyleProperty(
        '--rc-context-menu-item-hover-color',
        modeTheme.menuItemHoverColor || modeTheme.menuColor
      );
    }

    // Apply different styles based on darkMode being true or false.
    const dividerColor = darkMode ? '#555' : '#e8e8e8';
    const popupBackgroundColor = darkMode ? '#555' : '#fff';
    setStyleProperty('--rc-context-menu-divider', dividerColor);
    setStyleProperty('--rc-popup-background', popupBackgroundColor);

    // Cleanup function to reset custom properties when the component unmounts or target changes.
    return () => {
      const properties = [
        '--rc-context-menu-primary',
        '--rc-context-menu-secondary',
        '--rc-context-menu-icon-size',
        '--rc-context-menu-font-size',
        '--rc-context-menu-background',
        '--rc-context-menu-color',
        '--rc-context-menu-item-hover-color',
        '--rc-context-menu-divider',
        '--rc-popup-background',
      ];
      properties.forEach((property) => target.style.removeProperty(property));
    };
  }, [target, theme, darkMode]);
};

export { useTheme };
