const PRODUCT_KEY = "products";
  const form =
    document.getElementById("productForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const product = {
        id: Date.now().toString(),
        title:form.title.value.trim(),
        brand: form.brand.value.trim(),
        category: form.category.value.trim(),
        description: form.description.value,
        price: form.price.value,
      };
      console.log(product);
      
      if (product.brand !== "") {
        saveproducts(product);
        form.reset();
        alert("Product saved!");
      }
    });
  }
function saveproducts(item) {
  const product = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
  product.unshift(item); 
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(product));
}