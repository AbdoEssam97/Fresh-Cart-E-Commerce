// import "./_Products.scss";
import axios from "axios";
import React, { useContext } from "react";

import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Footer from "../Footer/Footer";

export default function Products() {
  const { setNumsOfCart } = useContext(CartContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { addToCart } = useContext(CartContext);

  async function addProduct(productId) {
    let res = await addToCart(productId);

    if (res.data.status === "success") {
      toast.success("Product added to cart", {
        position: "top-left",
        duration: 1000,
        style: {
          border: "1px solid #0aad0a",
          padding: "10px 15px ",
        },
      });
    } else {
      toast.error("please login");
    }

    setNumsOfCart(res.data.numOfCartItems);
  }

  let { isLoading, data } = useQuery("featuredProducts", getProducts, {
    enabled: true,
    cacheTime: 10000,
    refetchInterval: 5000,
    // refetchOnMount:false,
    // staleTime:Infinity,
  });

  return (
    <>
      {isLoading ? (
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
      ) : (
        <>
          <div className="container mt-4 mb-5 py-2">
            <div className="row">
              {data?.data.data.map((product) => (
                <div
                  key={product.id}
                  className=" col-sm-6 col-md-4 col-lg-3 col-xl-2 border border-1 border-light rounded-2 px-2 g-1 bg-black bg-opacity-10  "
                >
                  <div className="product cursor-pointer px-3 py-3 my-3 rounded-2 bg-white">
                    <Link to={`/productsDetails/${product.id}`}>
                      <p className="text-main my-2 text-center">
                        {product.category.name}
                      </p>
                      <LazyLoadImage
                        className="w-100"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <h3 className="h6 my-3 text-truncate text-black ">
                        {product.title}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">
                          {product.price}
                          <span className="text-main fst-italic fw-bolder">
                            EGP
                          </span>
                        </span>
                        <span className="text-black ">
                          {product.ratingsAverage}
                          <i className="fas fa-star rating-color"></i>
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addProduct(product.id)}
                      className="btn bg-main text-white w-100 btn-sm mt-2"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
