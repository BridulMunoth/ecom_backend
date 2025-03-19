const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this path is correct

const cartrouter = express.Router();

// Route to add items to the cart
cartrouter.post("/add", authMiddleware, addToCart);

// Route to get cart details
cartrouter.get("/", authMiddleware, async (req, res) => {
    try {
        const cartDetails = await getCart(req, res); // Implement this in cartController.js
        res.status(200).json(cartDetails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart details", error: error.message });
    }
});

// Route to remove items from the cart
cartrouter.post("/remove", authMiddleware, async (req, res) => {
    try {
        const result = await removeFromCart(req, res); // Implement this in cartController.js
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item from cart", error: error.message });
    }
});

module.exports = cartrouter;
