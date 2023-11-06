import React from "react"
import { ProductType } from "../context/ProductsProvider"
import { ReducerAction } from "../context/CartProvider"
type PropsType = {
  item: ProductType
  dispatch: React.Dispatch<ReducerAction>
}
const CartLineItem = ({ item, dispatch }: PropsType) => {
  const img: string = new URL(`../images/${item.sku}`, import.meta.url).href
  return <div>CartLineItem</div>
}

export default CartLineItem
