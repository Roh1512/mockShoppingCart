import { Link } from "react-router-dom";
import styles from "./homePage.module.css";
Link;
function HomePage() {
  return (
    <>
      <div className={styles.homepageBody}>
        <h1 className={styles.homepageHeading}>
          Shop smarter, not harder. Find everything you need with amazing deals
          and fast delivery.
        </h1>
        <Link to="/shop" className={styles.homePageLink}>
          View Our shop
        </Link>
      </div>
    </>
  );
}
export default HomePage;
