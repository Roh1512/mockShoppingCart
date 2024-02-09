import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/Footer";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <>
      <div className={styles.layoutDiv}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
export default Layout;
