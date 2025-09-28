document.addEventListener('DOMContentLoaded', () => {

    // --- Currency Converter Logic ---
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amountInput = document.getElementById("amount");
    const convertBtn = document.getElementById("convertBtn");
    const resultDiv = document.querySelector(".result");
    const marquee = document.getElementById("rate-marquee");
    const loader = document.getElementById("loader"); // Get the loader element

    convertBtn.addEventListener("click", () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        if (from === to) {
            resultDiv.innerText = "Please select different currencies.";
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            resultDiv.innerText = "Please enter a valid amount.";
            return;
        }

        // --- Start Loading Indicator ---
        resultDiv.innerText = ""; // Clear previous result
        loader.style.display = "block"; // Show the spinner
        convertBtn.disabled = true; // Disable button to prevent multiple clicks
        // --- End Loading Indicator ---

        const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const converted = data.rates[to];
                resultDiv.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
            })
            .catch(() => {
                resultDiv.innerText = "Live conversion failed. Try again.";
            })
            .finally(() => {
                // --- Hide Loading Indicator ---
                // This block runs whether the fetch succeeded or failed
                loader.style.display = "none"; // Hide the spinner
                convertBtn.disabled = false; // Re-enable the button
                // --- End Hide Loading Indicator ---
            });
    });

    function updateMarqueeRates() {
        fetch("https://api.frankfurter.app/latest?from=INR")
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                const currenciesToShow = ["USD", "EUR", "GBP", "AUD", "JPY", "CAD"];
                let text = "LIVE RATES: ";
                currenciesToShow.forEach(currency => {
                    if (rates[currency]) {
                        const value = (1 / rates[currency]).toFixed(2);
                        text += `1 ${currency} = ${value} INR || `;
                    }
                });
                marquee.textContent = text.slice(0, -4);
            })
            .catch(() => {
                marquee.textContent = "Failed to fetch live exchange rates.";
            });
    }
    
    updateMarqueeRates(); // Call it once on load

    // --- Falling Stars Logic ---
    const nightSky = document.getElementById('night-sky');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        nightSky.appendChild(star);
    }
});