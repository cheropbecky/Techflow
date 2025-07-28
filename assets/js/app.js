import { injectLayout } from "./modules/layout.js";
//import { updateCartCount } from "./modules/cart.js";
import { renderProducts } from "./modules/products.js";

// Inject navbar and footer
injectLayout();

document.addEventListener('DOMContentLoaded', () => {
  // Only render products if the grid exists on the current page
  if (document.getElementById('product-grid')) {
    renderProducts();
  }

  // Update cart count if needed
 // updateCartCount();
});
