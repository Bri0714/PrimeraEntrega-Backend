const fs = require('fs')
const ListCarts = require('./ListCarts.js')

class CartManager {
    constructor(path) {
        this.path = path
    }
    /* Método que obtiene el contenido del archivo de carritos de compras y devuelve lo siguiente:
        String - con el contenido del archivo.
        False - si no se encuentra el archivo, o si el archivo existe pero está vacío. */
    getContentFile = async () => {
        let content = ""
        try {
            content = await fs.promises.readFile(this.path, 'utf-8')
        } catch (error) {
            return false
        }

        if (content === '') {
            return false
        }

        return content
    }

    /* Método que escribe el contenido del archivo de carritos de compras y devuelve lo siguiente:
        True - si se escribió correctamente en el archivo.
        False - si hubo un problema al escribir en el archivo. */
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }

    /* Método que obtiene un carrito de compras del archivo, recibe como parámetro el id del 
    carrito de compras solicitado y devuelve lo siguiente:
        Un objeto - si encuentra el carrito de compras solicitado.
        Undefined - si no se encuentra el carrito de compras solicitado.
        False - si no se encuentra el archivo, o si el archivo existe pero está vacío. */
    getCartById = async idCart => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)

        return carts.getElementById(idCart)
    }

    /* Método que crea un nuevo carrito de compras y devuelve lo siguiente:
        True - si el carrito de compras pudo crearse correctamente.
        False - si hubo un problema al crear o registrar el carrito de compras. */
    addCart = async () => {
        const content = await this.getContentFile()
        const carts = new ListCarts()

        if (content !== false) {
            carts.setList(content)
        }

        if (carts.addElement()) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }

    /* Método que agrega o actualiza un producto en un carrito de compras existente, recibe como 
    parámetros el id del carrito de compras y el id del producto a agregar, y devuelve lo siguiente:
        True - si el producto pudo agregarse o actualizarse correctamente.
        False - si no se encuentra el archivo, o si el archivo existe pero está vacío. Si no se 
            encontró el carrito de compras para agregar el producto. */
    addProductToCart = async (idCart, idProduct) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)
        if (carts.addElementByIds(idCart, idProduct)) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }
}

module.exports = CartManager