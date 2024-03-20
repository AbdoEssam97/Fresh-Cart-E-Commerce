import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./CashOrder.scss";

export default function CashOrder() {
  const { cartId } = useParams();
  const nav = useNavigate();

  async function handleCashOrderSubmit(values) {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,

        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      )
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You Don't Buy Any Thing !!!!!  `,
          confirmButtonColor: "#0aad0a",
          showClass: {
            popup: `
        animate__animated
        animate__bounceInUp
      `,
          },
          hideClass: {
            popup: `
        animate__animated
        animate__bounceOutUp

        `,
          },
        }),
          nav("/");
      });

    if (data.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Now You Can Pay Your Order With Cash On Drive. Thank You For Choosing Us. Have A Nice Day :) 😊😊😊� ",
        confirmButtonColor: "#0aad0a",
        confirmButtonAriaLabel: `Ok`,
        showClass: {
          popup: `
            animate__animated
            animate__bounceInUp
            `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__bounceOutUp
          
          `,
        },
      });

      nav("/");
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCashOrderSubmit,
  });

  return (
    <div className="cash-order">
      <div className="container w-75 mt-4 ">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">address: </label>
          <input
            className="form-control mb-3"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            name="details"
            type="text"
          />
          <label htmlFor="phone">phone: </label>
          <input
            className="form-control mb-3"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            name="phone"
            type="tel"
          />
          <label htmlFor="city">city: </label>
          <input
            className="form-control mb-3"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            name="city"
            type="text"
          />

          <button
            className="btn bg-main mx-auto mt-4 d-block text-white "
            type="submit"
          >
            check out
          </button>
        </form>
      </div>
    </div>
  );
}
