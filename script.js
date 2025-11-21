 const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const closeBtn = document.getElementById('nav-close');

    toggle.addEventListener('click', () => nav.classList.toggle('active'));
    closeBtn.addEventListener('click', () => nav.classList.remove('active'));

// Hero Slider
let index = 0;
const slides = document.getElementById("slides");
if (slides) {
  const total = slides.children.length;
  setInterval(() => {
    index = (index + 1) % total;
    slides.style.transform = `translateX(-${index * 100}vw)`;
  }, 7000);
}

// View product details
function viewProduct(name, price, image, description) {
  const product = { name, price, image, description };
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}

// Load product details
document.addEventListener("DOMContentLoaded", () => {
  const productDetailSection = document.getElementById("product-detail");
  if (productDetailSection) {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
      productDetailSection.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <h3>₦${product.price.toLocaleString()}</h3>
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" min="1" value="1">
          <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
      `;
    }
  }

  // Update cart count on page load
  updateCartCount();
});

// Add to cart function
function addToCart(name, price, image) {
  const quantity = parseInt(document.getElementById("quantity").value);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, image, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${quantity} ${name} added to cart`);
}

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

