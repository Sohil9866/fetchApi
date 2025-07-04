const PRODUCT_KEY = "products";
const form = document.getElementById("productForm");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const product = {
      id: Date.now(),
      title: form.title.value.trim(),
      brand: form.brand.value.trim(),
      category: form.category.value.trim(),
      description: form.description.value,
      price: form.price.value,
    };

    if (product.brand !== "") {
      saveProducts(product);
      form.reset();
      alert("Product saved!");
    }
  });
}

function saveProducts(item) {
  const products = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([item, ...products]));
}
