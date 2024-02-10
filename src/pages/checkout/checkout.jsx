import { Link } from "react-router-dom";
import { useMemo } from "react";
import styles from "./check.module.css";
import { useCartContext } from "../../cartContext";

function CheckoutPage() {
  const cartState = useCartContext();

  const totalPrice = useMemo(() => {
    return cartState.reduce(
      (total, product) => total + product.count * product.price,
      0
    );
  }, [cartState]);

  return (
    <>
      <div className={styles.checkoutDiv}>
        {cartState.length > 0 ? (
          <>
            <h1 className={styles.checkoutheading}>Order Details</h1>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
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
                  <th colSpan={3}>${totalPrice}</th>
                </tr>
              </tbody>
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
          </>
        ) : (
          <h1 className={styles.checkoutheading}>Nothing to buy</h1>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
