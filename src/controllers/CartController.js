const CartManager = require('../helpers/CartManager.js')

// Obtener un carrito desde el servidor
const getProductsCartFromServer = async (req, res) => {
res.send('GET uno /carts')
}

// Añadir o crear un carrito en el servidor
const addCartOnServer = async (req, res) => {
res.send('POST uno /carts')
}

// Añadir o actualizar un producto existente a un carrito existente en el servidor
const addProductCartOnServer = async (req, res) => {
res.send('POST un producto en un carrito /carts')
}

module.exports = {getProductsCartFromServer, addCartOnServer, addProductCartOnServer}