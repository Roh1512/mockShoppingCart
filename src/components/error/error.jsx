import styles from "./error.module.css";
import { useRouteError, Link } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <>
      <div className={styles.errorDiv}>
        <h1 className={styles.errorHeading}>Error: {error.message}</h1>
        <pre>
          {error.status} - {error.statusText}
        </pre>
        <Link className={styles.linkBtn} to="/">
          Go To Home page
        </Link>
      </div>
    </>
  );
}

export default Error;
