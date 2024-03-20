import { Offline } from "react-detect-offline";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <div>
        <Offline>
          <div className="network">
            <i className="fa fa-wifi pe-2 text-main"></i>
            You're <span className="text-main fw-bolder ">Offline </span>
            right now. Check your connection.
          </div>
        </Offline>
      </div>
    </>
  );
}
