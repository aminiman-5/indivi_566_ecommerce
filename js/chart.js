
// Check user login status
if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}


// Monthly Sales Chart
const chartCanvas = document.getElementById("salesChart");

if (chartCanvas) {

    new Chart(chartCanvas, {

        type: "line",

        data: {
            labels: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],

            datasets: [{
                label: "Monthly Sales (RM)",

                data: [
                    12000, 15000, 13500, 18000,
                    16500, 21000, 19500, 23000,
                    22000, 26000, 24500, 28500
                ],

                borderColor: "#7839bd",
                backgroundColor: "rgba(120, 57, 189, 0.12)",

                borderWidth: 3,
                fill: true,
                tension: 0.4,

                pointBackgroundColor: "#7839bd",
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    ticks: {
                        callback: function(value) {
                            return "RM" + value.toLocaleString();
                        }
                    },

                    grid: {
                        color: "#f0edf4"
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }

    });

}


// Logout Function
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

        sessionStorage.removeItem("isLoggedIn");

        window.location.href = "login.html";

    });

}
