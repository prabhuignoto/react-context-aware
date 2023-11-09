import { nanoid } from 'nanoid';
import { FunctionComponent, ReactNode, useRef } from 'react';
import styles from './toolbar.module.scss';

export type ToolbarProps = {
  items: {
    name?: string;
    icon: ReactNode;
  }[];
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ items = [] }) => {
  const toolbarItems = useRef(
    items.map((item) => ({
      ...item,
      id: nanoid(),
    }))
  );

  return (
    <ul className={styles.toolbar}>
      {toolbarItems.current.map((item) => (
        <li
          key={`${item.id}`}
          className={styles.toolbar_item}
          data-type="toolbar"
          data-name={item.name}
          data-id={item.id}
        >
          <span className={styles.icon}>{item.icon}</span>
        </li>
      ))}
    </ul>
  );
};

export { Toolbar };
