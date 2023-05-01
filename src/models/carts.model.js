const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../data/carrito.json');

const cartsModel = {
    getCarts: () => {
        const cartData = fs.readFileSync(cartFilePath, 'utf-8');
        return JSON.parse(cartData);
    },

    getCartById: (id) => {
        const carts = cartsModel.getCarts();
        return carts.find((cart) => cart.id === id);
    },

    addCart: (cart) => {
        const carts = cartsModel.getCarts();
        const newCart = {
            id: Date.now().toString(),
            products: [],
            ...cart,
        };
        carts.push(newCart);
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));
        return newCart;
    },

    addProductToCart: (cartId, productId) => {
        const carts = cartsModel.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex === -1) return null;

        const existingProductIndex = carts[cartIndex].products.findIndex(
            (product) => product.id === productId
        );

        if (existingProductIndex === -1) {
            carts[cartIndex].products.push({ id: productId, quantity: 1 });
        } else {
            carts[cartIndex].products[existingProductIndex].quantity += 1;
        }

        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));

        return carts[cartIndex];
    },
};

module.exports = cartsModel;