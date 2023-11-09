import { nanoid } from 'nanoid';
import { FunctionComponent, useState } from 'react';
import { Toolbar } from '../toolbar';
import { MenuItem } from './menu-item';
import { MenuModel } from './menu.model';
import styles from './menu.module.scss';

const Menu: FunctionComponent<MenuModel> = ({ items, toolbar }) => {
  const [menuItems] = useState(() =>
    items.map((item) => ({ ...item, isOpen: false, id: nanoid() }))
  );

  return (
    <div className={styles.wrapper} data-testid="context-menu" role="menu">
      <div className={styles.toolbar_wrapper}>
        {toolbar ? <Toolbar items={toolbar.icons} /> : null}
      </div>
      <div className={styles.menu_wrapper}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };
