// import "./_Brands.scss";
import axios from "axios";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";

export default function Brands() {
  async function getBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data } = useQuery("getBrands", getBrands, { cacheTime: 2000 });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="row">
          {data?.data.data.map((brand) => (
            <div
              key={brand._id}
              className="text-center text-black-50 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-4"
            >
              <LazyLoadImage src={brand.image} className="w-100" alt="brand" />
              <p className="fst-italic">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
