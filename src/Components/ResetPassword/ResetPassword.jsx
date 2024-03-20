import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword(values) {
    setIsLoading(true);
    let { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This Email Not Correct`,
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
        });
      });

    if (data.token) {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: `You Can Login Now ...`,
        confirmButtonColor: "#0aad0a",
        footer:
          '<p>Now You Can One......  <a href="https://fresh-cart-es.surge.sh/#/login">login</a></p>',
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
      // navigate("/login");
    }
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Your Email is required")
      .matches(emailRegex, "Enter valid Your Email"),
    newPassword: Yup.string()
      .required("Your Password is required")
      .matches(
        passwordRegex,
        "Your Password must have special character ('@,#,%,&'), letter, number and must be greater than 7"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });
  return (
    <>
      <div className="reset-password mx-auto ">
        <div className="container my-5 w-75 bg-light ">
          <h3 className="text-center fs-2 text-main mb-4">Reset Password</h3>
          <form onSubmit={formik.handleSubmit}>
            <label className="mb-2" htmlFor="email">
              Email:
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

            <label className="mb-2" htmlFor="email">
              New Password:
            </label>
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control mb-3"
              type="password"
              name="newPassword"
              id="newPassword"
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formik.errors.newPassword}
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
                Change Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
