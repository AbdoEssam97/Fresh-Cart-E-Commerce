import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./Register.scss";

export default function Register() {
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch(() => {
        // setError(response.data.message);
        setIsLoading(false);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This Account Already Exists, You Can Login Now`,
          confirmButtonColor: "#0aad0a",
          footer:
            '<p>Now You Can......  <a href="https://fresh-cart-es.surge.sh/#/login">Login</a></p>',
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
      });

    if (data.message === "success") {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Now You Can login......",
        confirmButtonColor: "#0aad0a",
        confirmButtonText: `Ok`,
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
      navigate("/login");
    }
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Your Name must be greater than 3 letters")
      .max(30, "Your Name must be less than 30 letters"),
    email: Yup.string()
      .required("Your Email is required")
      .matches(emailRegex, "Enter valid Your Email"),
    password: Yup.string()
      .required("Your Password is required")
      .matches(
        passwordRegex,
        "Your Password must have special character ('@,#,%,&'), letter, number and must be greater than 7"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Confirm Passwords must match Password"),
    phone: Yup.string()
      .required("Your Phone number in required")
      .matches(phoneRegex, "Enter valid number"),
  });

  // const validate = (values) => {

  //   if (values.name == '') {
  //     errors.name = "Name is required"
  //   } else if (values.name.length < 3) {
  //     errors.name = "Min Length must be greater than 3 letters"
  //   } else if (values.name.length > 20) {
  //     errors.name = "Max Length must be less than 20 letters"
  //   }

  //   if (values.email == "") {
  //     errors.email = "Email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = "Invalid email"
  //   }

  //   if (values.password == "") {
  //     errors.password = "Password is required"
  //   } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
  //     errors.password = "Password must have special character, letter, number and must be greater than 7"
  //   }

  //   if (values.rePassword == "") {
  //     errors.rePassword = "RePassword is required"
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = "Password and rePassword doesn't match"
  //   }

  //   if (values.phone == "") {
  //     errors.phone = "Phone number is required"
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "Enter valid Egyptian number"
  //   }

  //   return errors
  // };

  const formiK = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });
  return (
    <>
      <div className="register">
        <div className="container" style={{ width: "70%" }}>
          <h3 className="text-center fs-2 text-main mb-4">Register Now</h3>
          <form onSubmit={formiK.handleSubmit}>
            <label className="mb-2" htmlFor="name">
              Full Name:
            </label>
            <input
              value={formiK.values.name}
              onChange={formiK.handleChange}
              onBlur={formiK.handleBlur}
              className="form-control mb-3"
              type="text"
              name="name"
              id="name"
            />
            {formiK.errors.name && formiK.touched.name ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formiK.errors.name}
              </div>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="email">
              email:
            </label>
            <input
              value={formiK.values.email}
              onChange={formiK.handleChange}
              onBlur={formiK.handleBlur}
              className="form-control mb-3"
              type="email"
              name="email"
              id="email"
            />

            {formiK.errors.email && formiK.touched.email ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formiK.errors.email}
              </div>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="phone">
              phone:
            </label>
            <input
              value={formiK.values.phone}
              onChange={formiK.handleChange}
              onBlur={formiK.handleBlur}
              className="form-control mb-3"
              type="tel"
              name="phone"
              id="phone"
            />

            {formiK.errors.phone && formiK.touched.phone ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formiK.errors.phone}
              </div>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="password">
              password:
            </label>
            <input
              value={formiK.values.password}
              onChange={formiK.handleChange}
              onBlur={formiK.handleBlur}
              className="form-control mb-3"
              type="password"
              name="password"
              id="password"
            />

            {formiK.errors.password && formiK.touched.password ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formiK.errors.password}
              </div>
            ) : (
              ""
            )}

            <label className="mb-2" htmlFor="rePassword">
              Confirm Password:
            </label>
            <input
              value={formiK.values.rePassword}
              onChange={formiK.handleChange}
              onBlur={formiK.handleBlur}
              className="form-control mb-3"
              type="Password"
              name="rePassword"
              id="rePassword"
            />

            {formiK.errors.rePassword && formiK.touched.rePassword ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formiK.errors.rePassword}
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
                disabled={!(formiK.dirty && formiK.isValid)}
                className="btn bg-main d-block mx-auto text-light mt-4 "
                type="submit"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
