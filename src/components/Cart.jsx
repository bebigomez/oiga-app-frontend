import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeQuantity, deleteItem } from "../reducers/cartReducer"
import { formatToGuarani } from '../utils'

const Cart = () => {
  const items = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  console.log('- Items: ', items)

  let shippingCost = 25000

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCheckout = () => {
    if (items.length < 1) {
      alert("Your cart is currently empty.")
      return
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const getCartSubtotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  }

  // const handleQuantityChange = (itemOrderId, event) => {
  //   const newQuantity = parseInt(event.target.value)
  //   dispatch(changeQuantity(itemOrderId, newQuantity))
  // }

  return (
    <section className="grid md:grid-cols-2">
      <div className="p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Elementos del carrito</h2>

        {items.length === 0 && <h3>Aún no se agregaron artículos.</h3>}

        {items && items.map((item, index) => (
          <div
            className="cart-item flex border-b border-gray-200 py-4"
            key={index}
          >
            <img
              src={item.imageUrls[0]}
              alt={item.name}
              className="w-28 md:w-40 object-cover mr-4 rounded"
            />
            <div className="flex-1">
              <h3 className="md:text-lg font-semibold">{item.name}</h3>
              <p className="text-sm md:base text-gray-600">Size: {item.size}</p>
              <p className="text-sm md:base text-gray-600">
                ₲ {formatToGuarani(item.price)}
              </p>
            </div>
            <button
              className="text-gray-600 hover:text-red-600"
              onClick={() => dispatch(deleteItem(item.orderId))}
            >
              <svg
                className="text-gray-400 w-5 mx-2 md:mx-10"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 rounded md:bg-slate-100">
        <h2 className="text-2xl font-bold mb-4">Resumen de compra</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-800">
            ₲ {formatToGuarani(getCartSubtotal())}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Envio:</span>
          <span className="text-gray-800">
            ₲ {formatToGuarani(shippingCost)}
          </span>{" "}
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Total:</span>
          <span className="text-gray-800">
            ₲ {formatToGuarani(getCartSubtotal() + shippingCost)}
          </span>
        </div>
        <button
          onClick={() => handleCheckout()}
          className="bg-black md:text-xl text-white py-2 px-4 rounded w-full"
        >
          Finalizar compra
        </button>
      </div>

      <dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        className="bg-slate-200 text-black p-5 md:p-10 rounded-xl"
      >
        <div className="flex justify-center mb-8">
          <svg
            className="w-12 h-12 text-green-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <h2 className="text-xl mb-4">
          Pago exitoso <br />
          (Mentira, esto aún es un sitio ficticio)
        </h2>
        <p className="text-lg mb-4">Resumen de compra:</p>
        <p>
          • Subtotal: ₲ {formatToGuarani(getCartSubtotal())} <br />• Envío:
          ₲ {formatToGuarani(shippingCost)} <br />• Total: ₲
          {formatToGuarani(getCartSubtotal() + shippingCost)}
        </p>
        <p className="text-lg mt-4 mb-4">Gracias por tu compra ficticia!</p>
        <div className="flex justify-end">
          <button
            onClick={handleCloseModal}
            className="bg-black text-white px-4 py-2 rounded mt-4"
          >
            Cerrar
          </button>
        </div>
      </dialog>
    </section>
  )
}

export default Cart
