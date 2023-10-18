import { ReactNode } from "react";
import { Props } from "../../models/core.model";

export interface MenuItemModel {
  id?: string;
  name?: string;
  icon?: ReactNode;
  selected?: boolean;
  divider?: boolean;
  disabled?: boolean;
}

export type MenuModel = {
  items: MenuItemModel[];
} & Pick<Props, "toolbar">;
