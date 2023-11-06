import { useContext } from "react"
import ProductsContext, {
  ProductsProvider,
  UseProductContextType
} from "../context/ProductsProvider"
export const useProducts = (): UseProductContextType => {
  return useContext(ProductsContext)
}
