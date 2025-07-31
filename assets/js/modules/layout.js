// reusable navbar and footer with Tailwind CSS
export function injectLayout() {
  document.body.classList.add("bg-gray-950", "font-sans", "relative");

  //animation styles
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slide-up {
      animation: slide-up 0.6s ease-out forwards;
    }
  `;
  document.head.appendChild(style);


  // Background
  const backgroundGlow = `
    <div class="fixed inset-0 -z-10 top-0 left-0 w-full h-full overflow-hidden">
      <div class="absolute top-10 left-10 w-64 h-64 bg-gradient-to-tr from-cyan-200 via-white to-blue-400 opacity-30 blur-2xl rounded-full"></div>
      <div class="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-500 via-white to-cyan-300 opacity-40 blur-3xl rounded-full"></div>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", backgroundGlow);

  //Navbar
  const header = document.createElement('header');
  header.innerHTML = `
  <nav class="bg-gray-900 text-white px-4 py-4 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <a href="index.html">
        <img src="assets/images/logo.png" alt="TechFlow Logo" class="h-20 w-auto">
      </a>
    </div>

    <!-- Hamburger (mobile) -->
    <button class="text-white text-4xl md:hidden focus:outline-none" id="menu-toggle">
      ☰
    </button>

    <!-- Nav Links -->
    <ul id="nav-menu" class="hidden flex-col absolute top-20 right-0 w-1/2 bg-gray-900 p-4 md:static md:flex md:flex-row md:items-center md:gap-6 font-medium transition-all duration-300">
      <li><a class="hover:text-cyan-400 transition block py-2" href="index.html">Home</a></li>
      <li><a class="hover:text-cyan-400 transition block py-2" href="about.html">About Us</a></li>
      <li><a class="hover:text-cyan-400 transition block py-2" href="products.html">Our Products</a></li>
      <li><a class="hover:text-cyan-400 transition block py-2" href="signup.html">Sign Up</a></li>
      <li><a class="hover:text-cyan-400 transition block py-2" href="contact.html">Contact Us</a></li>
      <li>
        <a class="hover:text-cyan-400 transition block py-2 relative" href="cart.html">
          Cart 
          <span id="cart-count" class="ml-1 bg-red-500 text-white font-bold px-2 py-0.5 rounded-full text-xs">0</span>
        </a>
      </li>
    </ul>
  </nav>
  `;
  document.body.prepend(header);

  // Footer
  const footer = document.createElement('footer');
footer.innerHTML = `
  <footer class="bg-gray-900 text-gray-300 pt-10 px-4">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
      <div>
        <h2 class="text-cyan-400 text-xl font-bold mb-2">TechFlow</h2>
        <p class="text-sm">Premium gadgets. Seamless experience.</p>
      </div>
      <div>
        <h3 class="text-cyan-400 text-lg font-semibold mb-2">Explore</h3>
        <ul class="space-y-1 text-sm">
          <li><a href="index.html" class="hover:text-cyan-400">Home</a></li>
          <li><a href="blog.html" class="hover:text-cyan-400">Blog</a></li>
          <li><a href="contact.html" class="hover:text-cyan-400">Contact</a></li>
          <li><a href="signup.html" class="hover:text-cyan-400">Sign Up</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-cyan-400 text-lg font-semibold mb-2">Contact</h3>
        <p class="text-sm">Nairobi, Kenya</p>
        <p class="text-sm">+254 712 345 678</p>
        <p class="text-sm">support@techflow.com</p>
        <div class="flex gap-4 mt-3 text-white text-lg">
          <a href="#" class="hover:text-cyan-400"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="hover:text-cyan-400"><i class="fab fa-x-twitter"></i></a>
          <a href="#" class="hover:text-cyan-400"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="text-center text-xs py-4 text-gray-500">
      &copy; 2025 TechFlow. Powered by innovation.
    </div>
  </footer>
`;

  document.body.appendChild(footer);

  // Mobile nav toggle logic
  document.getElementById('menu-toggle').addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('flex');
    navMenu.classList.add('flex-col', 'absolute', 'top-20', 'left-0', 'right-0', 'w-1/2', 'bg-gray-800', 'z-40', 'p-4', 'md:hidden');
  });
}
