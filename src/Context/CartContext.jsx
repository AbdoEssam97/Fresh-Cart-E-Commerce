import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

let header = {
  token: localStorage.getItem("userToken"),
};

export default function CartContextProvider({ children }) {
  const [numsOfCart, setNumsOfCart] = useState(0);
  const [cartId, setCartId] = useState("");

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: header,
        }
      )
      .catch((err) => err);
  }

  async function getUserCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: header,
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getUserCart().then((res) => {
      setNumsOfCart(res.data.numOfCartItems);
      localStorage.setItem("userOrderId", res.data.data.cartOwner);
    });
  }, []);

  async function deleteCart(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: header,
      })
      .catch((err) => err);
  }

  async function updateCart(productId, quantity) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: quantity,
        },
        {
          headers: header,
        }
      )
      .catch((err) => err);
  }

  async function clearAllItems() {
    return await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: header,
      })
      .catch((err) => err);
  }

  async function getCartId() {
    let { data } = await getUserCart();
    setCartId(data?.data._id);
  }
  useEffect(() => {
    getCartId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getUserCart,
        deleteCart,
        updateCart,
        clearAllItems,
        numsOfCart,
        setNumsOfCart,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
