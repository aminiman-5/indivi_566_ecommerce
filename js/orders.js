
// Check login status
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}


// Sample Order Data
let orders = JSON.parse(localStorage.getItem("orders")) || [

    {
        id: "ORD001",
        customer: "Ahmad Hakimi",
        date: "2026-11-10",
        product: "Wireless Headphones",
        amount: 250.00,
        payment: "Paid",
        status: "Completed"
    },

    {
        id: "ORD002",
        customer: "Siti Aminah",
        date: "2026-11-11",
        product: "Smart Watch",
        amount: 180.00,
        payment: "Paid",
        status: "Pending"
    },

    {
        id: "ORD003",
        customer: "Daniel Tan",
        date: "2026-11-12",
        product: "Travel Backpack",
        amount: 320.00,
        payment: "Paid",
        status: "Completed"
    },

    {
        id: "ORD004",
        customer: "Aisyah Rahman",
        date: "2026-11-13",
        product: "Casual T-Shirt",
        amount: 150.00,
        payment: "Unpaid",
        status: "Cancelled"
    },

    {
        id: "ORD005",
        customer: "Muhammad Amir",
        date: "2026-11-14",
        product: "Bluetooth Speaker",
        amount: 99.00,
        payment: "Paid",
        status: "Processing"
    },

    {
        id: "ORD006",
        customer: "Nurul Izzah",
        date: "2026-11-15",
        product: "Table Lamp",
        amount: 55.00,
        payment: "Unpaid",
        status: "Pending"
    }

];


// Save Orders
function saveOrders() {

    localStorage.setItem("orders", JSON.stringify(orders));

}


// Display Orders
function displayOrders() {

    let tableBody = document.getElementById("orderTableBody");

    let searchValue = document.getElementById("searchOrder").value.toLowerCase();

    let selectedStatus = document.getElementById("orderStatusFilter").value;

    tableBody.innerHTML = "";


    // Filter Orders
    let filteredOrders = orders.filter(function(order) {

        let matchSearch =
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue);

        let matchStatus =
            selectedStatus === "All" ||
            order.status === selectedStatus;

        return matchSearch && matchStatus;

    });


    // Display Data
    filteredOrders.forEach(function(order) {

        let paymentClass = order.payment === "Paid" ? "paid" : "unpaid";

        let row = `
            <tr>

                <td>
                    <span class="order-id">${order.id}</span>
                </td>

                <td>
                    <span class="order-customer">${order.customer}</span>
                </td>

                <td>${order.date}</td>

                <td>${order.product}</td>

                <td>
                    <strong>RM ${order.amount.toFixed(2)}</strong>
                </td>

                <td>
                    <span class="payment-status ${paymentClass}">
                        ${order.payment}
                    </span>
                </td>

                <td>
                    <select class="order-status-select"
                        data-id="${order.id}">

                        <option value="Pending"
                            ${order.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Processing"
                            ${order.status === "Processing" ? "selected" : ""}>
                            Processing
                        </option>

                        <option value="Completed"
                            ${order.status === "Completed" ? "selected" : ""}>
                            Completed
                        </option>

                        <option value="Cancelled"
                            ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>

                    </select>
                </td>

            </tr>
        `;

        tableBody.innerHTML += row;

    });


    // Update Summary
    document.getElementById("totalOrders").textContent = orders.length;

    document.getElementById("completedOrders").textContent =
        orders.filter(function(order) {
            return order.status === "Completed";
        }).length;

    document.getElementById("pendingOrders").textContent =
        orders.filter(function(order) {
            return order.status === "Pending";
        }).length;


    // Empty Message
    document.getElementById("emptyOrderMessage").style.display =
        filteredOrders.length === 0 ? "block" : "none";

}


// Search Orders
document.getElementById("searchOrder").addEventListener("input", function() {

    displayOrders();

});


// Filter Orders
document.getElementById("orderStatusFilter").addEventListener("change", function() {

    displayOrders();

});


// Update Order Status
document.getElementById("orderTableBody").addEventListener("change", function(event) {

    if (event.target.classList.contains("order-status-select")) {

        let orderId = event.target.getAttribute("data-id");

        let newStatus = event.target.value;

        let selectedOrder = orders.find(function(order) {
            return order.id === orderId;
        });

        if (selectedOrder) {

            selectedOrder.status = newStatus;

            saveOrders();

            displayOrders();

            alert("Order status updated successfully!");

        }

    }

});


// Logout Function
document.getElementById("logoutButton").addEventListener("click", function() {

    sessionStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});


// Load Orders
saveOrders();
displayOrders();
