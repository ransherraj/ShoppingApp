import { useState } from "react";
// import { json } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";

import bg from "../../images/bg.jpg";

import Jumbotron from "../../components/cards/Jumbotron";

export default function Login() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("Location=>",location)

  // console.log(process.env.REACT_APP_API)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));

        toast.success("Login Successful");
        setAuth({ ...auth, token: data.token, user: data.user });
        setEmail("");
        setPassword("");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed! try again");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" subtitle="Please login to get full access. " />

      {/* <Toaster/> */}
      <div className="pt-2 pb-5" style={{ backgroundImage: `url(${bg})` }}>
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />

                <input
                  type="password"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary container" type="submit">
                  Login
                </button>

                <NavLink
                  className="nav-link text-dark mt-2 p-2 "
                  to="/register"
                >
                  {" "}
                  <small className="text-primary">
                    If not registered yet, please
                  </small>{" "}
                  REGISTER <small className="text-primary">from here</small>{" "}
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(name, null, 4)}</pre> */}
    </div>
  );
}
