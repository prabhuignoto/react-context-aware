import cls from 'classnames';
import { FunctionComponent } from 'react';
import { MenuItemModel } from './menu.model';
import style from './menu.module.scss';

const MenuItem: FunctionComponent<MenuItemModel> = ({
  name,
  id,
  icon,
  divider,
  disabled,
}) => {
  const itemClass = cls(style.menu_item, {
    [style.divider]: divider,
    [style.disabled]: disabled,
  });

  return (
    <li className={itemClass} data-name={name} data-id={id} data-type="menu" role="menuitem">
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
