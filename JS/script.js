const button = document.getElementById("fetchProducts");
const tableBody = document.querySelector("#productTable tbody");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const products = data.products;

    tableBody.innerHTML = "";

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.brand}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
          `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
