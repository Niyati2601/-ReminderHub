// components/Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authActions } from "../../store";
import { ERROR_MESSAGES, loginUrl } from "../../utils/Constants";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        loginUrl,
        data
      );

      localStorage.setItem("id", response?.data?.others?._id);
      dispatch(authActions.login());
      history("/reminder");
    } catch (error) {
      console.error("Login error:", error);

      // Set error message for server validation error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("password", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        setError("password", {
          type: "server",
          message: ERROR_MESSAGES.SERVER_ERROR,
        });
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="border-bottom"
          placeholder="abc@gmail.com"
          {...register("email", {
            required: ERROR_MESSAGES.EMAIL_REQUIRED,
            pattern: {
              value: /^[^\s@]+@gmail\.com$/,
              message: ERROR_MESSAGES.INVALID_EMAIL,
            },
          })}
        />
        <div className="error">
          {errors.email && (
            <p style={{ color: "red", textAlign: "left", fontSize: "12px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="border-bottom"
          placeholder="Enter your password"
          {...register("password", {
            required: ERROR_MESSAGES.PASSWORD_REQUIRED,
          })}
        />
        <div className="error">
          {errors.password && (
            <p style={{ color: "red", textAlign: "left", fontSize: "12px" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="btn-custom"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
