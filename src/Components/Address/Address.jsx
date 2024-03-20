import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Address.scss";

export default function Address() {
  const { cartId } = useParams();
  const nav = useNavigate();

  async function handleAddressSubmit(values) {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,

        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem("userToken") },
          params: { url: "https://fresh-cart-e-commerce-snowy.vercel.app/#" },
        }
      )
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Please Try Again Later`,
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
    window.location.href = data?.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleAddressSubmit,
  });

  return (
    <div className="address">
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
