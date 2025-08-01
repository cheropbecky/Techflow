
// Render the shipping form
export function renderCheckoutUI() {
  const shippingFields = [
    { type: "text", placeholder: "First Name", id: "firstName" },
    { type: "text", placeholder: "Last Name", id: "lastName" },
    { type: "email", placeholder: "Email Address", id: "email" },
    { type: "tel", placeholder: "Phone Number", id: "phone" },
    { type: "text", placeholder: "Street Address", id: "address" },
    {
      type: "row",
      fields: [
        { type: "text", placeholder: "City", id: "city" },
        { type: "text", placeholder: "State", id: "state" }
      ]
    },
    { type: "text", placeholder: "ZIP Code", id: "zip" },
    {
      type: "select",
      placeholder: "Select Country",
      id: "country",
      options: ["Kenya", "USA", "UK", "Germany"]
    }
  ];

  const createInput = ({ type = "text", placeholder = "", full = true, id = "" }) => {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.id = id;
    input.className = `${full ? "w-full" : "w-1/2"} p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`;
    return input;
  };

  const createSelect = ({ options, placeholder, id }) => {
    const select = document.createElement("select");
    select.id = id;
    select.className = "w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500";
    const defaultOpt = document.createElement("option");
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    defaultOpt.textContent = placeholder;
    select.appendChild(defaultOpt);
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    return select;
  };

  const container = document.getElementById("shipping-info");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "space-y-4";

  shippingFields.forEach(field => {
    if (field.type === "row") {
      const row = document.createElement("div");
      row.className = "flex gap-4";
      field.fields.forEach(subField => row.appendChild(createInput({ ...subField, full: false })));
      wrapper.appendChild(row);
    } else if (field.type === "select") {
      wrapper.appendChild(createSelect(field));
    } else {
      wrapper.appendChild(createInput(field));
    }
  });

  container.appendChild(wrapper);
}

//Update Order Summary
function getCartSubtotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function updateOrderSummary() {
  const subtotal = getCartSubtotal();
  let shippingCost = 0;
  const selected = document.querySelector('input[name="shipping"]:checked')?.nextElementSibling?.textContent;
  if (selected?.includes("Express")) shippingCost = 9.99;
  else if (selected?.includes("Overnight")) shippingCost = 19.99;
  const total = subtotal + shippingCost;

  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping-cost");
  const totalEl = document.getElementById("cart-summary-total");
  const modalTotal = document.getElementById("modal-total");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shippingCost.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  if (modalTotal) modalTotal.textContent = `KSH ${(total * 130).toFixed(2)}`;
}

export function setupShippingChangeEvents() {
  document.querySelectorAll('input[name="shipping"]').forEach(input => {
    input.addEventListener('change', updateOrderSummary);
  });
}

//Show Modal, Handle Payment Option Clicks
export function setupModalEvents() {
  const modal = document.getElementById('payment-modal');
  const payBtn = document.getElementById('confirm-payment');
  const cancelBtn = document.getElementById('close-modal');
  const paymentOptions = document.querySelectorAll('.payment-option');
  const formArea = document.getElementById("payment-form-area");

  // Handle payment method selection
  paymentOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      const method = btn.dataset.method;
      paymentOptions.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      renderPaymentForm(method, formArea);
    });
  });

  // Handle Confirm Payment button
  if (payBtn && modal && cancelBtn) {
    payBtn.addEventListener('click', () => {
      const selected = document.querySelector(".payment-option.selected")?.dataset.method;
      const inputs = formArea.querySelectorAll("input");

      let isValid = true;
      let errorMessage = "";

      if (selected === "mpesa") {
        const phone = inputs[0]?.value.trim();
        const pin = inputs[1]?.value.trim();

        if (!/^0[17]\d{8}$/.test(phone)) {
          errorMessage = "Enter a valid M-Pesa phone number (e.g. 07XXXXXXXX)";
          isValid = false;
        } else if (!/^\d{4}$/.test(pin)) {
          errorMessage = "Enter a valid 4-digit M-Pesa PIN";
          isValid = false;
        }
      }

      if (selected === "visa") {
        const card = inputs[0]?.value.replace(/\s/g, "");
        const expiry = inputs[1]?.value.trim();
        const cvv = inputs[2]?.value.trim();

        if (!/^\d{16}$/.test(card)) {
          errorMessage = "Card number must be 16 digits";
          isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
          errorMessage = "Expiry must be in MM/YY format";
          isValid = false;
        } else {
          const [month, year] = expiry.split("/").map(Number);
          const currentDate = new Date();
          const expiryDate = new Date(`20${year}`, month);
          if (expiryDate <= currentDate) {
            errorMessage = "Card is expired";
            isValid = false;
          }
        }

        if (!/^\d{3}$/.test(cvv)) {
          errorMessage = "CVV must be 3 digits";
          isValid = false;
        }
      }

      if (selected === "paypal") {
        const email = inputs[0]?.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errorMessage = "Enter a valid PayPal email address";
          isValid = false;
        }
      }

      if (!isValid) {
        alert(errorMessage);
        return;
      }

      //If everything is valid, proceed with payment
      alert("Payment successful! 🎉");
      localStorage.removeItem('techflow-shipping');
      localStorage.removeItem('cart');
      modal.classList.add("hidden");

      setTimeout(() => {
        window.location.href = "products.html";
      }, 1500);
    });

    
    cancelBtn.addEventListener('click', () => {
      modal.classList.add("hidden");
    });
  }
}

