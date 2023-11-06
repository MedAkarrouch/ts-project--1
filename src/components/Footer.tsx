import React from "react"
import { useCart } from "../hooks/useCart"

type typeProps = {
  viewCart: boolean
}
const Footer = ({ viewCart }: typeProps) => {
  const { totalItems, totalPrice } = useCart()
  const year: number = new Date().getFullYear()
  const pageContent = viewCart ? (
    <p>Shopping cart &copy; {year}</p>
  ) : (
    <>
      <p>Total Items : {totalItems}</p>
      <p>Total Price : {totalPrice}</p>
      <p>Shoping cart &copy; {year}</p>
    </>
  )
  const content = <footer className="footer">{pageContent}</footer>

  return content
}

export default Footer
