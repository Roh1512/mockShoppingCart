import styles from "./Loader.module.css";

function LoaderAnimation() {
  return (
    <>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
}

export default LoaderAnimation;
