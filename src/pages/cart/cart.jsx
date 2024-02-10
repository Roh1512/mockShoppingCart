import PropTypes from "prop-types";
import styles from "./cart.module.css";
import Image from "../../components/Image/image";
import DeleteIcon from "../../assets/deleteicon";
import { Link } from "react-router-dom";
import { useCartContext, useCartDispatchContext } from "../../cartContext";
import { useMemo } from "react";
function Cart() {
  const cartState = useCartContext();
  const totalPrice = useMemo(() => {
    return cartState.reduce(
      (total, product) => total + product.count * product.price,
      0
    );
  }, [cartState]);

  return (
    <>
      {cartState.length > 0 ? (
        <div className={styles.cartBody}>
          {cartState.map((product) => {
            return (
              <div key={product.id}>
                <CartCard product={product} />
              </div>
            );
          })}
          <div className={styles.checkoutDiv}>
            <p className={styles.totalPrice}>
              Total: <span>${totalPrice}</span>
            </p>
            <Link to="checkout">
              <button className={styles.checkoutButton}>
                Proceed to checkout
              </button>
            </Link>
            <Link to="/shop">
              <button className={styles.shopBtn}>Continue Shopping</button>
            </Link>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

function CartCard({ product }) {
  const dispatch = useCartDispatchContext();
  function deleteProduct(product) {
    dispatch({
      type: "delete-product",
      product: product,
    });
  }
  return (
    <div className={styles.cartCardDiv}>
      <Image className={styles.productImage} url={product.image} />
      <div className={styles.productDetailsDiv}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productCount}>
          {product.count + " "}
          {product.count > 1 ? "pieces" : "piece"}
        </p>
        <p className={styles.productPrice}>${product.price * product.count}</p>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteProduct(product)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <>
      <div className={styles.emptyCartDiv}>
        <h2 className={styles.emptyCartheading}>Your Cart is Empty</h2>
        <Link to="/shop">
          <button className={styles.emptyCartBtn}>Go to shop</button>
        </Link>
      </div>
    </>
  );
}

CartCard.propTypes = {
  product: PropTypes.object,
};

export default Cart;
