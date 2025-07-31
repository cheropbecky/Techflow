// Get cart items from local storage
export function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart items to local storage
export function saveCartItems(items) {
  localStorage.setItem('cart', JSON.stringify(items));
}

// Calculate total price of all items
export function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function renderCart() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-cart-message');
  const cartSummary = document.getElementById('cart-summary');
  const cartTotal = document.getElementById('cart-total');

  // Clear old items
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    emptyMessage.classList.remove('hidden');
    cartSummary.classList.add('hidden');
    return;
  }

  // If cart has items
  emptyMessage.classList.add('hidden');
  cartSummary.classList.remove('hidden');

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;

    const itemHTML = `
  <div class="bg-gray-800 text-white p-4 md:p-6 rounded-xl shadow mb-4 flex flex-row md:flex-row items-center md:items-start justify-between gap-4 w-full  mx-auto">
    <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded" />

    <div class="flex-grow text-center md:text-left">
      <h3 class="font-semibold text-lg">${item.name}</h3>
      <p class="text-gray-400 text-sm">Price: Ksh ${item.price.toLocaleString()}</p>

      <div class="mt-2 flex items-center justify-center md:justify-start gap-2">
        <button data-index="${index}" class="decrease-btn px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">–</button>
        <span class="text-white font-semibold">${item.quantity}</span>
        <button data-index="${index}" class="increase-btn px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">+</button>
      </div>
    </div>

    <div class="text-center md:text-right">
      <p class="text-cyan-400 font-bold mt-2 md:mt-0">Ksh ${itemTotal.toLocaleString()}</p>
      <button data-index="${index}" class="remove-btn mt-2 text-red-400 hover:text-red-600 text-sm">
        Remove
      </button>
    </div>
  </div>
`;

  const itemElement = document.createElement('div');
  itemElement.innerHTML = itemHTML.trim();
  itemElement.firstElementChild.classList.add('animate-slide-up'); // 🎉 Add animation
  cartItemsContainer.appendChild(itemElement.firstElementChild);
  });
  


  // Update total
  const total = calculateCartTotal(cartItems);
  cartTotal.textContent = `Ksh ${total.toLocaleString()}`;

  // Remove button functionality
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      removeCartItem(index);
    });
  });

  // Quantity input change
document.querySelectorAll('.increase-btn').forEach(button => {
  button.addEventListener('click', () => {
    const index = parseInt(button.getAttribute('data-index'));
    updateCartQuantity(index, getCartItems()[index].quantity + 1);
  });
});

document.querySelectorAll('.decrease-btn').forEach(button => {
  button.addEventListener('click', () => {
    const index = parseInt(button.getAttribute('data-index'));
    const currentQty = getCartItems()[index].quantity;
    if (currentQty > 1) {
      updateCartQuantity(index, currentQty - 1);
    }
  });
});

}

// Remove item at a specific index
function removeCartItem(index) {
  const cart = getCartItems();
  cart.splice(index, 1);
  saveCartItems(cart);
  renderCart();
}

//Update quantity of a specific item
function updateCartQuantity(index, newQty) {
  const cart = getCartItems();
  if (newQty < 1) return;
  cart[index].quantity = newQty;
  saveCartItems(cart);
  renderCart();
}

// Update the cart count in navbar
export function updateCartCount() {
  const countSpan = document.getElementById('cart-count');
  const cart = getCartItems();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countSpan) countSpan.textContent = totalItems;
}

//Add a product to cart
export function addToCart(product) {
  const cart = getCartItems();
  const index = cart.findIndex(item => item.name === product.name);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartItems(cart);
  updateCartCount();
}
