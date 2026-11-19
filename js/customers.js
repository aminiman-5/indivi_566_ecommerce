
// Check login status
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Sample customer data
let customers = JSON.parse(localStorage.getItem("customerList")) || [
    {
        id: "CUS001",
        name: "Adam Lee",
        email: "adam@gmail.com",
        phone: "0123456789",
        date: "2026-01-10",
        orders: 5
    },
    {
        id: "CUS002",
        name: "Sarah Tan",
        email: "sarah@gmail.com",
        phone: "0134567890",
        date: "2026-01-15",
        orders: 8
    },
    {
        id: "CUS003",
        name: "Daniel Wong",
        email: "daniel@gmail.com",
        phone: "0145678901",
        date: "2026-02-02",
        orders: 3
    },
    {
        id: "CUS004",
        name: "Aisha Rahman",
        email: "aisha@gmail.com",
        phone: "0167890123",
        date: "2026-02-12",
        orders: 6
    },
    {
        id: "CUS005",
        name: "Jason Lim",
        email: "jason@gmail.com",
        phone: "0178901234",
        date: "2026-03-05",
        orders: 4
    }
];

// Save customer data
function saveCustomers() {
    localStorage.setItem("customerList", JSON.stringify(customers));
}

// Display customers in table
function displayCustomers(data = customers) {
    let table = document.getElementById("customerTable");
    table.innerHTML = "";

    data.forEach(function(customer) {
        table.innerHTML += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.date}</td>
                <td>${customer.orders}</td>
                <td>
                    <button class="customer-delete" onclick="deleteCustomer('${customer.id}')">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateCustomerSummary();
}

// Update summary cards
function updateCustomerSummary() {
    document.getElementById("totalCustomers").textContent = customers.length;
    document.getElementById("activeCustomers").textContent = customers.length;

    let totalOrders = 0;

    customers.forEach(function(customer) {
        totalOrders += Number(customer.orders);
    });

    document.getElementById("customerOrders").textContent = totalOrders;
}

// Add new customer
document.getElementById("customerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let newCustomer = {
        id: "CUS" + String(Date.now()).slice(-6),
        name: document.getElementById("customerName").value,
        email: document.getElementById("customerEmail").value,
        phone: document.getElementById("customerPhone").value,
        date: document.getElementById("registrationDate").value,
        orders: 0
    };

    customers.push(newCustomer);
    saveCustomers();
    displayCustomers();

    document.getElementById("customerForm").reset();

    let modal = bootstrap.Modal.getInstance(document.getElementById("addCustomerModal"));
    modal.hide();
});

// Delete customer
function deleteCustomer(customerId) {
    if (confirm("Are you sure you want to delete this customer?")) {
        customers = customers.filter(function(customer) {
            return customer.id !== customerId;
        });

        saveCustomers();
        displayCustomers();
    }
}

// Search customers
document.getElementById("customerSearch").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();

    let filteredCustomers = customers.filter(function(customer) {
        return customer.name.toLowerCase().includes(searchValue) ||
               customer.email.toLowerCase().includes(searchValue);
    });

    displayCustomers(filteredCustomers);
});

// Logout
document.getElementById("logoutButton").addEventListener("click", function() {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});

// Initial display
saveCustomers();
displayCustomers();
