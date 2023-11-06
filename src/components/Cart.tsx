import React, { useState } from "react"
import { useCart } from "../hooks/useCart"
import CartLineItem from "./CartLineItem"
import { REDUCER_ACTION_TYPE } from "../context/CartProvider"

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const { cart, dispatch, totalItems, totalPrice } = useCart()
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.SUBMIT })
    setConfirm(true)
  }
  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => (
          <CartLineItem key={item.sku} item={item} dispatch={dispatch} />
        ))}
      </ul>
      <div className="cart_totals">
        <p>Total items : {totalItems}</p>
        <p>Total price : {totalPrice}</p>
        <button
          className="cart_submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place order
        </button>
      </div>
    </>
  )
  const content = <main className="main main--cart">{pageContent}</main>
  return content
}

export default Cart
