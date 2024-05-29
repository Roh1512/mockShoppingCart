import styles from "./Footer.module.css";
function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <footer>
        <p>
          <span>&#169;</span> Shopping Cart {date}
        </p>
      </footer>
    </>
  );
}
export default Footer;
