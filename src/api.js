async function getCategories() {
  const catagories = await fetch(
    "https://fakestoreapi.com/products/categories"
  );
  return catagories.json();
}

async function getAllProducts() {
  const products = await fetch("https://fakestoreapi.com/products");
  return products.json();
}

async function getProduct(id) {
  const product = await fetch(`https://fakestoreapi.com/products/${id}`);
  return product.json();
}

export { getCategories, getAllProducts, getProduct };
