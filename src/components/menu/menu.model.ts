import { ReactNode } from "react";
import { Props } from "../../models/core.model";

export interface MenuItemModel {
  id?: string;
  name?: string;
  icon?: ReactNode;
  onClick?: (id?: string) => void;
  selected?: boolean;
  divider?: boolean;
  disabled?: boolean;
}

export type MenuModel = {
  items: MenuItemModel[];
  onSelect: (item: MenuItemModel) => void;
} & Pick<Props, "toolbar">;
