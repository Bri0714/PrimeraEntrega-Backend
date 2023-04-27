class ListCart {
	constructor() {
		this.list = []
	}

	/* Método que devuelve la longitud de la lista de carritos de compras. */
	getLength = () => this.list.length

	/* Método que crea un id único autoincremental. */
	createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

	/* Método que inicializa la lista de carritos de compras. */
	setList = contFile => this.list = JSON.parse(contFile)

	/* Método que devuelve la lista completa de carritos de compras. */
	getList = () => this.list

	/* Método que devuelve el índice de un elemento o carrito de compras, 
	utiliza el id o la propiedad del carrito de compras para buscarlo, 
	si no se encuentra, devuelve -1. */
	getIndexElementById = id => this.list.findIndex(ele => ele.id === id)

	/* Método que devuelve el índice de un elemento hijo o producto, 
	utiliza la propiedad id del producto para buscarlo, en caso de no 
	encontrarlo, devuelve -1. */
	getIndexChildElementById = (indexParent, idChild) => this.list[indexParent].products.findIndex(child => child.product === idChild)

	/* Método que crea un nuevo carrito con un id único y un array vacío 
	de productos. */
	addElement = () => this.list.push({ id: this.createId(), products: [] })

	/* Método que devuelve un elemento o carrito de compras, utiliza la 
	propiedad id del carrito de compras para buscarlo, si no lo encuentra, 
	devuelve indefinido. */
	getElementById = id => this.list.find(ele => ele.id === id)

	/* Método que agrega un elemento hijo o producto al carrito de compras, 
	utiliza el id del carrito de compras y el id del producto para buscar 
	el carrito y agregar o incrementar la cantidad de productos, devuelve 
	true si pudo agregarse y false si no encontró el producto en el carrito 
	de compras. */
	addElementByIds = (idParent, idChild) => {
		const indexParent = this.getIndexElementById(idParent)
		if (indexParent < 0) {
			return false
		}

		const indexChild = this.getIndexChildElementById(indexParent, idChild)

		if (indexChild < 0) {
			this.list[indexParent].products.push({ product: idChild, quantity: 1 })
		} else {
			this.list[indexParent].products[indexChild].quantity++
		}

		return true
	}
}

module.exports = ListCart