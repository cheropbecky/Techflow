import { injectLayout } from "./modules/layout.js";
import { renderProducts } from "./modules/products.js";
import { renderCart } from "./modules/cart.js";

// Inject navbar and footer
injectLayout();

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('section.relative');
  const cta = document.querySelector('section.bg-gradient-to-r');
  const featured = document.querySelector('section.bg-gray-800');
  const newsletter = document.querySelector('section.bg-gray-900');

  [hero, cta, featured, newsletter].forEach((section, index) => {
    if (section) {
      section.classList.add('opacity-0'); 
      setTimeout(() => {
        section.classList.add('animate-slide-up');
        section.classList.remove('opacity-0');
      }, index * 150);
    }
  });

  if (document.getElementById('product-grid')) {
    renderProducts();
  }

  if(document.getElementById('cart-items')) {
    renderCart();
  }

});
