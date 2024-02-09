import { Link } from "react-router-dom";
import styles from "./check.module.css";
import { useCartContext } from "../../cartContext";

function CheckoutPage() {
  const cartState = useCartContext();

  function totalPrice() {
    let total = 0;
    cartState.map((product) => {
      return (total = total + product.count * product.price);
    });
    return total;
  }
  const total = totalPrice();

  return (
    <>
      <div className={styles.checkoutDiv}>
        <h1 className={styles.checkoutheading}>Order Details</h1>
        <table>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cartState.map((product) => {
            return (
              <>
                <tr>
                  <td>{product.title}</td>
                  <td>${product.price}</td>
                  <td>{product.count}</td>
                  <td>${product.count * product.price}</td>
                </tr>
              </>
            );
          })}
          <tr>
            <th>Bill Total</th>
            <th colSpan={3}>${total}</th>
          </tr>
        </table>
        <p className={styles.orderDetailsTxt}>
          Your mock order has been placed! &#9989;
        </p>
        <Link to="/" className={`${styles.linkBtn} ${styles.homeBtn}`}>
          Return Home
        </Link>
        <Link to="/shop" className={`${styles.linkBtn} ${styles.shopBtn}`}>
          Countinue shopping
        </Link>
      </div>
    </>
  );
}

export default CheckoutPage;
