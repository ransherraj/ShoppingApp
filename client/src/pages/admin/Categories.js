import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";

import AdminMenu from "../../components/nav/AdminMenu";

import "../../index.css";
import { useState, useEffect } from "react";

import CategoryForm from "../../components/forms/CategoryForm";

import { Modal } from "antd";
import bg from '../../images/bg.jpg'

import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategories() {
  const [auth, setAuth] = useAuth();
  const [Categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);
  const [updatingName, setUpdatingName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("null");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      console.log("update category => ", updatingName);
      const { data } = await axios.put(`/category/${selectedCategory._id}`, {
        name: updatingName,
      });


      if(data?.error){
        toast.error(data.error);
      }
      else{
        toast.success("Updated successfully");
        setSelectedCategory(null);
        setUpdatingName('');
        loadCategories();
        setVisible(false);
      }

    } catch (err) {
      console.log(err);
      toast.error("Category name already exists");
    }
  };



  //Delete

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      // console.log("update category => ", updatingName);
      const { data } = await axios.delete(`/category/${selectedCategory._id}`);

      if(data?.error){
        toast.error(data.error);
      }
      else{
        toast.success(`"${data?.name}" Deleted successfully`);
        setUpdatingName('');
        loadCategories();
        setVisible(false);
      }

    } catch (err) {
      console.log(err);
      toast.error("Category name already exists");
    }
  };

  return (
    //panel panel-default
    // <h1 className=" mt-4 justify-content-center text-center">Admin Dashboard</h1>
    <>
      <Jumbotron
        title={`Hello, ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />

      <div className="container-fluid ">
        <div className="row ">
          <div className="col-md-3 bg-dark bg-opacity-50 min-vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-9 bg-secondary bg-opacity-25 min-vh-100 " style={{backgroundImage:`url(${bg})`}}>
            <div className="d-flex justify-content-center text-light mt-2 mb-2 p-2 bg-secondary rounded-1">
            <h2>Categories</h2>
            </div>

            <div className=" bg-light rounded p-2 ">
              <div className="d-flex flex-wrap">
                {Categories?.map((category) => (
                  <div key={category.id}>
                    <button
                      className="btn btn-outline-primary m-1 row"
                      onClick={() => {
                        setVisible(true);
                        setSelectedCategory(category);
                        setUpdatingName(category.name);
                      }}
                    >
                      {category.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Modal
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
              className="text-primary"
            >
              <div className="p-3">
                <CategoryForm
                  value={updatingName}
                  setValue={setUpdatingName}
                  handleSubmit={handleUpdate}
                  buttonUpdateText="Update"
                  handleDelete={handleDelete}
                />
              </div>
            </Modal>
          </div>

          {/* <div className="col-md-3 bg-dark bg-opacity-50 min-vh-100">
            <AdminRightMenu />
          </div> */}
        </div>
      </div>
    </>
  );
}
