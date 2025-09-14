import styles from "../styles/QuickAccess.module.css";

function QuickAccess() {
  return (
    <div className={styles.container}>
      <div className={styles.icon_wrapper}>
        <span className={styles.icon_text}>S</span>
      </div>
      <span className={styles.title}>quick access</span>
    </div>
  );
}

export default QuickAccess;
