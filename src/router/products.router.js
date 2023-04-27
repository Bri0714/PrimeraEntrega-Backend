const { Router } = require('express')
const { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('../controllers/ProductController.js')

const router = Router()

// GET /api/products[?:limit=N]
//Este método recupera una lista de productos desde el servidor. Opcionalmente, se puede especificar el número máximo de productos que se deben devolver.
router.get('/', getProductsFromServer )
// GET /api/products/:pid
//Este método recupera un producto específico del servidor, utilizando el ID del producto (pid) como parámetro. 
router.get('/:pid', getProductFromServer )
// POST /api/products
//Este método agrega un nuevo producto al servidor.
router.post('/', addProductOnServer )
// PUT /api/products/:pid
//Este método actualiza un producto existente en el servidor, utilizando el ID del producto 
router.put('/:pid', updProductOnServer ) 
// DELETE /api/products/:pid
//Este método elimina un producto existente del servidor, utilizando el ID del producto (pid) como parámetro.
router.delete('/:pid', delProductOnServer)

module.exports = router