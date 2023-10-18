import { FunctionComponent, ReactNode } from "react";
import styles from "./toolbar.module.scss";

export type ToolbarProps = {
  items: {
    name?: string;
    icon: ReactNode;
  }[];
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ items = [] }) => {
  return (
    <ul className={styles.toolbar}>
      {items.map((item, index) => (
        <li
          key={index}
          className={styles.toolbar_item}
          data-type="toolbar"
          data-name={item.name}
        >
          <span className={styles.icon}>{item.icon}</span>
        </li>
      ))}
    </ul>
  );
};

export { Toolbar };
