export type Theme = {
  primary: string;
  secondary: string;
  iconSize?: string;
  fontSize?: string;
  menuBackgroundColor?: string;
  menuColor?: string;
};

export const BlueTheme: Theme = {
  primary: "#0000FF",
  secondary: "#00FFFF",
};

export const RedTheme: Theme = {
  primary: "#FF0000",
  secondary: "#FFFF00",
};
