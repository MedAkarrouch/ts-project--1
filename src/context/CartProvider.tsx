import { ReactElement, createContext, useReducer } from "react"

export type CartItemType = {
  sku: string
  name: string
  price: number
  qty: number
}

type CartStateType = {
  cart: CartItemType[]
}

const initCartState: CartStateType = {
  cart: []
}
export enum REDUCER_ACTION_TYPE {
  ADD,
  REMOVE,
  QUANTITY,
  SUBMIT
}
// const REDUCER_ACTION_TYPE = {
//   ADD: "ADD",
//   REMOVE: "REMOVE",
//   QUANTITY: "QUANTITY",
//   SUBMIT: "SUBMIT"
// }
// export type ReducerActionType = typeof REDUCER_ACTION_TYPE
export type ReducerAction = {
  type: REDUCER_ACTION_TYPE
  payload?: CartItemType
}

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload)
        throw new Error("action.payload missing in ADD action")
      const item = action.payload
      // check if item exists
      const itemExists: boolean = state.cart.some((ele) => ele.sku === item.sku)
      return {
        ...state,
        cart: [...state.cart, { ...item, qty: itemExists ? item.qty + 1 : 1 }]
      }
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload)
        throw new Error("action.payload missing in REMOVE action")
      const item = action.payload
      return {
        ...state,
        cart: state.cart.filter((ele) => ele.sku !== item.sku)
      }
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload)
        throw new Error("action.payload missing in QUANTITY  action")
      const { sku, qty } = action.payload
      const itemExists: boolean = state.cart.some((ele) => ele.sku === sku)
      if (!itemExists) throw new Error("Item does not exists")
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.sku === sku ? { ...item, qty } : item
        )
      }
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }
    default:
      throw new Error("Unindentified reducer action type")
  }
}
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState)
  const totalItems: number = state.cart.reduce(
    (prev, curr) => prev + curr.qty,
    0
  )
  const totalPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(state.cart.reduce((prev, curr) => prev + curr.qty * curr.price, 0))
  const cart = state.cart.sort((a, b) => +a.sku - +b.sku)
  return { dispatch, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartCounterState: UseCartContextType = {
  dispatch: () => {},
  cart: [],
  totalItems: 0,
  totalPrice: ""
}

export const CartContext =
  createContext<UseCartContextType>(initCartCounterState)
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  const { cart, dispatch, totalItems, totalPrice } =
    useCartContext(initCartState)
  return (
    <CartContext.Provider value={{ dispatch, cart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartContext
