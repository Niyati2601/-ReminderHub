// components/Register.js
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGES, registerUrl } from "../../utils/Constants";

const Register = () => {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const response = await axios.post(
        registerUrl,
        data
      );
      console.log(response);
      if (response.data.message === "User Already exists") {
        toast.error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      } else {
        history("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(submit)}>
        <h3>Signup</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          className=" border-bottom"
          placeholder="abc@gmail.com"
          {...register("email", {
            required: ERROR_MESSAGES.EMAIL_REQUIRED,
            pattern: {
              value: /^[^\s@]+@gmail\.com$/,
              message: ERROR_MESSAGES.INVALID_EMAIL,
            },
          })}
        />
        {errors.email && (
          <p style={{ color: "red", textAlign: "left", fontSize: "12px" }}>
            {errors.email.message}
          </p>
        )}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          className=" border-bottom"
          {...register("username", { required: ERROR_MESSAGES.USERNAME_REQUIRED })}
        />
        {errors.username && (
          <p style={{ color: "red", textAlign: "left", fontSize: "12px" }}>
            {errors.username.message}
          </p>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className=" border-bottom"
          {...register("password", {
            required: ERROR_MESSAGES.PASSWORD_REQUIRED,
            minLength: {
              value: 8,
              message: ERROR_MESSAGES.PASSWORD_LENGTH,
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red", textAlign: "left", fontSize: "12px" }}>
            {errors.password.message}
          </p>
        )}
        <button
          type="submit"
          className="btn-custom"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
