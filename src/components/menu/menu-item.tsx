import cls from "classnames";
import { FunctionComponent } from "react";
import { MenuItemModel } from "./menu.model";
import style from "./menu.module.scss";

const MenuItem: FunctionComponent<MenuItemModel> = ({
  name,
  id,
  icon,
  onClick,
  divider,
  disabled,
}) => {
  const handleClick = () => {
    alert("koja");
    onClick?.(id);
  };

  const itemClass = cls(style.menu_item, {
    [style.divider]: divider,
    [style.disabled]: disabled,
  });

  return (
    <li className={itemClass} onClick={handleClick}>
      {divider ? (
        <hr className={style.divider} />
      ) : (
        <>
          {icon ? <span className={style.icon}>{icon}</span> : null}
          <span className={style.label}>{name}</span>
        </>
      )}
    </li>
  );
};

export { MenuItem };
