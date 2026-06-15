# Stellar Converter 🌟

A space-themed currency converter with **custom CSS starfield background**.

## Features

- Real-time currency conversion (USD, INR, EUR, GBP, JPY, AUD)
- Live exchange rate ticker
- Beautiful cosmic UI with purple/blue gradients
- **Custom animated starfield background** (pure CSS)

## Custom Starfield Background (CSS)

The starfield is created with **CSS animations** and JavaScript:

```css
/* Glowing star with trail effect */
.star {
    width: 2px;
    height: 2px;
    background-color: #FFF;
    border-radius: 50%;
    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
    animation: fall 2-5s linear infinite;
}

/* Trailing line behind falling stars */
.star::after {
    content: '';
    width: 150px;
    height: 1px;
    background: linear-gradient(to right, #FFF, rgba(255, 255, 255, 0));
    transform: rotate(45deg);
}

/* Falling animation */
@keyframes fall {
    0% { transform: translate(0, 0); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translate(80vh, 80vh); opacity: 0; }
}
