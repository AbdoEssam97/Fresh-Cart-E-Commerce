import notfoundImg from "../../assets/images/error.svg";
import Footer from "../Footer/Footer";
export default function Notfound() {
  return (
    <>
      <div className="text-center d-flex justify-content-center align-items-center my-5">
        <img className="w-50" src={notfoundImg} alt="" />
      </div>
      <Footer />
    </>
  );
}
