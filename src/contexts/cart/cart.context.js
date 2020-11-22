import { createContext } from "react";

const CartContext = createContext({
  hiddenCart: true,
  handleToggleHidden: () => {}
});

export default CartContext;
