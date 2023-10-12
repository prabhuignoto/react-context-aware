import { FunctionComponent } from "react";
import { MenuItemModel } from "./menu.model";
import style from "./menu.module.scss";
import cls from "classnames";

const MenuItem: FunctionComponent<MenuItemModel> = ({
  name,
  id,
  icon,
  onClick,
  divider,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  const itemClass = cls(style.menu_item, {
    [style.divider]: divider,
  });

  return (
    <li className={itemClass} onClick={handleClick}>
      {divider ? (
        <hr className={style.divider} />
      ) : (
        <>
          <span className={style.icon}>{icon}</span>
          <span className={style.label}>{name}</span>
        </>
      )}
    </li>
  );
};

export { MenuItem };
