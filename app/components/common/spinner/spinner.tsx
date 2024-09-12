// components/Spinner.tsx
import React from 'react';
import styles from './style.module.css';

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.house}>
        <div className={styles.roof}></div>
        <div className={styles.walls}></div>
        <div className={styles.door}></div>
      </div>
    </div>
  );
};

export default Spinner;
