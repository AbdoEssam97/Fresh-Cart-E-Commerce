import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./ResetCode.scss";

export default function ResetCode() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function sendCode(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This Code Not Correct`,
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
    if (data.status === "Success") {
      setIsLoading(false);
      navigate("/resetPassword");
    }
  }

  const codeRegex = /^\d{6}$/;

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Your Code is required")
      .matches(codeRegex, "Enter valid Your Code"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  return (
    <>
      <div className="reset-code mx-auto ">
        <div className="container my-5 w-75 bg-light ">
          <h3 className="text-center fs-2 text-main mb-4">Reset Code</h3>
          <form onSubmit={formik.handleSubmit}>
            <label className="mb-2" htmlFor="restCode">
              Code:
            </label>
            <input
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control mb-3"
              type="tel"
              name="resetCode"
              id="restCode"
              maxLength={6}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className="alert alert-danger p-1 mt-2 d-block" role="alert">
                {formik.errors.resetCode}
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
