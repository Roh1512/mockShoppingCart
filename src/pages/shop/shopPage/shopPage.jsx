import PropTypes from "prop-types";
import LoaderAnimation from "../../../components/loaderAnimation/Loader";
import {
  useLoaderData,
  Link,
  defer,
  Await,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { Suspense } from "react";
import styles from "./shopPage.module.css";
import { getAllProducts, getCategories } from "../../../api";
import Image from "../../../components/Image/image";

export async function loader() {
  return defer({ catogories: getCategories(), products: getAllProducts() });
}

function ShopPage() {
  const navigation = useNavigation();
  const dataPromise = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category");

  function renderCategoryButtons(catogories) {
    const catogoriesToDisplay = catogories.map((catogory) => {
      const isActive = catogory === categoryFilter;
      return (
        <div key={catogory}>
          <button
            className={`${styles.categoryBtn} ${
              isActive ? styles.categorySelected : ""
            }`}
            onClick={() => setSearchParams({ category: catogory })}
          >
            {catogory.toUpperCase()}
          </button>
        </div>
      );
    });
    return (
      <div className={styles.categoryDiv}>
        {catogoriesToDisplay}{" "}
        {categoryFilter && (
          <button
            className={styles.allProductsBtn}
            onClick={() => setSearchParams({ catogory: "" })}
          >
            ALL PRODUCTS
          </button>
        )}
      </div>
    );
  }

  function renderProducts(products) {
    const productsFiltered = products.filter(
      (product) => !categoryFilter || product.category === categoryFilter
    );
    const productsToDisplay = productsFiltered.map((product) => {
      return (
        <div key={product.id}>
          <Link
            to={`${product.id}`}
            state={{
              search: searchParams.toString(),
              category: categoryFilter,
            }}
          >
            <Card product={product} />
          </Link>
        </div>
      );
    });
    return (
      <>
        {navigation.state === "loading" ? (
          <LoaderAnimation />
        ) : (
          <div className={styles.productsList}>{productsToDisplay}</div>
        )}
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<LoaderAnimation />}>
        <Await resolve={dataPromise.catogories}>{renderCategoryButtons}</Await>
        <Await resolve={dataPromise.products}>{renderProducts}</Await>
      </Suspense>
    </>
  );
}

export default ShopPage;

function Card({ product }) {
  return (
    <>
      <div className={styles.cardDiv}>
        <Image className={styles.cardImage} url={product.image} />
        <h2 className={styles.cardTitle}>{product.title}</h2>
        <p className={styles.cardPrice}>${product.price}</p>
      </div>
    </>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
