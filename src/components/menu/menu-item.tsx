import { FunctionComponent } from "react";
import { MenuItemModel } from "./menu.model";
import style from "./menu.module.scss";

const MenuItem: FunctionComponent<MenuItemModel> = ({
  name,
  id,
  icon,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <li className={style.menu_item} onClick={handleClick}>
      <span className={style.icon}>{icon}</span>
      <span className={style.label}>{name}</span>
    </li>
  );
};

export { MenuItem };
