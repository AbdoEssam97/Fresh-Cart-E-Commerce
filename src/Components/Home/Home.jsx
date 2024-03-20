// import "./Home.module.scss";

import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import FeaturedProducts from "../FeaturedProducts";
import Footer from "../Footer/Footer";
import MainSlider from "../mainSlider/MainSlider";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
      <Footer />
    </>
  );
}
