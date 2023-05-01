const cartsModel = require('../models/carts.model.js');
const productsModel = require('../models/products.model.js');

const cartsController = {
    createCart: (req, res) => {
        const cart = cartsModel.createCart();
        res.json(cart);
    },

    getCartProducts: (req, res) => {
        const { cid } = req.params;
        const cart = cartsModel.getCartById(cid);
        if (cart) {
            const products = [];
            cart.products.forEach((product) => {
                const { id, quantity } = product;
                const fullProduct = productsModel.getProductById(id);
                if (fullProduct) {
                    products.push({ ...fullProduct, quantity });
                }
            });
            res.json(products);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    },

    addProductToCart: (req, res) => {
        const { cid, pid } = req.params;
        const quantity = parseInt(req.body.quantity);
        const cart = cartsModel.getCartById(cid);
        const product = productsModel.getProductById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const existingProduct = cart.products.find((p) => p.id === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: pid, quantity });
        }
        cartsModel.updateCart(cid, cart);
        res.json(cart);
    },
};

module.exports = cartsController;