import { useState } from "react";
import styles from "./header.module.css";
import homeIcon from "../../assets/Logo.svg";
import MenuIcon from "./menuIcon";
import CloseIcon from "./closeIcon";
import { NavLink, Link } from "react-router-dom";
import BagIcon from "../bagIcon/BagIcon";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const activeStyles = {
    transform: "scale(1.1)",
    color: "rgb(110, 15, 0)",
    borderBottom: "1px solid rgb(110, 15, 0)",
  };

  const toggleNavItems = () => {
    setShowNav(!showNav);
  };
  function closeMenu() {
    setShowNav(false);
  }

  return (
    <>
      <header>
        <Link to="/" onClick={closeMenu}>
          <img src={homeIcon} className={styles.homeIcon} alt="" />
        </Link>
        <nav>
          <div className={styles.infoLinks + " " + (showNav && styles.active)}>
            <NavLink
              to="/"
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="about"
              className={styles.navLink}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeMenu}
            >
              About
            </NavLink>
          </div>
          <NavLink
            to="shop"
            className={({ isActive }) =>
              isActive ? styles.shopLinkActive : styles.shopLink
            }
            onClick={closeMenu}
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.cartActive : "")}
            onClick={closeMenu}
          >
            <BagIcon />
          </NavLink>
          <div
            className={styles.menuIcon + " " + (showNav && styles.activeMenu)}
            onClick={toggleNavItems}
          >
            {showNav ? <CloseIcon /> : <MenuIcon />}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
