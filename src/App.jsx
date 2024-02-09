import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Error from "./components/error/error";
import HomePage from "./pages/home/homePage";
import AboutPage from "./pages/about/aboutPage";
import NotFound from "./pages/notFound/notFound";
import ShopPage, {
  loader as shopPageLoader,
} from "./pages/shop/shopPage/shopPage";
import ProductDetails, {
  loader as productDetailsLoader,
} from "./pages/shop/productDetails/productDetails";
import Cart from "./pages/cart/cart";
import CheckoutPage from "./pages/checkout/checkout";
import CartProvider from "./cartContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route path="*" element={<NotFound />} errorElement={<Error />} />
        <Route index element={<HomePage />} errorElement={<Error />} />
        <Route path="about" element={<AboutPage />} errorElement={<Error />} />
        <Route
          path="shop"
          loader={shopPageLoader}
          element={<ShopPage />}
          errorElement={<Error />}
        />
        <Route
          path="shop/:id"
          loader={productDetailsLoader}
          element={<ProductDetails />}
          errorElement={<Error />}
        />
        <Route path="/cart" element={<Cart />} errorElement={<Error />} />
        <Route
          path="/cart/checkout"
          element={<CheckoutPage />}
          errorElement={<Error />}
        />
      </Route>
    </>
  )
);
function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
