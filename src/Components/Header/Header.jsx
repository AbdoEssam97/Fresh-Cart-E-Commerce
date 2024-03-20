import Logo from "../../assets/images/freshcart-logo.svg";
import "./Header.scss";

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import Offcanvas from "./Offcanvas/Offcanvas";

export default function Header() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  let { numsOfCart } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 sticky-top">
        <div className="container-fluid ">
          <NavLink className="navbar-brand " to="">
            <img className="logo w-100 pb-1" src={Logo} alt="" />
          </NavLink>
          <a className="navbar-toggler border-0 " type="button">
            <i
              className="fa-solid fa-bars fa-flip-both fa-xl"
              style={{ color: "#0aad0a" }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            ></i>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item me-3">
                    <NavLink className={`nav-link links `} to="">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink className={`nav-link links`} to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink className={`nav-link links`} to="/brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item me-0">
                    <NavLink
                      className={`nav-link links position-relative`}
                      aria-current="page"
                      to="/cart"
                    >
                      <i
                        className="fa-solid fa-cart-shopping fa-lg  "
                        style={{ color: "#00aa0a" }}
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numsOfCart}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink
                      className={`nav-link links`}
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item me-0 cursor-pointer">
                    <span
                      onClick={() => {
                        logOut();
                      }}
                      className={`nav-link links`}
                      aria-current="page"
                    >
                      <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-3">
                    <NavLink
                      className={`nav-link links`}
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink
                      className={`nav-link links`}
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Offcanvas />
    </>
  );
}
