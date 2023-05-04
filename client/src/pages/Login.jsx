import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading } = useSelector((state) => state.alerts);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in Successfuly");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password. Please try again");
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
                Not a user. <Link to="/register">Register here!</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
