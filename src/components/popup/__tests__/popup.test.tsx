import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Popup, createPopupPlaceholder } from '../';
import { PopupPosition } from '../../../models/popup.model';
import styles from '../popup.module.scss';

// Mocking the utility function since it interacts with DOM directly
vi.mock('../../effects/utils', () => ({
  styleobjectToCssText: vi.fn(() => 'position: fixed; z-index: 9999;'),
}));

describe('Popup component', () => {
  it('renders an image when type is image', async () => {
    const { queryByRole } = render(
      <Popup type="image" data="img.jpg" position="top" />
    );
    const image = queryByRole('img');

    waitFor(() => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'img.jpg');
    });
  });

  it('renders text when type is text', () => {
    const testData = 'Sample Text';
    const { queryByText } = render(
      <Popup type="text" data={testData} position="top" />
    );
    const text = queryByText(testData);
    expect(text).toBeInTheDocument();
  });

  it('applies correct triangle class based on position', () => {
    const { container } = render(
      <Popup type="text" data="Some text" position="bottom" />
    );
    const triangle = container.querySelector(`.${styles.triangle}`);
    expect(triangle).toHaveClass(styles.bottom);
  });

  it('renders correctly with different positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'];

    positions.forEach((position) => {
      const { container } = render(
        <Popup
          type="text"
          data="Position test"
          position={position as PopupPosition}
        />
      );
      const triangle = container.querySelector(`.${styles.triangle}`);
      expect(triangle).toHaveClass(styles[position]);
    });
  });

  it('renders without crashing when data prop is missing', () => {
    const { container } = render(<Popup type="text" position="top" />);
    // Assuming the component should not crash and should not render the text span
    expect(container.querySelector('span')).not.toBeInTheDocument();
  });
});

describe('createPopupPlaceholder function', async () => {
  it('creates a placeholder div with the correct id and style', () => {
    const placeholder = createPopupPlaceholder({ id: 'test-placeholder' });

    waitFor(() => {
      expect(placeholder.id).toBe('test-placeholder');
      expect(placeholder.style.cssText).toBe('position: fixed; z-index: 9999;');
    });
  });
});
