import { render } from '@testing-library/react';
import { nanoid } from 'nanoid';
import { describe, expect, it } from 'vitest';
import { Menu } from '../index'; // Assuming the component is exported from 'index.tsx'
import { MenuItemModel } from '../menu.model';

describe('Menu component tests', () => {
  const testItems: MenuItemModel[] = [
    { name: 'Item 1', id: nanoid() },
    { name: 'Item 2', id: nanoid() },
    { name: 'Item 3', id: nanoid() },
  ];

  it('renders correctly with provided items', () => {
    const { getByTestId } = render(<Menu items={testItems} />);
    expect(getByTestId('context-menu')).toBeInTheDocument();
  });

  it('renders each MenuItem with a unique id', () => {
    const { container } = render(<Menu items={testItems} />);
    const menuItems = container.querySelectorAll('[data-type="menu"]');
    const renderedIds = Array.from(menuItems).map((item) =>
      item.getAttribute('data-id')
    );
    const uniqueIds = new Set(renderedIds);
    expect(uniqueIds.size).toBe(testItems.length);
  });

    it('renders Toolbar when toolbar prop is provided', () => {
      const { getByText } = render(
        <Menu
          items={testItems}
          toolbar={{
            icons: [
              {
                name: 'home',
                icon: <span>home</span>,
              },
              {
                name: 'settings',
                icon: <span>settings</span>,
              },
              {
                name: 'help',
                icon: <span>help</span>,
              },
            ],
          }}
        />
      );
      expect(getByText('home')).toBeInTheDocument();
      expect(getByText('settings')).toBeInTheDocument();
    });

    it('does not crash when items is an empty array', () => {
      const { getByTestId } = render(<Menu items={[]} />);
      expect(getByTestId('context-menu')).toBeInTheDocument();
    });

    it('sets data-testid attribute for test identification', () => {
      const { getByTestId } = render(<Menu items={testItems} />);
      expect(getByTestId('context-menu')).toHaveAttribute(
        'data-testid',
        'context-menu'
      );
    });
});
