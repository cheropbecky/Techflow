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
      <div class="bg-gray-800 text-white p-8 rounded-xl shadow mb-4 flex justify-center space-x-4 w-[800px]">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded" />
        <div class="flex-grow">
          <h3 class="font-semibold text-lg">${item.name}</h3>
          <p class="text-gray-400 text-sm">Price: Ksh ${item.price.toLocaleString()}</p>
          <label class="text-sm text-gray-300 mt-1 block">Quantity:
            <input 
              type="number" 
              min="1" 
              value="${item.quantity}" 
              data-index="${index}" 
              class="quantity-input bg-gray-800 text-white px-2 py-1 rounded w-16 text-center mt-1"
            />
          </label>
        </div>
        <div class="text-right">
          <p class="text-cyan-400 font-bold">Ksh ${itemTotal.toLocaleString()}</p>
          <button data-index="${index}" class="remove-btn mt-2 text-red-400 hover:text-red-600 text-sm">
            Remove
          </button>
        </div>
      </div>
    `;

    cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
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
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = parseInt(input.getAttribute('data-index'));
      const newQty = parseInt(e.target.value);
      updateItemQuantity(index, newQty);
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
