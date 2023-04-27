const { Router } = require('express')
const {getProductsCartFromServer, addCartOnServer, addProductCartOnServer} = require('../controllers/CartController.js')

const router = Router()

/*GET /api/carts/:cid - Esta ruta permite obtener los productos del carrito de compras para un cliente específico identificado por el parámetro :cid.*/
router.get('/:cid', getProductsCartFromServer)

/*POST /api/carts/ - Esta ruta permite agregar un nuevo carrito de compras en el servidor.*/
router.post('/', addCartOnServer)

//POST /api/carts/:cid/product/:pid - Esta ruta permite agregar un producto al carrito de compras de un cliente específico identificado por el parámetro :cid y el producto por el parámetro :pid.
router.post('/:cid/product/:pid', addProductCartOnServer)

module.exports = router