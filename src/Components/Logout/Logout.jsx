import "./Logout.scss";

export default function Logout() {
  return (
    <>
      <div className="logout mx-auto">
        <div className="container text-center  my-5" style={{ width: "80%" }}>
          <h1 className="">
            Are You Sure?{" "}
            <span className="fs-5 text-main">You have been logged out.</span>
          </h1>
          <p>
            Redirecting to home page... If you are not redirected automatically,
            please click{" "}
            <span className="text-main text-decoration-underline">OK</span>
            <div className="d-block my-3">
              <button className="btn  bg-main text-light text-decoration-none mx-3">
                Ok
              </button>
              <button className="btn btn-danger text-light text-decoration-none mx-3">
                Cancel
              </button>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
