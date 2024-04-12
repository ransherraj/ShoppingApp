import { useState } from "react";
// import { json } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";

import Jumbotron from "../../components/cards/Jumbotron";
import bg from "../../images/bg.jpg";

export default function Register() {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(process.env.REACT_APP_API)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Registration Successful");

        setAuth({ ...auth, token: data.token, user: data.user });
        setName("");
        setEmail("");
        setPassword("");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed ! try again");
    }
  };

  return (
    <div>
      <Jumbotron
        title="Register"
        subtitle="Please Register to get login access. "
      />

      {/* <Toaster/> */}

      <div className="pt-5 pb-5" style={{backgroundImage:`url(${bg})`}}>
        <div className="container ">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />

                <input
                  type="email"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-4 p-2"
                  placeholder="Enter your Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary container" type="submit">
                  Register
                </button>

                <NavLink className="nav-link text-dark mt-2 p-2 " to="/login">
                  {" "}
                  <small className="text-primary">
                    If already registered
                  </small>{" "}
                  LOGIN <small className="text-primary">from here</small>{" "}
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
