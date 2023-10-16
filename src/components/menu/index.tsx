import { nanoid } from "nanoid";
import { FunctionComponent, useState } from "react";
import { Toolbar } from "../toolbar";
import { MenuItem } from "./menu-item";
import { MenuModel } from "./menu.model";
import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuModel> = ({ items, onSelect, toolbar }) => {
  const [menuItems, setMenuItems] = useState(() =>
    items.map((item) => ({ ...item, isOpen: false, id: nanoid() })),
  );

  const handleSelection = (id?: string) => {
    if (id) {
      setMenuItems((prev) =>
        prev.map((item) => ({
          ...item,
          isOpen: item.id === id ? !item.isOpen : false,
        })),
      );
      const item = menuItems.find((item) => item.id === id);

      if (item) {
        onSelect?.(item);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar_wrapper}>
        {toolbar ? <Toolbar items={toolbar.icons} /> : null}
      </div>
      <div className={styles.menu_wrapper}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <MenuItem {...item} key={item.id} onClick={handleSelection} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Menu };
