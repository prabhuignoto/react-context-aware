import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SpinningRing from '../index'; // Assuming the component is the default export
import styles from '../style.module.scss';

describe('SpinningRing component tests', () => {
  it('renders correctly with default props', async () => {
    const { getByTestId } = render(<SpinningRing />);
    const ringContainer = getByTestId('spinning-ring');

    waitFor(() => {
      expect(ringContainer).toHaveStyle({
        width: '150px',
        height: '150px',
        animation: `spin 2s linear infinite`,
      });
    });
  });

  it('renders with the correct size when provided', async () => {
    const { getByTestId } = render(<SpinningRing size="200px" />);
    const ringContainer = getByTestId('spinning-ring');

    waitFor(() => {
      expect(ringContainer).toHaveStyle({
        width: '200px',
        height: '200px',
      });
    });
  });

  it('uses the correct colors in the conic gradient when provided', async () => {
    const customColors = ['#000', '#FFF'];
    const { getByTestId } = render(<SpinningRing colors={customColors} />);
    const ringContainer = getByTestId('spinning-ring');

    waitFor(() => {
      expect(ringContainer).toHaveStyle({
        background: `conic-gradient(from 0deg, ${customColors.join(', ')})`,
      });
    });
  });

  it('sets the animation speed correctly based on the animationSpeed prop', async () => {
    const { getByTestId } = render(<SpinningRing animationSpeed={5} />);
    const ringContainer = getByTestId('spinning-ring');

    waitFor(() => {
      expect(ringContainer).toHaveStyle({
        animation: `spin 5s linear infinite`,
      });
    });
  });

  it('is responsive when the responsive prop is true', async () => {
    const { getByTestId } = render(<SpinningRing responsive />);
    const ringContainer = getByTestId('spinning-ring');
    // We assume that the responsive style means the size is a function of the viewport width

    waitFor(() => {
      expect(ringContainer).toHaveStyle({
        width: `calc(150px * 100vw)`,
        height: `calc(150px * 100vw)`,
      });
    });
  });

  it('applies the appropriate styles from style.module.scss', () => {
    const { getByTestId } = render(<SpinningRing />);
    const ringContainer = getByTestId('spinning-ring');
    // This test assumes that there are some styles that can be directly tested from the style module
    expect(ringContainer).toHaveClass(styles.ringContainer);
  });
});
