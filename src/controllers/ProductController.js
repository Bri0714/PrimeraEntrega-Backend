
const ProductManager = require('../helpers/ProductManager.js')
let info = {}

// Obtener todos o N productos desde el servidor /api/products[?:limit=N]
const getProductsFromServer = async (req, res) => {
    let arrayQuery = Object.keys(req.query)
    if (!(arrayQuery.length > 0)) {
        const products = new ProductManager()
        const listProducts = await products.getAllProducts()

        if (Array.isArray(listProducts)) {
            const length = listProducts.length

            if (length > 0) {
                info = {
                    status: "éxito",
                    data: listProducts,
                    length: length,
                    message: "productos devueltos con éxito"
                }
                return res.status(400).json(info)
            }

            info = {
                status: "error",
                data: [],
                length: 0,
                message: "no hay productos"
            }
            return res.status(400).json(info)
        }
    }

    if (arrayQuery.length > 0) {
        if (!arrayQuery.includes('limit') || arrayQuery.length > 1) {
            info = {
                status: "error",
                message: "consulta con error de sintaxis",
                data: [],
                length: 0
            }
            return res.status(400).json(info)
        }

        let { limit } = req.query
        limit = parseInt(limit)

        if (!isNaN(limit) && limit > 0) {
            const products = new ProductManager()

            const listProducts = await products.getProducts(limit)

            if (Array.isArray(listProducts)) {
                const length = listProducts.length

                if (length > 0) {
                    info = {
                        status: length === limit ? "éxito" : "parcial",
                        data: listProducts,
                        length: length,
                        message: length === limit ? "productos devueltos con éxito" : "No estaban disponibles todos los productos solicitados."
                    }
                    return res.status(400).json(info)
                }

                info = {
                    status: "error",
                    data: [],
                    length: 0,
                    message: "no hay productos"
                }
                return res.status(400).json(info)
            }

            info = {
                status: "error",
                data: [],
                length: 0,
                message: "el argumento de límite no es un entero positivo",

            }
            return res.status(200).json(info)
        }
    }

}

// Obtener un producto desde el servidor /api/products/:pid
const getProductFromServer = async (req, res) => {
    res.send('GET uno de /productos')
}

// Agregar un producto al servidor
const addProductOnServer = async (req, res) => {
    res.send('POST uno de /productos')
}

// Actualizar un producto en el servidor
const updProductOnServer = async (req, res) => {
    res.send('PUT uno de /productos')
}

// Eliminar un producto del servidor
const delProductOnServer = async (req, res) => {
    res.send('PUT uno de /productos')
}

module.exports = { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer }