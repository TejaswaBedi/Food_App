import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-1 fst-italic" to="/">
            Food Food
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <NavLink className="nav-link fs-5" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <NavLink className="btn bg-white text-success mx-1" to="/login">
                  Login
                </NavLink>
                <NavLink
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </NavLink>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart &nbsp;
                  <Badge pill bg="danger">
                    {data.length ? data.length : ""}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
