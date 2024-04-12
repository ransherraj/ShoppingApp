import { useAuth } from "../../context/auth";

import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import AdminMenu from "../../components/nav/AdminMenu";
import AdminRightMenu from "../../components/nav/AdminRightMenu";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import bg from '../../images/bg.jpg'



import { Select } from "antd";
const { Option } = Select;

export default function AdminProduct() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

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


  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      //
      const productData = new FormData();
      productData.append('photo', photo);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('category', category);
      productData.append('price', price);
      productData.append('shipping', shipping);
      productData.append('quantity', quantity);

      // console.log([...productData]);

      // console.log("name=>",name, "Description=>", description,"Price=>",price,"Shipping=>", shipping, "quantity=>",quantity,"photo=>",photo)
    

      const {data} = await axios.post('/product', productData);

      if(data?.error){
        toast.error(data.error);
      }
      else{
        toast.success(`"${name} Created Successfully"`);
        navigate("/dashboard/admin/products");
      }
    
    
    
    }
    catch(err){
      console.log(err);
      toast.error(err);
    }

  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-dark bg-opacity-50">
            <AdminMenu />
          </div>
          <div className="col-md-9 bg-secondary bg-opacity-50 min-vh-100 " style={{backgroundImage:`url(${bg})`}}>
            <div className="p-3 m-4 mb-3 h4 bg-light d-flex justify-content-center text-primary rounded-1 ">
              Manage Products
            </div>

            <div className="col-12 d-flex justify-content-center">
              <div className="p-2 mt-4  h5 bg-success bg-opacity-75  text-light rounded-1 ">
                Add Product
              </div>
            </div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product-photo"
                  className="rounded-5 mt-3 img img-responsive"
                  height="200px"
                  width="200px"
                />
              </div>
            )}

            <div className="mt-2">
              <label className="btn btn-info p-3 mb-3 text-dark col-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  hidden
                ></input>
              </label>
            </div>

            <input
              className="form-control mb-3 p-3"
              type="text"
              placeholder="Put Product name"
              value={name}
              onChange={(e)=>{
                setName(e.target.value) 
                
              }}
            />

            <textarea
              className="form-control mb-3 p-3"
              type="text"
              placeholder="Put Description"
              value={description}
              onChange={(e)=>{
                setDescription(e.target.value) 
                
              }}
            />

            <input
              className="form-control mb-3 p-3"
              type="text"
              placeholder="Put Price"
              value={price}
              onChange={(e)=>{
                setPrice(e.target.value) 
                
              }}
            />

            <input
              className="form-control mb-3 p-3"
              type="number"
              min={1}
              placeholder="Put Quantity"
              value={quantity}
              onChange={(e)=>{
                setQuantity(e.target.value) 
                
              }}
            />

            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mt-0"
              placeholder="Choose Category"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>


            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mt-3"
              placeholder="Choose Shipping"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value='0'>No</Option>
              <Option value='1'>Yes</Option>
            </Select>


            <button onClick={handleSubmit} className="btn btn-primary mt-3 mb-3"> Submit</button>


          </div>

          

          {/* <div className="col-md-3 col-md-3 bg-dark bg-opacity-50 ">
            <AdminRightMenu />
          </div> */}
        </div>
      </div>
    </>
  );
}
