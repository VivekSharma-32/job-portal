import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div
      style={{ marginTop: "100px" }}
      className="d-flex justify-centent-center align-items-center flex-column"
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToWjKdcFl_hqYuUijVauia9n_fyrrthVdvOQ&usqp=CAU"
        alt="page-not-found"
      />
      <h1 style={{ fontSize: "60px", letterSpacing: "1.5px" }}>Oops!</h1>
      <h1>Page Not Found</h1>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
