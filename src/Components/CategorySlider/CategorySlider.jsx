import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, data } = useQuery("getCategories", getCategories, {
    cacheTime: 2000,
  });

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 8,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
    pauseOnHover: true,
    dots: true,
    appendDots: (dots) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "20px",
          height: "10px",
          margin: "0px 3px",
          color: "blue",
          borderRadius: "15px",
          backgroundColor: "#0aad0a",
        }}
      >
        {}
      </div>
    ),
  };

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <>
          <div className="container mb-4 overflow-hidden ">
            <Slider {...settings}>
              {data?.data.data.map((category, index) => (
                <div key={index} className="py-3">
                  <Link to={`categoryDetails/${category._id}`}>
                    <img
                      className="w-100"
                      height={200}
                      src={category.image}
                      alt={category.name}
                    />
                    <p className="text-center text-black-50">{category.name}</p>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
}
