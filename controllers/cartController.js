const Cart = require('../models/cart');

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, name, price } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "productId is missing" });
        }

        // Find cart for the user
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find((item) =>
            item.productId && item.productId.toString() === productId.toString()
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.items.push({ productId, name, price, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ cart, message: "Item added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get cart items
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.status(200).json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "productId is missing" });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId.toString()
        );

        await cart.save();
        res.status(200).json({ cart, message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
