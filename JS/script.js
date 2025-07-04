const PRODUCT_KEY = "products";

const getCached = () => JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

const saveCache = (products) =>
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));

const button = document.getElementById("fetchProducts");
const tableBody = document.querySelector("#productTable tbody");

document.addEventListener("DOMContentLoaded", () => {
  const cachedProducts = getCached();
  if (cachedProducts.length) {
    renderProducts(cachedProducts);
  } else {
    fetchAPI();
  }
});

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

tableBody.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;
  const id = Number(e.target.dataset.id);
  const updated = getCached().filter((p) => p.id !== id);

  saveCache(updated);
  renderProducts(updated);
});
