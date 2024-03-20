import axios from "axios";
import { createContext } from "react";

import { useNavigate } from "react-router-dom";
export const OrderContext = createContext();

let header = {
  token: localStorage.getItem("userToken"),
};

async function OnlinePayment(values) {
  const navigate = useNavigate();

  return await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/65f50148be8b52323561969d?url=http://localhost:5173`,
    { shippingAddress: values },
    { headers: header }
  );
  //     .catch(
  //       () =>
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: `Please Try Again Later`,
  //           confirmButtonColor: "#0aad0a",
  //           showClass: {
  //             popup: `
  //   animate__animated
  //   animate__bounceInUp
  // `,
  //           },
  //           hideClass: {
  //             popup: `
  //   animate__animated
  //   animate__bounceOutUp

  //   `,
  //           },
  //         }),
  //       navigate("/cart")
  //     );
}

export default function OrderContextProvider({ children }) {
  return (
    <OrderContext.Provider value={{ OnlinePayment }}>
      {children}
    </OrderContext.Provider>
  );
}
