import { injectLayout } from "./modules/layout.js";
import { renderProducts } from "./modules/products.js";
import { renderCart } from "./modules/cart.js";

// Inject navbar and footer
injectLayout();

document.addEventListener('DOMContentLoaded', () => {
  
  if (document.getElementById('product-grid')) {
    renderProducts();
  }

  if(document.getElementById('cart-items')) {
    renderCart();
  }
});
