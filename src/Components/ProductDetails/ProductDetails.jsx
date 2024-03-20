import axios from "axios";
import { useQuery } from "react-query";

import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import Footer from "../Footer/Footer";

export default function ProductDetails() {
  let { id } = useParams();
  const { addToCart, setNumsOfCart } = useContext(CartContext);

  async function addProduct(productId) {
    let res = await addToCart(productId);

    if (res.data.status === "success") {
      setNumsOfCart(res.data.numOfCartItems);

      toast.success("Product added to cart", {
        position: "top-right",
        duration: 1000,
        style: {
          border: "1px solid #0aad0a",
          padding: "10px 15px ",
        },
      });
    } else {
      toast.error("Product already in cart");
    }
  }
  
  function getProductDetails(id) {
    return axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { isLoading, data } = useQuery(
    "productDetails",
    () => getProductDetails(id),
    { cacheTime: 2000 }
  );

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

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
          <div className="container mt-5">
            <div className="row py-4 align-items-center px-4">
              <div className="col-md-4  ">
                <Slider {...settings}>
                  {data?.data.data.images.map((image, index) => (
                    <img
                      key={index}
                      className="w-100  "
                      src={image}
                      alt={data?.data.data.title}
                    />
                  ))}{" "}
                </Slider>
              </div>
              <Helmet>
                <title>{data?.data.data.title}</title>
              </Helmet>
              <div className="col-md-8 mt-4 ">
                <h2 className="h4 fw-bolder ">{data?.data.data.title}</h2>
                <p className="h6 fw-light ">{data?.data.data.description}</p>
                <h6 className="text-black-50">
                  Category: {data?.data.data.category.name}
                </h6>
                <h6 className="text-main">Price: {data?.data.data.price}EGP</h6>
                <div className="d-flex justify-content-between">
                  <span>
                    Ratings Quantity: {data?.data.data.ratingsQuantity}
                  </span>
                  <span>
                    Rating:{data?.data.data.ratingsAverage}{" "}
                    <i className="fas fa-star rating-color"></i>
                  </span>
                </div>
                <button
                  onClick={() => addProduct(data?.data.data.id)}
                  className="btn bg-main text-white w-100 mt-4"
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
