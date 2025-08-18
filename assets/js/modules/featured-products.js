
import { addToCart, updateCartCount } from "./cart.js";

//Product data
const products = [
  {
    id: "macbook-air",
    name: "MacBook Air M2",
    price: "$999",
    category: "mac",
    description:
      "The new MacBook Air with the M2 chip delivers blazing performance in an ultra-thin design.",
    images: ["assets/images/macpro1.jpeg", "assets/images/macpro2.jpeg"],
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    price: "$1,099",
    category: "iphone",
    description:
      "The iPhone 15 Pro combines stunning design, incredible speed, and the best camera system yet.",
    images: ["assets/images/iphone2.jpeg", "assets/images/iphone3.jpeg"],
  },
  {
    id: "ipad-pro",
    name: 'iPad Pro 12.9"',
    price: "$1,199",
    category: "ipad",
    description:
      "iPad Pro with the M2 chip, Liquid Retina XDR display, and Apple Pencil 2 support.",
    images: ["assets/images/ipad2.jpeg", "assets/images/ipad3.jpeg"],
  },
  {
    id: "airpods-pro",
    name: "AirPods Pro",
    price: "$249",
    category: "airpods",
    description:
      "AirPods Pro with Active Noise Cancellation and incredible sound quality.",
    images: ["assets/images/earpod3.jpeg", "assets/images/earpod2.jpeg"],
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    price: "$399",
    category: "watch",
    description:
      "The Apple Watch Series 9 with powerful health and fitness tracking.",
    images: ["assets/images/watch2.jpeg", "assets/images/watch3.jpeg"],
  },
];

function sanitizePrice(val) {
  if (typeof val === "number") return val;
  const n = parseFloat(String(val || "").replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

//main 
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount?.();

  const params = new URLSearchParams(location.search);
  const productId = params.get("id");

  const product = products.find((p) => p.id === productId);
  const detailsContainer = document.getElementById("product-details");
  const categoryLink = document.getElementById("category-link");

  if (!detailsContainer) return;

  if (!product) {
    detailsContainer.innerHTML =
      '<p class="text-red-400">Product not found.</p>';
    if (categoryLink) categoryLink.classList.add("hidden");
    return;
  }

  // Render UI
  detailsContainer.innerHTML = `
    <div class="flex-1">
      <img id="main-image" src="${product.images[0]}" alt="${product.name}" class="w-full rounded-lg mb-4">
      <div class="flex gap-2 flex-wrap">
        ${product.images
          .map(
            (img, i) => `
            <img data-idx="${i}" src="${img}" alt="${product.name} ${i + 1}"
                 class="w-20 h-20 rounded-lg cursor-pointer border hover:border-cyan-400">
          `
          )
          .join("")}
      </div>
    </div>

    <div class="flex-1">
      <h1 class="text-3xl font-bold text-cyan-400 mb-4">${product.name}</h1>
      <p class="text-xl font-bold text-cyan-400 mb-2">${product.price}</p>
      <p class="text-gray-300 mb-6">${product.description}</p>

      <button id="add-to-cart-btn"
        class="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">
        Add to Cart
      </button>
    </div>
  `;

  // See-more link
  if (categoryLink) {
    categoryLink.href = `products.html#${product.category}`;
    categoryLink.classList.remove("hidden");
  }

  // Thumbnail swap main image
  const mainImg = detailsContainer.querySelector("#main-image");
  detailsContainer.querySelectorAll("img[data-idx]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      if (mainImg) mainImg.src = thumb.getAttribute("src");
    });
  });
  const normalized = {
    name: product.name,
    price: sanitizePrice(product.price), 
    image: product.images[0], 
    quantity: 1,
  };

  detailsContainer
    .querySelector("#add-to-cart-btn")
    .addEventListener("click", () => {
      addToCart(normalized);
      alert(`${product.name} has been added to your cart.`);
      
    });
});
