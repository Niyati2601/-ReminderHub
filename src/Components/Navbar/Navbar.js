import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const id = localStorage.getItem("id");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("id");
    dispatch(authActions.logout());
    navigate("/");
  };
  useEffect(() => {
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch, id]);
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-purple"
      style={{ backgroundColor: "#023047" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
         🔔 ReminderHub
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 g-2">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                style={{ color: "white" }}
              >
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end align-items-center gap-2 m-2">
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button
                    className="btn mx-2 my-2 my-sm-0 me-3"
                    style={{
                      backgroundColor: "#ffb703",
                      color: "#023047",
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    className="btn mx-3 my-3 my-sm-0 me-3"
                    style={{
                      backgroundColor: "#ffb703",
                      color: "#023047",
                    }}
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <button
                  className="btn my-2 my-sm-0 me-3"
                  onClick={logout}
                  style={{
                    backgroundColor: "#ffb703",
                    color: "#023047",
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
