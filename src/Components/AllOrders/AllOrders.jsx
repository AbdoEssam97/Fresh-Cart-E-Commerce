import cartImg from "../../assets/images/cartImage.png";
export default function AllOrders() {
  return (
    <>
      <div className="w-50 mt-5 mx-auto ">
        <img src={cartImg} className="w-100 mx-auto mt-4 d-block" alt="img" />
        <h3 className="text-center">
          Your Cart is Empty Now You Can Go{" "}
          <a className="fw-bold text-main text-decoration-underline" href="/">
            Home
          </a>
        </h3>
      </div>
    </>
  );
}
