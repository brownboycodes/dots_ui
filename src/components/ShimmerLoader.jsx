import React from "react";
import styles from "../styles/ShimmerEffect.module.css";

const ShimmerEffect = () => {
  return (
    <div className={styles.skeletonLoader}>
      <div className={styles.skeletonIcon}></div>
      <div className={styles.skeletonLinesContainer}>
        <div className={styles.skeletonLine}></div>
        <div className={`${styles.skeletonLine} ${styles.skeletonShort}`}></div>
      </div>
    </div>
  );
};

export default ShimmerEffect;
