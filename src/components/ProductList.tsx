import React, { ReactElement } from "react"
import { useCart } from "../hooks/useCart"
import { useProducts } from "../hooks/useProducts"
import { UseProductContextType } from "../context/ProductsProvider"
import { REDUCER_ACTION_TYPE } from "../context/CartProvider"
import Product from "./Product"

const ProductList = () => {
  const { dispatch, cart } = useCart()
  const { products } = useProducts()
  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>
  if (products?.length)
    pageContent = products.map((product) => {
      const inCart = cart.some((pro) => pro.sku === product.sku)

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          inCart={inCart}
        />
      )
    })
  const content = <main className="main main--products">{pageContent}</main>
  return content
}

export default ProductList
