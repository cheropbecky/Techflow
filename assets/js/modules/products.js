import { addToCart, updateCartCount } from './cart.js';

// Product templates 
const productNames = {
  Mac: ["MacBook Pro M2", "MacBook Air M2", "Mac Mini", "Mac Studio", "MacBook Pro 14"],
  iMac: ["iMac 24-inch", "iMac M3", "iMac Retina", "iMac Pro", "iMac Slim"],
  iPhone: ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone SE"],
  iPad: ["iPad Pro M2", "iPad Air", "iPad 10th Gen", "iPad Mini", "iPad 9th Gen"],
  Watch: ["Apple Watch Series 9", "Apple Watch Ultra", "Apple Watch SE", "Apple Watch Nike", "Apple Watch Hermes"],
  AirPods: ["AirPods Pro", "AirPods 3rd Gen", "AirPods Max", "AirPods 2nd Gen", "AirPods SE"],
  Headphones: ["Beats Studio Pro", "Beats Solo 3", "Sony WH-1000XM5", "Sennheiser Momentum", "JBL Live 660NC"],
  PlayStation: ["PS5 Slim", "PS5 Digital", "PlayStation VR2", "PS4 Pro", "PS5 Controller"],
  Accessories: ["MagSafe Charger", "AirTag", "Magic Mouse", "Apple Pencil", "USB-C Adapter"]
};

const categories = {
  Mac: 'macpro',
  iMac: 'imac',
  iPhone: 'iphone',
  iPad: 'ipad',
  Watch: 'watch',
  AirPods: 'earpod',
  Headphones: 'headphone',
  PlayStation: 'play',
  Accessories: 'acc'
};

// Base prices
const basePrices = {
  Mac: 180000,
  iMac: 160000,
  iPhone: 90000,
  iPad: 95000,
  Watch: 55000,
  AirPods: 30000,
  Headphones: 40000,
  PlayStation: 80000,
  Accessories: 10000
};

const products = [];

// Generate products
Object.entries(categories).forEach(([category, baseName]) => {
  const names = productNames[category];
  names.forEach((productName, index) => {
    products.push({
      name: productName,
      category,
      price: basePrices[category] + Math.floor(Math.random() * 10000),
      image: `assets/images/${baseName}${index + 1}.jpeg`
    });
  });
});

// Create card element for each product
function createCard(product) {
  const card = document.createElement('div');
  card.className = `
    bg-gray-800 rounded-2xl text-yellow-400 shadow-[0_4px_20px_rgba(255,215,0,0.1)]
    overflow-hidden p-4 w-full max-w-xs transform hover:scale-105 transition duration-300
  `;

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="w-full h-55 object-cover rounded-md mb-4">
    <h2 class="text-lg font-bold mb-2 text-center text-white">${product.name}</h2>
    <p class="text-center mb-2 text-white">Ksh ${product.price.toLocaleString()}</p>
    <button class="add-to-cart bg-cyan-500 hover:bg-cyan-700 text-gray-300 px-4 py-2 rounded-full block mx-auto font-semibold">
      Add to Cart
    </button>
  `;

  const button = card.querySelector('.add-to-cart');
  button.addEventListener('click', () => {
    addToCart(product);
    updateCartCount();
    alert(`${product.name} has been added to your cart.`);
  });

  return card;
}

// Render products to the DOM
export function renderProducts(filtered = products) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = '';
  filtered.forEach(product => {
    grid.appendChild(createCard(product));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search-input");

  // Live search
  if (search) {
    search.addEventListener("input", () => {
      const query = search.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
      );
      renderProducts(filtered);
    });
  }

  // Render all products and update cart count initially
  renderProducts();
  updateCartCount();
});
