async function searchCards() {
    const query = document.getElementById("query").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "<p><em>Loading...</em></p>";

    const url = `http://localhost:5000/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        resultsDiv.innerHTML = "";

        data.results.forEach(card => {
            const item = document.createElement("div");
            item.style.padding = "12px";
            item.style.margin = "10px 0";
            item.style.border = "1px solid #ddd";
            item.style.borderRadius = "8px";
            item.style.background = "white";
            item.style.textAlign = "left";

            item.innerHTML = `
                <h3>${card.title}</h3>
                <p><strong>Price:</strong> $${card.price}</p>
                <p><strong>Deal Score:</strong> ${card.deal_score.toFixed(2)}</p>
                <p><a href="${card.url}" target="_blank">View on eBay</a></p>
            `;

            resultsDiv.appendChild(item);
        });

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = "<p style='color:red;'>Error loading results.</p>";
    }
}
