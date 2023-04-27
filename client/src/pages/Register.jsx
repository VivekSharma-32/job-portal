import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/shared/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [values, setValues] = useState({
  //   name: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValues({
  //     ...values,
  //     [e.target.name]: value,
  //   });
  // };

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, email, password, lastName);
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
            <InputForm
              htmlFor="name"
              labelText={"Name"}
              type="text"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name={"name"}
            />
            <InputForm
              htmlFor="lastName"
              labelText={"Last Name"}
              type="text"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name={"lastName"}
            />
            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name={"email"}
            />
            <InputForm
              htmlFor="password"
              labelText={"Password"}
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name={"password"}
            />
          </div>

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
