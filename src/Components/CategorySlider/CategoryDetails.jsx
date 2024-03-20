import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function CategoryDetails() {
  let { id } = useParams();

  function getCategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  let { isLoading, data } = useQuery(
    "categoryDetails",
    () => getCategoryDetails(id),
    {
      cacheTime: 2000,
    }
  );

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center w-100 text-text-black bg-white bg-opacity-25"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <ThreeCircles
            visible={true}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className="container d-flex flex-column align-items-center justify-content-center mt-5 py-3 ">
            <img src={data?.data.data.image} height={300} className="w-50" />
            <h3 className="w-50 mt-3 text-center text-main fst-italic ">
              {data?.data.data.name}
            </h3>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
