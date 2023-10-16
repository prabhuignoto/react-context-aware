import { FunctionComponent, ReactNode } from "react";
import styles from "./toolbar.module.css";

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
        <li key={index} className={styles.toolbar_item}>
          <span className={styles.icon}>{item.icon}</span>
        </li>
      ))}
    </ul>
  );
};

export { Toolbar };
