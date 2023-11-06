import React from 'react';
import styles from './style.module.scss';

interface SpinningRingProps {
  colors?: string[];
  size?: string;
  animationSpeed?: number;
  responsive?: boolean;
}

const SpinningRing: React.FC<SpinningRingProps> = ({
  colors = ['#ff3e3e', '#ffdd1e', '#28d760', '#1e90ff', '#ff3e3e'],
  size = '150px',
  animationSpeed = 2,
  responsive = false,
}) => {
  // If responsive, size could be a percentage of the viewport width
  const finalSize = responsive ? `calc(${size} * 1vw)` : size;

  return (
    <div
      className={styles.ringContainer}
      style={
        {
          '--ring-size': finalSize,
          '--animation-speed': `${animationSpeed}s`,
          '--ring-colors': colors.join(', '),
        } as React.CSSProperties
      }
    >
      <div className={styles.ring}></div>
    </div>
  );
};

export default React.memo(SpinningRing);
