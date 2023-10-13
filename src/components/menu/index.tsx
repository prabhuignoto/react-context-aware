import { nanoid } from "nanoid";
import { FunctionComponent, useState } from "react";
import { MenuItem } from "./menu-item";
import { MenuModel } from "./menu.model";
import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuModel> = ({ items, onSelect }) => {
  const [menuItems, setMenuItems] = useState(() =>
    items.map((item) => ({ ...item, isOpen: false, id: nanoid() }))
  );


  const handleSelection = (id?: string) => {
    if (id) {
      setMenuItems((prev) =>
        prev.map((item) => ({
          ...item,
          isOpen: item.id === id ? !item.isOpen : false,
        }))
      );
      const item = menuItems.find((item) => item.id === id);

      if (item) {
        onSelect?.(item);
      }
    }
  };

  return (
    <ul className={styles.menu}>
      {menuItems.map((item) => (
        <MenuItem {...item} key={item.id} onClick={handleSelection} />
      ))}
    </ul>
  );
};

export { Menu };
