import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import logo from "../../images/logo.png";
import { Avatar, Badge, Space } from 'antd';

import {
  FaShoppingCart
} from "react-icons/fa";

import Search from "../forms/Search";

import useCategory from "../../hooks/useCategory";

import { useCart } from "../../context/cart";

export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // user defined hooks
  const categories = useCategory();

  // console.log("categories in menu=>", categories);

  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary shadow sticky-top">
        <div className="container-fluid ">
          <NavLink className="navbar-brand nav-link text-white" to="/rbv">
            <img
              className="rounded-1"
              src={logo}
              alt="logo"
              width={50}
              height={50}
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-white">
                <NavLink
                  className="nav-link text-white "
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item text-white">
                <NavLink
                  className="nav-link text-white "
                  aria-current="page"
                  to="/shop"
                >
                  Shop
                </NavLink>
              </li>

              <li>
                <div className="dropdown" >
                  <li>
                    <a
                      className="nav-link pointer dropdown-toggle text-white fw-bold text-Capitalize"
                      data-bs-toggle="dropdown"
                      
                    >
                      Categories
                    </a>

                    <ul
                      className="dropdown-menu col-12 text-dark p-3"
                      style={{ height: "400px", overflow: "scroll" }}
                    >
                      <li className="  btn btn-light  d-flex row mb-1 text-capitalize">
                        <NavLink
                          className="nav-link text-dark"
                          to={`/categories`}
                        >
                          All categories
                        </NavLink>
                      </li>

                      {categories.map((c) => (
                        <li key={c._id} className=" btn btn-light d-flex row mb-1">
                          <NavLink
                            className=" nav-link text-dark"
                            to={`/products-by-category/${c.slug}`}
                          >
                            {c.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                </div>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="dropdown">
                  <li>
                    <a
                      className="nav-link pointer dropdown-toggle text-white text-uppercase"
                      data-bs-toggle="dropdown"
                    >
                      {auth?.user?.name}
                    </a>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="nav-link text-dark"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li className="nav-item pointer">
                        <NavLink
                          className="nav-link pointer text-danger"
                          onClick={logout}
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </div>
              )}
            </ul>

            <Search />

            <div className="m-2 p-1"  >
              
              
              <Badge count={cart?.length > 0 ? cart?.length : 0} offset={[10, 5]} showZero>
                <FaShoppingCart style={{ fontSize: 25, color:'white', cursor:'pointer'}} onClick={()=>navigate('/cart')}/> 
              </Badge>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
