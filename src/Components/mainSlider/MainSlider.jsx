import React from "react";

import Slider from "react-slick";
import slider7 from "../../assets/images/banner-4.jpeg";
import slider5 from "../../assets/images/blog-img-1.jpeg";
import slider6 from "../../assets/images/blog-img-2.jpeg";
import blog2 from "../../assets/images/grocery-banner-2.jpeg";
import blog1 from "../../assets/images/grocery-banner.png";
import slider4 from "../../assets/images/slider-2.jpeg";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    // dots: true,
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       padding: "10px",
    //     }}
    //   >
    //     <ul> {dots} </ul>
    //   </div>
    // ),
    // customPaging: () => (
    //   <div
    //     style={{
    //       width: "20px",
    //       height: "10px",
    //       margin: "40px 3px",
    //       color: "blue",
    //       borderRadius: "15px",
    //       backgroundColor: "#0aad0a",
    //     }}
    //   >
    //     {}
    //   </div>
    // ),
  };

  return (
    <>
      <div className="container mt-3 py-2  bg-light border border-2 border-light rounded-2">
        <div className="row gx-0 ">
          <div className="col-md-8">
            <Slider {...settings}>
              <img height={400} className="w-100" src={slider1} alt="" />
              <img height={400} className="w-100" src={slider2} alt="" />
              <img height={400} className="w-100" src={slider3} alt="" />
              <img height={400} className="w-100" src={slider4} alt="" />
              <img height={400} className="w-100" src={slider5} alt="" />
              <img height={400} className="w-100" src={slider6} alt="" />
              <img height={400} className="w-100" src={slider7} alt="" />
            </Slider>
          </div>
          <div className="col-md-4">
            <img height={200} className="w-100" src={blog1} alt="" />
            <img height={200} className="w-100" src={blog2} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
