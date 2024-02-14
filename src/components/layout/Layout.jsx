import { Outlet, useNavigation } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/Footer";
import styles from "./Layout.module.css";
import LoaderAnimation from "../loaderAnimation/Loader";

function Layout() {
  const navigation = useNavigation();
  return (
    <>
      <div className={styles.layoutDiv}>
        <Header />
        <main>
          {navigation.state === "loading" ? <LoaderAnimation /> : <Outlet />}
        </main>
        <Footer />
      </div>
    </>
  );
}
export default Layout;
