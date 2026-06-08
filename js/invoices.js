const baseUrl = "http://localhost:3000";

let invoices = [];

let burgerMenu = document.getElementById("burgerMenu");
let sideMenu = document.getElementById("sideMenu");
let overlay = document.getElementById("overlay");
let userInfo = document.getElementById("userInfo");
let profileDropdown = document.getElementById("dropdown");
let logoutBtn = document.getElementById("logoutBtn");
let switchAccount = document.getElementById("switchAccount");
let welcomeUser = document.getElementById("welcomeUser");

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  window.location.href = "login.html";
} else {
  welcomeUser.textContent = `Welcome, ${loggedUser.fullName}`;
}
burgerMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  overlay.classList.toggle("active");
});
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("active");
});

userInfo.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
});

logoutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

switchAccount.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

const invoiceTableBody = document.getElementById("invoiceTableBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

const loadInvoices = () => {
  fetch(`${baseUrl}/invoices`)
    .then((res) => res.json())
    .then((data) => {
      invoices = data;
      showInvoices(invoices);
      updateStats(invoices);
    });
};

const showInvoices = (list) => {
  invoiceTableBody.innerHTML = "";

  list.forEach((invoice) => {
    invoiceTableBody.innerHTML += `
      <tr>
        <td>${invoice.invoiceId}</td>
        <td>${invoice.client}</td>
        <td>${invoice.date}</td>
        <td>${invoice.dueDate}</td>
        <td>$${invoice.amount}</td>
        <td><span class="status ${invoice.status.toLowerCase()}">${invoice.status}</span></td>
        <td>
          <a href="invoice-details.html?id=${invoice.id}">View</a>
          <a href="edit-invoice.html?id=${invoice.id}">Edit</a>
          <button onclick="deleteInvoice(${invoice.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};

const updateStats = (list) => {
  const total = list.length;
  const paid = list.filter((i) => i.status === "Paid").length;
  const pending = list.filter((i) => i.status === "Pending").length;
  const overdue = list.filter((i) => i.status === "Overdue").length;

  document.getElementById("totalInvoices").textContent = total;
  document.getElementById("paidInvoices").textContent = paid;
  document.getElementById("pendingInvoices").textContent = pending;
  document.getElementById("overdueInvoices").textContent = overdue;

  document.getElementById("paidPercent").textContent =
    `${total ? Math.round((paid / total) * 100) : 0}% of total`;

  document.getElementById("pendingPercent").textContent =
    `${total ? Math.round((pending / total) * 100) : 0}% of total`;

  document.getElementById("overduePercent").textContent =
    `${total ? Math.round((overdue / total) * 100) : 0}% of total`;
};

const filterInvoices = () => {
  const searchValue = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;

  let filtered = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchValue) ||
      invoice.invoiceId.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusValue === "All" || invoice.status === statusValue;

    return matchesSearch && matchesStatus;
  });

  showInvoices(filtered);
};

const deleteInvoice = (id) => {
  fetch(`${baseUrl}/invoices/${id}`, {
    method: "DELETE",
  }).then(() => loadInvoices());
};

searchInput.addEventListener("input", filterInvoices);
statusFilter.addEventListener("change", filterInvoices);

loadInvoices();
