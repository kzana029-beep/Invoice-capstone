const baseUrl = "http://localhost:3000";

const userInfo = document.getElementById("userInfo");
const dropdown = document.getElementById("dropdown");
const welcomeUser = document.getElementById("welcomeUser");

let currentUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

welcomeUser.textContent = `Welcome, ${currentUser.fullName || currentUser.username || "User"} `;

userInfo.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

const tbody = document.querySelector(".invoice-items tbody");
const addItemBtn = document.querySelector(".add-item");
const totalAmountText = document.querySelector(".items-footer strong span");

let itemCounter = 1;

const calculateTotals = () => {
  let grandTotal = 0;

  document.querySelectorAll(".invoice-items tbody tr").forEach((row) => {
    const qty = Number(row.querySelector(".qty").value) || 0;

    const price = Number(row.querySelector(".price").value) || 0;

    const total = qty * price;

    row.querySelector(".row-total").textContent = `$${total.toFixed(2)}`;

    grandTotal += total;
  });

  totalAmountText.textContent = `$${grandTotal.toFixed(2)}`;

  document.getElementById("amount").value = grandTotal.toFixed(2);
};

addItemBtn.addEventListener("click", () => {
  itemCounter++;

  const newRow = document.createElement("tr");

  newRow.innerHTML = `
      <td>${itemCounter}</td>

      <td>
        <input type="text" class="service">
      </td>

      <td>
        <input type="number" value="1" class="qty">
      </td>

      <td>
        <input type="number" value="0" class="price">
      </td>

      <td class="row-total">$0.00</td>

      <td>
        <button
          type="button"
          class="delete-item">
          Delete
        </button>
      </td>
  `;

  tbody.appendChild(newRow);

  addEvents();
});

const addEvents = () => {
  document.querySelectorAll(".qty").forEach((input) => {
    input.addEventListener("input", calculateTotals);
  });

  document.querySelectorAll(".price").forEach((input) => {
    input.addEventListener("input", calculateTotals);
  });

  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      btn.closest("tr").remove();
      calculateTotals();
    };
  });
};

addEvents();

/* ==========================
   SAVE INVOICE
========================== */

const invoiceForm = document.getElementById("invoiceForm");

invoiceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const items = [];

  document.querySelectorAll(".invoice-items tbody tr").forEach((row) => {
    items.push({
      service: row.querySelector(".service")?.value || "",

      quantity: Number(row.querySelector(".qty")?.value) || 0,

      price: Number(row.querySelector(".price")?.value) || 0,
    });
  });

  const invoice = {
    invoiceId: document.getElementById("invoiceId").value,

    date: document.getElementById("date").value,

    client: document.getElementById("client").value,

    dueDate: document.getElementById("dueDate").value,

    email: document.getElementById("email").value,

    amount: Number(document.getElementById("amount").value),

    status: document.getElementById("status").value,

    notes: document.getElementById("notes").value,

    items,
  };

  fetch(`${baseUrl}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Invoice created successfully");
      window.location.href = "invoices.html";
    });
});
const sideMenu = document.getElementById("sideMenu");
const toggleSidebar = document.getElementById("toggleSidebar");
const createMain = document.querySelector(".create-main");

toggleSidebar.addEventListener("click", () => {
  sideMenu.classList.toggle("collapsed");
  createMain.classList.toggle("expanded");
});
