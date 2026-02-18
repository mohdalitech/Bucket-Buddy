const btn = document.getElementById("compareBtn");
const linkInput = document.getElementById("productLink");
const statusEl = document.getElementById("status");
const productNameEl = document.getElementById("productName");
const cheapestEl = document.getElementById("cheapestPlatform");
const resultCard = document.getElementById("resultCard");
const chartCanvas = document.getElementById("priceChart");

let chart;

/* ---------------- MAIN FLOW ---------------- */

btn.addEventListener("click", async () => {
    const link = linkInput.value.trim();

    if (!isValidLink(link)) {
        statusEl.innerText = "Please enter a valid product link.";
        return;
    }

    statusEl.innerText = "Analyzing product and fetching prices...";
    resultCard.classList.add("hidden");

    const productName = extractProductName(link);
    const prices = await fetchPrices(productName);

    const sortedPrices = sortPrices(prices);
    const cheapest = Object.keys(sortedPrices)[0];

    productNameEl.innerText = "Detected Product: " + productName;
    cheapestEl.innerText = "Cheapest Platform: " + cheapest;

    drawChart(sortedPrices, cheapest);

    statusEl.innerText = "Comparison completed successfully.";
    resultCard.classList.remove("hidden");
});

/* ---------------- FUNCTIONS ---------------- */

// Basic URL validation
function isValidLink(link) {
    return link.startsWith("http://") || link.startsWith("https://");
}

// Extract readable product name from URL
function extractProductName(url) {
    try {
        let part = url.split("/").pop().split("?")[0];
        return part.replace(/[-_]/g, " ");
    } catch {
        return "Unknown Product";
    }
}

// Simulated API layer (acts like backend)
async function fetchPrices(product) {
    await delay(800); // simulate network delay

    return {
        Amazon: generatePrice(),
        Flipkart: generatePrice(),
        Myntra: generatePrice(),
        Ajio: generatePrice(),
        Meesho: generatePrice()
    };
}

// Price generator
function generatePrice() {
    return Math.floor(Math.random() * 7000) + 43000;
}

// Sort prices ascending
function sortPrices(prices) {
    return Object.fromEntries(
        Object.entries(prices).sort((a, b) => a[1] - b[1])
    );
}

// Draw bar chart
function drawChart(prices, cheapest) {
    if (chart) chart.destroy();

    chart = new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: Object.keys(prices),
            datasets: [{
                label: "Price (₹)",
                data: Object.values(prices),
                backgroundColor: Object.keys(prices).map(p =>
                    p === cheapest ? "#2ecc71" : "#4a6cff"
                )
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Utility delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
