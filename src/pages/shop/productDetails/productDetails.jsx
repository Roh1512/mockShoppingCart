import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./productDetails.module.css";
import Image from "../../../components/Image/image";
import LoaderAnimation from "../../../components/loaderAnimation/Loader";
import { getProduct } from "../../../api";
import {
  defer,
  useLoaderData,
  Await,
  Form,
  Link,
  useLocation,
} from "react-router-dom";
import { Suspense, useState } from "react";
import { useCartDispatchContext } from "../../../cartContext";

async function loader({ params }) {
  return defer({ product: getProduct(params.id) });
}

function ProductDetails() {
  const location = useLocation();
  const dataPromise = useLoaderData();
  const [count, setCount] = useState(1);
  const dispatch = useCartDispatchContext();
  const search = location.state?.search || "";
  const category = location.state?.category || "all";

  function incrementCount() {
    setCount((count) => count + 1);
  }
  function decrementCount() {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  }

  function addToCart(value) {
    dispatch({
      type: "add-to-cart",
      value: value,
      count: count,
    });
  }

  return (
    <>
      <div className={styles.productDetailbody}>
        <ToastContainer />
        <Link to={`..${"?" + search}`} relative="path">
          <button className={styles.backButton}>
            &larr; Back to {category} Products
          </button>
        </Link>
        <Suspense fallback={<LoaderAnimation />}>
          <Await resolve={dataPromise.product}>
            {(product) => {
              const notify = () =>
                toast(
                  `${count} ${
                    count > 1 ? "products" : "product"
                  } added to cart.`,
                  {
                    autoClose: 5000,
                    hideProgressBar: false,
                    theme: "dark",
                    closeOnClick: true,
                    draggable: true,
                    position: "bottom-left",
                  }
                );
              return (
                <>
                  <div className={styles.productDetailsDiv}>
                    <Image
                      className={styles.productDetailsImage}
                      url={product.image}
                    />
                    <div className={styles.productDetailsText}>
                      <h1 className={styles.productTitle}>{product.title}</h1>
                      <p className={styles.productPrice}>${product.price}</p>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                      <Form
                        className={styles.orderForm}
                        onSubmit={(e) => {
                          e.preventDefault();
                          addToCart(product);
                          notify();
                        }}
                      >
                        <div className={styles.countDiv}>
                          <button
                            type="button"
                            disabled={count <= 1}
                            onClick={decrementCount}
                            className={styles.countButton}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={count}
                            className={styles.countInput}
                            onChange={(e) => setCount(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={incrementCount}
                            className={styles.countButton}
                          >
                            +
                          </button>
                        </div>
                        <button type="submit" className={styles.addToCartBtn}>
                          Add to cart
                        </button>
                      </Form>
                      <p className={styles.totalInfo}>Quantity: {count}</p>
                      <p className={styles.totalInfo}>
                        Total Price: ${product.price * count}
                      </p>
                    </div>
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export default ProductDetails;
export { loader };
