console.log("Dashboard JS loaded");

const baseUrl = "http://localhost:3000";

let profileDropdown = document.getElementById("dropdown");
let logoutBtn = document.getElementById("logoutBtn");
let switchAccount = document.getElementById("switchAccount");
let welcomeUser = document.getElementById("welcomeUser");
let dashboardWelcome = document.getElementById("dashboardWelcome");
let userInfo = document.getElementById("userInfo");

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let customersLink = document.getElementById("customersLink");

if (loggedUser.role !== "admin") {
  customersLink.style.display = "none";
}

if (!loggedUser) {
  window.location.href = "login.html";
} else {
  welcomeUser.textContent = `Welcome, ${loggedUser.fullName}`;
  dashboardWelcome.textContent = `Welcome back, ${loggedUser.fullName} 👋`;
}

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
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
const sideMenu = document.getElementById("sideMenu");
const toggleSidebar = document.getElementById("toggleSidebar");
const dashboardMain = document.querySelector(".dashboard-main");

toggleSidebar.addEventListener("click", () => {
  sideMenu.classList.toggle("collapsed");
  dashboardMain.classList.toggle("expanded");
});
fetch(`${baseUrl}/invoices`)
  .then((response) => response.json())
  .then((invoices) => {
    document.getElementById("totalInvoices").textContent = invoices.length;

    let pending = invoices.filter((invoice) => invoice.status === "Pending");

    document.getElementById("pendingInvoices").textContent = pending.length;

    let paid = invoices.filter((invoice) => invoice.status === "Paid");

    document.getElementById("paidInvoices").textContent = paid.length;
    let overdue = invoices.filter((invoice) => invoice.status === "Overdue");

    document.getElementById("overdueInvoices").textContent = overdue.length;
  });

fetch(`${baseUrl}/customers`)
  .then((response) => response.json())
  .then((customers) => {
    document.getElementById("totalCustomers").textContent = customers.length;
  });

const revenueCtx = document.getElementById("revenueChart").getContext("2d");

fetch(`${baseUrl}/invoices`)
  .then((res) => res.json())
  .then((invoices) => {
    const revenueByMonth = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    invoices.forEach((invoice) => {
      const date = new Date(invoice.date);

      const month = date.toLocaleString("en-US", {
        month: "short",
      });

      revenueByMonth[month] += Number(invoice.amount || 0);
    });

    new Chart(revenueCtx, {
      type: "line",

      data: {
        labels: Object.keys(revenueByMonth),

        datasets: [
          {
            label: "Revenue",

            data: Object.values(revenueByMonth),

            borderColor: "#007bff",

            backgroundColor: "rgba(0,123,255,0.15)",

            fill: true,

            tension: 0.4,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });

const statusCtx = document.getElementById("statusChart").getContext("2d");

fetch("http://localhost:3000/invoices")
  .then((res) => res.json())
  .then((invoices) => {
    const paid = invoices.filter((i) => i.status === "Paid").length;

    const pending = invoices.filter((i) => i.status === "Pending").length;

    const overdue = invoices.filter((i) => i.status === "Overdue").length;

    new Chart(statusCtx, {
      type: "doughnut",

      data: {
        labels: ["Paid", "Pending", "Overdue"],

        datasets: [
          {
            data: [paid, pending, overdue],

            backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
          },
        ],
      },
    });
  });
