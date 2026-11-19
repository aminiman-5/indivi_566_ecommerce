
// Check login status
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Monthly sales chart
const salesChart = document.getElementById("monthlySalesChart");

new Chart(salesChart, {
    type: "bar",
    data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
            label: "Sales (RM)",
            data: [3200, 4100, 3500, 5200, 3800, 4780],
            backgroundColor: "#9b7bc4",
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return "RM " + value;
                    }
                }
            }
        }
    }
});

// Order status chart
const statusChart = document.getElementById("orderStatusChart");

new Chart(statusChart, {
    type: "doughnut",
    data: {
        labels: ["Completed", "Pending", "Processing", "Cancelled"],
        datasets: [{
            data: [720, 180, 260, 88],
            backgroundColor: [
                "#8b6bb5",
                "#c7b3df",
                "#a58acb",
                "#e2d8ef"
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});

// Logout
document.getElementById("logoutButton").addEventListener("click", function() {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});
