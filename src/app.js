const express = require('express')
const productRouter = require('../src/router/products.router.js')
const cartRouter = require('../src/router/carts.router.js')
const server = express()

const port = 8080

server.listen(port, () => console.log(` el servidor se levanto en http://localhost:${port}`))

server.use(express.json())

const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)