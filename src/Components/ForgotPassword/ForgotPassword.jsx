import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./ForgotPassword.scss";

export default function ForgotPassword() {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function sendCode(values) {
    setIsLoading(true);

    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This Account Not Found Please Register Now....`,
          confirmButtonColor: "#0aad0a",
          footer:
            '<p>Now You Can One......  <a href="/register">signUp</a></p>',
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
      });

    if (data.statusMsg === "success") {
      setIsLoading(false);
      navigate("/resetCode");
    }
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Your Email is required")
      .matches(emailRegex, "Enter valid Your Email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  return (
    <>
      <div className="forgot-password mx-auto ">
        <div className="container my-5 w-75 bg-light ">
          <h3 className="text-center fs-2 text-main mb-4">Forgot Password</h3>
          <form onSubmit={formik.handleSubmit}>
            <label className="mb-2" htmlFor="email">
              email:
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control mb-3"
              type="email"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {isLoading ? (
              <button
                className="btn bg-main d-block mx-auto text-light mt-4 "
                type="button"
              >
                <i className="fas fa-spinner fs-4 fa-spin text-light"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.dirty && formik.isValid)}
                className="btn bg-main d-block mx-auto text-light mt-4 "
                type="submit"
              >
                Send Code
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
