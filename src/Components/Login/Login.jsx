import "./Login.scss";

import { UserContext } from "../../Context/UserContext";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function Login() {
  let navigate = useNavigate();

  let { setUserToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  async function loginSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This Account Not Found`,
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

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      console.log(data);

      navigate("/");
    }
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Your Email is required")
      .matches(emailRegex, "Enter valid Your Email"),
    password: Yup.string()
      .required("Your Password is required")
      .matches(
        passwordRegex,
        "Your Password must have special character ('@,#,%,&'), letter, number and must be greater than 7"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="login mx-auto">
        <div className="container mt-5" style={{ width: "70%" }}>
          <h3 className="text-center fs-2 text-main mb-4">Login</h3>
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

            <label className="mb-2" htmlFor="password">
              password:
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control mb-3"
              type="password"
              name="password"
              id="password"
            />

            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formik.errors.password}
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
              <>
                <button
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn bg-main d-block mx-auto text-light mt-4 "
                  type="submit"
                >
                  Login
                </button>
                <p className="d-block text-center fs-5 text-main mt-3">or</p>
                <div className="row align-items-center mt-3 ">
                  <span
                    className="col-md-6 text-center
                   w-100"
                  >
                    <Link to="/forgotPassword"> Forget Password</Link>
                  </span>
                  <span className="col-md-6 text-center mt-3 w-100">
                    If You Don't Have Account.....
                    <Link to="/register"> signup</Link>
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
