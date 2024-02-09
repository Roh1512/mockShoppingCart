import styles from "./notFound.module.css";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div className={styles.notFoundDiv}>
        <h1>Sorry, the page you were looking for was not found.</h1>
        <Link to="/" className={styles.linkBtn}>
          Return to Home
        </Link>
      </div>
    </>
  );
}
export default NotFound;
