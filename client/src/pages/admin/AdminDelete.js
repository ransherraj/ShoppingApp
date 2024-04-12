import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";

import AdminMenu from "../../components/nav/AdminMenu";
import AdminRightMenu from "../../components/nav/AdminRightMenu";
import CategoryForm from "../../components/forms/CategoryForm";

import { Modal } from "antd";
import bg from '../../images/bg.jpg'

import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategory() {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [Categories, setCategories] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Name => ", name);
      const { data } = await axios.post("/category", { name });
      console.log(data);
      if (data?.error) {
        toast.error("Category already exists");
      } else {
        loadCategories();
        toast.success(`${name} is created successfully`);
        setName("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Creation of Category failed. Try Again");
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
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-md-3 bg-dark bg-opacity-50 vh-100">
            <AdminMenu />
          </div>
          <div className="col-md-9 col-md-3 bg-secondary bg-opacity-50 min-vh-100" style={{backgroundImage:`url(${bg})`}}>
            <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary rounded-1">
              Manage Categories
            </div>
            <div className="p-1">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
                
              />
            </div>

            <hr />

            <div className="p-3 mt-2 h4 bg-light d-flex justify-content-center text-primary rounded-1">
              Categories
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

          {/* <div className="col-md-3 col-md-3 bg-dark bg-opacity-50 vh-100">
            <AdminRightMenu />
          </div> */}
        </div>
      </div>
    </>
  );
}