//Dynamically Render Payment Form Fields
function renderPaymentForm(method, container) {
  let html = '';
  if (method === 'mpesa') {
    html = `
      <label class="block">
        <span class="block text-sm font-medium text-gray-700">Phone Number (Safaricom)</span>
        <input type="tel" placeholder="e.g. 07XXXXXXXX" class="w-full p-2 rounded bg-gray-100 mt-1" />
      </label>
      <label class="block">
        <span class="block text-sm font-medium text-gray-700">PIN</span>
        <input type="password" placeholder="Your M-Pesa PIN" class="w-full p-2 rounded bg-gray-100 mt-1" />
      </label>
    `;
  } else if (method === 'visa') {
    html = `
      <label class="block">
        <span class="block text-sm font-medium text-gray-700">Card Number</span>
        <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="w-full p-2 rounded bg-gray-100 mt-1" />
      </label>
      <div class="flex gap-4">
        <label class="block w-1/2">
          <span class="block text-sm font-medium text-gray-700">Expiry Date</span>
          <input type="text" placeholder="MM/YY" class="w-full p-2 rounded bg-gray-100 mt-1" />
        </label>
        <label class="block w-1/2">
          <span class="block text-sm font-medium text-gray-700">CVV</span>
          <input type="password" placeholder="123" class="w-full p-2 rounded bg-gray-100 mt-1" />
        </label>
      </div>
    `;
  } else if (method === 'paypal') {
    html = `
      <label class="block">
        <span class="block text-sm font-medium text-gray-700">PayPal Email</span>
        <input type="email" placeholder="your@email.com" class="w-full p-2 rounded bg-gray-100 mt-1" />
      </label>
    `;
  }

  container.innerHTML = html;
}

//Get Shipping Form Data
function getShippingData() {
  return {
    firstName: document.getElementById('firstName')?.value.trim(),
    lastName: document.getElementById('lastName')?.value.trim(),
    email: document.getElementById('email')?.value.trim(),
    phone: document.getElementById('phone')?.value.trim(),
    address: document.getElementById('address')?.value.trim(),
    city: document.getElementById('city')?.value.trim(),
    state: document.getElementById('state')?.value.trim(),
    zip: document.getElementById('zip')?.value.trim(),
    country: document.getElementById('country')?.value,
    shippingMethod: document.querySelector('input[name="shipping"]:checked')?.nextElementSibling?.textContent || "Standard"
  };
}

function validateShipping(data) {
  for (let key in data) {
    if (!data[key]) {
      alert(`Please fill in your ${key.replace(/([A-Z])/g, ' $1')}`);
      return false;
    }
  }
  return true;
}

//Submit Checkout Form
export function handleCheckoutSubmit(e) {
  e.preventDefault();
  const shippingData = getShippingData();
  if (!validateShipping(shippingData)) return;

  localStorage.setItem("techflow-shipping", JSON.stringify(shippingData));
  const modal = document.getElementById("payment-modal");
  if (modal) {
    updateOrderSummary();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}
