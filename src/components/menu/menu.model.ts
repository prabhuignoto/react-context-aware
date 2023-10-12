import { ReactNode } from "react";

export interface MenuItemModel {
  id?: string;
  name?: string;
  icon?: ReactNode;
  onClick?: (id?: string) => void;
  selected?: boolean;
  divider?: boolean;
  disabled?: boolean;
}

export interface MenuModel {
  items: MenuItemModel[];
  onSelect: (item: MenuItemModel) => void;
}
