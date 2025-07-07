/**
 * The key used to store and retrieve products from localStorage.
 * @constant {string}
 */
const PRODUCT_KEY = "products";

/**
 * The HTML form element used to submit new product data.
 * @type {HTMLFormElement|null}
 */
const form = document.getElementById("productForm");

/**
 * Adds a submit event listener to the form (if found).
 * On submit, it collects form values, creates a product object,
 * validates it, saves it to localStorage, and resets the form.
 */
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload on submit

    /**
     * @type {{ id: number, title: string, brand: string, category: string, description: string, price: string }}
     */
    const product = {
      id: Date.now(), // Unique ID based on current timestamp
      title: form.title.value.trim(),
      brand: form.brand.value.trim(),
      category: form.category.value.trim(),
      description: form.description.value,
      price: form.price.value,
    };

    if (product.brand !== "") {
      saveProducts(product);
      form.reset(); // Clear form fields
      alert("Product saved!");
    }
  });
}

/**
 * Saves a single product to localStorage.
 * Adds the product to the beginning of the existing product list.
 *
 * @param {Object} item - The product object to save.
 * @param {number} item.id - Unique product ID.
 * @param {string} item.title - Product title.
 * @param {string} item.brand - Product brand.
 * @param {string} item.category - Product category.
 * @param {string} item.description - Product description.
 * @param {string} item.price - Product price.
 */
function saveProducts(item) {
  const products = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([item, ...products]));
}
