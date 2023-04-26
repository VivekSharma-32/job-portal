import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container d-flex align-items-center justify-content-center">
        <form className="card p-3" onSubmit={handleSubmit}>
          <img
            src="/assets/images/logo/logo.png"
            alt="logo"
            height={150}
            width={400}
          />
          <div className="mb-1">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lname"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input type="text" className="form-control" name="location" />
          </div> */}
          <div className="mt-3 d-flex justify-content-between">
            <p>
              Already Register <Link to="/login">Login</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
