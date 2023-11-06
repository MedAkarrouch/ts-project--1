import React from "react"
type PropsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const content = (
    <nav className="nav">
      <button onClick={() => setViewCart(viewCart ? false : true)}>{`View ${
        viewCart ? "Products" : "Cart"
      }`}</button>
    </nav>
  )
  return content
}

export default Nav
