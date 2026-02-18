const btn = document.getElementById("compareBtn");
const productNameEl = document.getElementById("productName");
const cheapestEl = document.getElementById("cheapestPlatform");
const ctx = document.getElementById("priceChart");

let chart;

btn.addEventListener("click", () => {
    const link = document.getElementById("productLink").value.trim();

    if (!link) {
        alert("Please enter a product link");
        return;
    }

    // Extract product name from URL
    const productName = extractProductName(link);
    productNameEl.innerText = "Detected Product: " + productName;

    // Simulated API / fallback prices
    const prices = {
        Amazon: randomPrice(),
        Flipkart: randomPrice(),
        Myntra: randomPrice(),
        Ajio: randomPrice(),
        Meesho: randomPrice()
    };

    const cheapest = findCheapest(prices);
    cheapestEl.innerText = "Cheapest Platform: " + cheapest;

    drawChart(prices);
});

// Helpers
function extractProductName(url) {
    try {
        const part = url.split("/").pop();
        return part.replace(/[-_]/g, " ").split("?")[0];
    } catch {
        return "Unknown Product";
    }
}

function randomPrice() {
    return Math.floor(Math.random() * 10000) + 40000;
}

function findCheapest(prices) {
    return Object.keys(prices).reduce((a, b) =>
        prices[a] < prices[b] ? a : b
    );
}

function drawChart(prices) {
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(prices),
            datasets: [{
                label: "Price Comparison (₹)",
                data: Object.values(prices)
            }]
        }
    });
}
