import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import "./Offcanvas.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";

export default function Offcanvas() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  let { numsOfCart } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <div
      className={`offcanvas offcanvas-end offcanvas-backdrop.show d-lg-none`}
      data-bs-scroll="true"
      tabIndex={-1}
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header ms-auto">
        <a
          type="button"
          className="btn-close btn btn-danger "
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></a>
      </div>
      <div className={`offcanvas-body text-center `}>
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
          {userToken !== null ? (
            <>
              <li className="nav-item me-3">
                <NavLink
                  className={`nav-link links position-relative`}
                  aria-current="page"
                  to="/cart"
                >
                  <i
                    class="fa-solid fa-cart-shopping fa-lg  "
                    style={{ color: "#00aa0a" }}
                  ></i>
                  <span class="position-absolute top-5  translate-middle badge rounded-pill bg-danger">
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
              <li className="nav-item me-3 cursor-pointer">
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
  );
}
