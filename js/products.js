
// Check login status
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}


// Sample Product Data
let products = JSON.parse(localStorage.getItem("products")) || [

    {
        id: "P001",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 89.90,
        stock: 25
    },

    {
        id: "P002",
        name: "Smart Watch",
        category: "Accessories",
        price: 129.00,
        stock: 8
    },

    {
        id: "P003",
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 39.90,
        stock: 40
    },

    {
        id: "P004",
        name: "Travel Backpack",
        category: "Fashion",
        price: 75.00,
        stock: 5
    },

    {
        id: "P005",
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 99.00,
        stock: 18
    },

    {
        id: "P006",
        name: "Table Lamp",
        category: "Home",
        price: 55.00,
        stock: 0
    }

];


// Save products in browser storage
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}


// Display Product List
function displayProducts() {

    let tableBody = document.getElementById("productTableBody");

    let searchValue = document.getElementById("searchProduct").value.toLowerCase();

    let selectedCategory = document.getElementById("categoryFilter").value;

    tableBody.innerHTML = "";

    // Filter products
    let filteredProducts = products.filter(function(product) {

        let matchSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.id.toLowerCase().includes(searchValue);

        let matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchSearch && matchCategory;

    });


    // Show product data
    filteredProducts.forEach(function(product) {

        let status = "";
        let statusClass = "";

        if (product.stock === 0) {

            status = "Out of Stock";
            statusClass = "out-stock";

        } else if (product.stock <= 10) {

            status = "Low Stock";
            statusClass = "low-stock";

        } else {

            status = "In Stock";
            statusClass = "in-stock";

        }



        let productIcon = "bi-box-seam";

if (product.category === "Electronics") {
    productIcon = "bi-headphones";
} else if (product.category === "Fashion") {
    productIcon = "bi-bag";
} else if (product.category === "Accessories") {
    productIcon = "bi-watch";
} else if (product.category === "Home") {
    productIcon = "bi-house";
}
        let row = `
            <tr>

                <td>
                    <span class="product-id">${product.id}</span>
                </td>

                <td>
    <div class="product-name-cell">

        <div class="product-image">
            <i class="bi ${productIcon}"></i>
        </div>

        <span class="product-name">${product.name}</span>

    </div>
</td>

                <td>${product.category}</td>

                <td>
                    <span class="product-price">
                        RM ${product.price.toFixed(2)}
                    </span>
                </td>

                <td>
                    <span class="stock-quantity">
                        ${product.stock}
                    </span>
                </td>

                <td>
                    <span class="product-status ${statusClass}">
                        ${status}
                    </span>
                </td>

                <td>
                    <button class="delete-product"
                        data-id="${product.id}"
                        title="Delete Product">

                        <i class="bi bi-trash"></i>

                    </button>
                </td>

            </tr>
        `;

        tableBody.innerHTML += row;

    });


    // Update product summary
    document.getElementById("totalProducts").textContent =
        products.length;

    document.getElementById("inStockProducts").textContent =
        products.filter(function(product) {
            return product.stock > 10;
        }).length;

    document.getElementById("lowStockProducts").textContent =
        products.filter(function(product) {
            return product.stock > 0 && product.stock <= 10;
        }).length;


    // Show message when no product is found
    document.getElementById("emptyProductMessage").style.display =
        filteredProducts.length === 0 ? "block" : "none";

}


// Search Product
document.getElementById("searchProduct").addEventListener("input", function() {
    displayProducts();
});


// Filter Product Category
document.getElementById("categoryFilter").addEventListener("change", function() {
    displayProducts();
});


// Add New Product
document.getElementById("addProductForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let productName = document.getElementById("productName").value.trim();

    let category = document.getElementById("productCategory").value;

    let price = parseFloat(document.getElementById("productPrice").value);

    let stock = parseInt(document.getElementById("productStock").value);


    // Create new product
    let newProduct = {

        id: "P" + String(Date.now()).slice(-6),

        name: productName,

        category: category,

        price: price,

        stock: stock

    };


    // Add product to list
    products.push(newProduct);

    saveProducts();

    displayProducts();


    // Clear form
    document.getElementById("addProductForm").reset();


    // Close modal
    let modalElement = document.getElementById("addProductModal");

    let modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();

    alert("New product added successfully!");

});


// Delete Product
document.getElementById("productTableBody").addEventListener("click", function(event) {

    let deleteButton = event.target.closest(".delete-product");

    if (deleteButton) {

        let productId = deleteButton.getAttribute("data-id");

        let confirmDelete = confirm("Are you sure you want to delete this product?");

        if (confirmDelete) {

            products = products.filter(function(product) {
                return product.id !== productId;
            });

            saveProducts();

            displayProducts();

        }

    }

});


// Logout Function
document.getElementById("logoutButton").addEventListener("click", function() {

    sessionStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});


// Display products when page loads
saveProducts();
displayProducts();
