import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MenuItem } from '../menu-item'; // Assuming the component is the default export
import style from '../menu.module.scss';

describe('MenuItem component tests', () => {
  it('renders with the correct text from name prop', () => {
    const { getByText } = render(<MenuItem name="Item Name" />);
    expect(getByText('Item Name')).toBeInTheDocument();
  });

  it('applies divider class when divider prop is true', () => {
    const { container } = render(<MenuItem divider />);
    const menuItem = container.firstChild;
    expect(menuItem).toHaveClass(style.divider);
  });

  it('applies disabled class when disabled prop is true', () => {
    const { container } = render(<MenuItem disabled />);
    const menuItem = container.firstChild;
    expect(menuItem).toHaveClass(style.disabled);
  });

  it('renders the icon when provided', () => {
    const Icon = () => <span>Icon</span>;
    const { getByText } = render(<MenuItem icon={<Icon />} />);
    expect(getByText('Icon')).toBeInTheDocument();
  });

  it('sets data attributes correctly based on props', () => {
    const { container } = render(<MenuItem name="Item Name" id="item-id" />);
    const menuItem = container.firstChild;
    expect(menuItem).toHaveAttribute('data-name', 'Item Name');
    expect(menuItem).toHaveAttribute('data-id', 'item-id');
    expect(menuItem).toHaveAttribute('data-type', 'menu');
  });

  it('renders without crashing when optional props are not provided', () => {
    const { container } = render(<MenuItem />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
