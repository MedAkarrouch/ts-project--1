import React, { ReactElement } from "react"
import { ProductType } from "../context/ProductsProvider"
import { ReducerAction } from "../context/CartProvider"
import { REDUCER_ACTION_TYPE } from "../context/CartProvider"

type PropsType = {
  product: ProductType
  dispatch: React.Dispatch<ReducerAction>
  inCart: boolean
}
const Product = ({ product, dispatch, inCart }: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href
  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.ADD, payload: { ...product, qty: 1 } })
  const itemInCart = inCart ? "-> Item in Cart " : null
  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={`image of product ${product.name}`} />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(product.price)}{" "}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )
  return content
}

export default Product
