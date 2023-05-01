const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller.js');

// Crear un nuevo carrito
router.post('/', cartsController.createCart);

// Agregar un producto al carrito
router.post('/:cid/product/:pid', cartsController.addProductToCart);

// Listar los productos de un carrito
router.get('/:cid/products', cartsController.getCartProducts);

module.exports = router;