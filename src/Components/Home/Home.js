import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div className="Home">
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ marginTop: "15%", fontSize: "45px" }}
      >
        <p
          className="container text-center typed-out"
          style={{ color: "#023047", fontFamily: "Roboto", fontWeight: "300" }}
        >
          Stay organized and never miss a beat with our powerful reminder
          features!!
        </p>
      </div>
      <Link to="/login">
        <button
          className="btn btn-sm"
          type="submit"
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#ffb703",
            color: "#023047",
          }}
        >
          Make Reminders
        </button>
      </Link>
    </div>
  );
};

export default Home;
