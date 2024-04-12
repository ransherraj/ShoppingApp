import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";

import UserInfoMenu from "../../components/nav/UserInfoMenu";
import UserMenu from "../../components/nav/UserMenu";

import { useState, useEffect } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export default function UserProfile() {
  //auth
  const [auth, setAuth] = useAuth();

  //state

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, address } = auth.user;
    setName(name);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        name,
        password,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        // console.log(data);
        setAuth({ ...auth, user: data });

        //local storage update for

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Updated Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Your Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-6">
            <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary ">
              Profile Update
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control m-1"
                paceholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                type="email"
                className="form-control m-1"
                paceholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control m-1"
                paceholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <textarea
                className="form-control m-1"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

              <button className="btn btn-primary m-1 mb-4">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
