import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import cartImg from "../../assets/images/cartImage.png";
import Footer from "../Footer/Footer";

export default function Cart() {
  const { getUserCart, deleteCart, updateCart, clearAllItems, setNumsOfCart } =
    useContext(CartContext);

  const [cartDetails, setCartDetails] = useState("");
  const [cartId, setCartId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function getCart() {
    let { data } = await getUserCart();
    setIsLoading(true);

    if (data?.status === "success") {
      console.log(data);
      setCartDetails(data);
      setIsLoading(false);
      setCartId(data.data._id);

      setNumsOfCart(data.numOfCartItems);
    }
  }

  async function deleteProductCart(id) {
    setIsLoading(true);
    let { data } = await deleteCart(id);

    if (data?.status === "success") {
      setIsLoading(false);
      setCartDetails(data);

      setNumsOfCart(data.numOfCartItems);
    }

    if (data.numOfCartItems === 0) {
      clearCart();
      setCartDetails("");
    }
  }

  async function updateProductCart(id, quantity) {
    setIsLoading(true);
    let { data } = await updateCart(id, quantity);

    if (data?.status === "success") {
      setCartDetails(data);
      setIsLoading(false);
    }
  }

  async function clearCart() {
    await clearAllItems();

    setCartDetails("");
    setNumsOfCart(0);
  }

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cartDetails ? (
        <div className="container">
          <div className="w-75 my-4 mx-auto px-3 py-5 rounded-3 bg-main-light">
            <h2 className="text-center">Shopping</h2>
            <div className="px-4 mt-3 d-flex justify-content-between align-items-center flex-wrap  ">
              <div className="h6  fw-bolder">
                Number of your Cart Items:{" "}
                <span className="text-main fw-normal">
                  {cartDetails.numOfCartItems}
                </span>
              </div>
              <div className="h6 text-nowrap fw-bolder">
                Total Cart Price:{" "}
                <span className="text-main fw-normal ">
                  {cartDetails.data.totalCartPrice} EGP
                </span>
              </div>
            </div>
            {!isLoading ? (
              cartDetails.data.products.map((product, index) => (
                <div key={index} className="row border-bottom py-4 px-2">
                  <div className="col-md-2">
                    <Link to={`/productsDetails/${product.product.id}`}>
                      <img
                        src={product.product.imageCover}
                        alt=""
                        className="w-100"
                      />
                    </Link>
                  </div>
                  <div className="col-md-10 ">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="mt-sm-3 mt-0 ">
                        <h2 className="h4">{product.product.title}</h2>
                        <h6 className="text-main">
                          {" "}
                          price: {product.price}EGP
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            deleteProductCart(product.product._id),
                              toast.success("You Product Deleted From Cart", {
                                position: "top-left",
                                duration: 1500,
                                style: {
                                  border: "1px solid #0aad0a",
                                  padding: "10px 15px ",
                                },
                              });
                          }}
                          className="btn p-0"
                        >
                          <i className=" btn btn-danger font-sm fas fa-trash-can"></i>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            updateProductCart(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="btn text-light bg-main px-2 py-0 fw-bold"
                        >
                          +
                        </button>
                        <span className="mx-3 fw-bolder">
                          {isLoading ? (
                            <i class="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            product.count
                          )}
                        </span>
                        <button
                          onClick={() =>
                            updateProductCart(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          disabled={product.count === 1}
                          className="btn text-light bg-main px-2 py-0 fw-bold"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "calc(100vh - 550px)" }}
              >
                <i className="fa-solid fa-spinner fa-spin fa-2x text-main "></i>
              </div>
            )}
            <div className="mt-2 d-flex flex-wrap justify-content-between align-items-center">
              <div className="">
                <Link
                  to={"/address/" + cartId}
                  className="btn me-3 text-white bg-main mt-2 "
                >
                  OnLine Payment
                </Link>
                <Link
                  to={"/cashOrder/" + cartId}
                  className="btn bg-main text-white mt-2 "
                >
                  Cash On Drive
                </Link>
              </div>
              <button
                onClick={() => {
                  clearCart(),
                    toast.success("You Cart Is Empty", {
                      position: "top-left",
                      duration: 1500,
                      style: {
                        border: "1px solid #0aad0a",
                        padding: "10px 15px ",
                      },
                    });
                }}
                className="btn btn-danger mt-2 "
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-50 my-4 mx-auto ">
            <h3 className="text-center">
              Your Cart is <span className="fw-bold text-main">Empty</span>
            </h3>
            <img
              src={cartImg}
              className="w-50 mx-auto mt-4 d-block"
              alt="img"
            />
          </div>
        </div>
      )}
      <div className="position-relative mt-5 pt-3">
        <Footer />
      </div>
    </>
  );
}
