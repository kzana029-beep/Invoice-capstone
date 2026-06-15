const baseUrl = "http://localhost:3000";

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  window.location.href = "login.html";
}

if (loggedUser.role !== "admin") {
  window.location.href = "dashboard.html";
}
const welcomeUser = document.getElementById("welcomeUser");

if (loggedUser) {
  welcomeUser.textContent = loggedUser.name || loggedUser.fullName;
}

const customersTableBody = document.getElementById("customersTableBody");
const searchInput = document.getElementById("searchCustomer");

let allCustomers = [];

async function loadCustomers() {
  try {
    const response = await fetch(`${baseUrl}/customers`);
    const customers = await response.json();

    allCustomers = customers;

    document.getElementById("totalCustomers").textContent = customers.length;

    document.getElementById("activeCustomers").textContent = customers.length;

    renderCustomers(customers);
  } catch (error) {
    console.log(error);
  }
}

function renderCustomers(customers) {
  customersTableBody.innerHTML = "";

  if (customers.length === 0) {
    customersTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">
          No customers found.
        </td>
      </tr>
    `;
    return;
  }

  customers.forEach((customer) => {
    customersTableBody.innerHTML += `
      <tr>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>${customer.company}</td>
        <td>

          <button
            class="view-btn"
            onclick="viewCustomer(${customer.id})">
            View
          </button>

          <button
            class="edit-btn"
            onclick="editCustomer(${customer.id})">
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteCustomer(${customer.id})">
            Delete
          </button>

        </td>
      </tr>
    `;
  });
}

loadCustomers();

function viewCustomer(id) {
  const customer = allCustomers.find((customer) => customer.id === id);

  alert(
    `Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Company: ${customer.company}`,
  );
}
async function deleteCustomer(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this customer?",
  );

  if (!confirmDelete) return;

  try {
    await fetch(`${baseUrl}/customers/${id}`, {
      method: "DELETE",
    });

    loadCustomers();
  } catch (error) {
    console.log(error);
  }
}
const sideMenu = document.getElementById("sideMenu");
const toggleSidebar = document.getElementById("toggleSidebar");
const customersMain = document.querySelector(".customers-main");

toggleSidebar.addEventListener("click", () => {
  sideMenu.classList.toggle("collapsed");
  customersMain.classList.toggle("expanded");
});
