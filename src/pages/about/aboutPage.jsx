import styles from "./aboutPage.module.css";
function AboutPage() {
  return (
    <>
      <div className={styles.aboutPageDiv}>
        <h1 className={styles.aboutPageHeading}>Fake Store</h1>
        <p className={styles.aboutPageText}>
          This app is made with fake store api to practice front end development
        </p>
        <a href="https://fakestoreapi.com/" target="blank">
          <button className={styles.fakestoreBtn}>
            Checkout Fake store api
          </button>
        </a>
      </div>
    </>
  );
}
export default AboutPage;
