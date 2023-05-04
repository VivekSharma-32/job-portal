import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import InputForm from "../components/shared/InputForm";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux state
  const { loading } = useSelector((state) => state.alerts);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please provide all fields.");
      }
      dispatch(showLoading());
      const { data } = await axios.post(`/api/v1/auth/register`, {
        name,
        lastName,
        email,
        password,
      });
      console.log(data);
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Invalid form details. Please try again");
      console.log(error);
      dispatch(hideLoading());
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export default Register;
