import "./App.scss";

import { Suspense, lazy, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { RouterProvider, createHashRouter } from "react-router-dom";
import CashOrder from "./Components/Address/CashOrder/CashOrder";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import UserOrders from "./Components/UserOrders/UserOrders";
import CartContextProvider from "./Context/CartContext";
import OrderContextProvider from "./Context/OrderContext";
import { UserContext } from "./Context/UserContext";

const Layout = lazy(() => import("./Components/Layout/Layout"));
const Home = lazy(() => import("./Components/Home/Home"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Address = lazy(() => import("./Components/Address/Address"));
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const Products = lazy(() => import("./Components/Products/Products"));
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails")
);
const CategoryDetails = lazy(() =>
  import("./Components/CategorySlider/CategoryDetails")
);

const Register = lazy(() => import("./Components/Register/Register"));
const Login = lazy(() => import("./Components/Login/Login"));
const ForgotPassword = lazy(() =>
  import("./Components/ForgotPassword/ForgotPassword")
);
const ResetCode = lazy(() => import("./Components/ResetCode/ResetCode"));
const ResetPassword = lazy(() =>
  import("./Components/ResetPassword/ResetPassword")
);
const Logout = lazy(() => import("./Components/Logout/Logout"));

const Profile = lazy(() => import("./Components/Profile/Profile"));
const Notfound = lazy(() => import("./Components/Notfound/Notfound"));

const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Home />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Products />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/productsDetails/:id",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <ProductDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/categoryDetails/:id",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <CategoryDetails />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Cart />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/address/:cartId",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Address />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/cashOrder/:cartId",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <CashOrder />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <AllOrders />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense
            fallback={
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
            }
          >
            <Login />,
          </Suspense>
        ),
      },
      {
        path: "/forgotPassword",
        element: (
          <Suspense
            fallback={
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
            }
          >
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/resetCode",
        element: (
          <Suspense
            fallback={
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
            }
          >
            <ResetCode />
          </Suspense>
        ),
      },
      {
        path: "/resetPassword",
        element: (
          <Suspense
            fallback={
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
            }
          >
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense
            fallback={
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
            }
          >
            <Register />,
          </Suspense>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Brands />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile/userOrders",
        element: (
          <ProtectedRoutes>
            <Suspense
              fallback={
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
              }
            >
              <UserOrders />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

function App() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CartContextProvider>
        <OrderContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </OrderContextProvider>
        <Toaster />
      </CartContextProvider>
    </>
  );
}

export default App;
