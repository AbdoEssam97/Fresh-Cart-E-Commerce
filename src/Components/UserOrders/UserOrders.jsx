import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ThreeCircles } from "react-loader-spinner";

export default function UserOrders() {
  const [allOrders, setAllOrders] = useState("");
  const userId = localStorage.getItem("userOrderId");

  function getUserOrder() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  useEffect(() => {
    getUserOrder();
  }, []);

  if (!allOrders) {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center w-100 text-text-black bg-white bg-opacity-25"
          style={{ height: "calc(100vh - 65px)" }}
        >
          <ThreeCircles
            visible={true}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>my orders</title>
      </Helmet>

      <div className="container my-5">
        <div className="row g-3">
          {allOrders.map((order, indx) => (
            <div
              key={indx}
              className="col-sm-6 col-md-4 col-lg-3 col-xl-3 border border-1 border-light rounded-2 px-2 g-4 bg-black bg-opacity-10"
            >
              <div className="orders" style={{ height: "100px" }}>
                <h5>
                  payment method:{" "}
                  <span style={{ color: "green" }}>
                    {order.paymentMethodType}
                  </span>
                </h5>
                <h4>
                  order price:{" "}
                  <span style={{ color: "green" }}>
                    {order.totalOrderPrice}
                  </span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// export default function AllOrders() {
//
// }
