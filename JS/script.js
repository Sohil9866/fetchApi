/**
 * Key used to store/retrieve products from localStorage
 * @constant {string}
 */
const PRODUCT_KEY = "products";

/**
 * Gets cached product data from localStorage.
 * @returns {Array<Object>} List of cached products or an empty array.
 */
const getCached = () => JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

/**
 * Saves product data to localStorage.
 * @param {Array<Object>} products - The list of products to store.
 */
const saveCache = (products) =>
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));

/**
 * Button element to fetch products manually.
 * @type {HTMLButtonElement|null}
 */
const button = document.getElementById("fetchProducts");

/**
 * Table body element where product rows will be inserted.
 * @type {HTMLTableSectionElement|null}
 */
const tableBody = document.querySelector("#productTable tbody");

/**
 * Runs when the HTML document is fully loaded.
 * If there are cached products, display them. Otherwise, fetch from API.
 */
document.addEventListener("DOMContentLoaded", () => {
  const cachedProducts = getCached();
  if (cachedProducts.length) {
    renderProducts(cachedProducts);
  } else {
    fetchAPI();
  }
});

/**
 * Fetches product data from a remote API and updates the UI and cache.
 * Disables the fetch button while loading and handles errors gracefully.
 * @async
 * @returns {Promise<void>}
 */
async function fetchAPI() {
  try {
    button.disabled = true;

    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error("Network response was not ok");

    const apiProducts = (await res.json()).products;
    saveCache(apiProducts);
    renderProducts(apiProducts);
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Could not load products. See console for details.");
  } finally {
    button.disabled = false;
  }
}

/**
 * Renders a list of product rows inside the table.
 * @param {Array<Object>} products - List of products to display.
 */
function renderProducts(products) {
  tableBody.innerHTML = "";
  products.forEach((p) => {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td>${p.brand}</td>
        <td>${p.category}</td>
        <td>${p.title}</td>
        <td>$${p.price}</td>
        <td><button class="delete-btn" data-id="${p.id}">Delete</button></td>
      </tr>`
    );
  });
}

/**
 * Handles click events on the product table.
 * If a delete button is clicked, removes the product and updates the UI.
 */
tableBody.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;
  const id = Number(e.target.dataset.id);
  const updated = getCached().filter((p) => p.id !== id);

  saveCache(updated);
  renderProducts(updated);
});
