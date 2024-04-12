import Jumbotron from "../components/cards/Jumbotron";
import { useEffect, useState } from "react";

import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import moment from "moment";

import { useCart } from "../context/cart";

import {
  FaRupeeSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTies,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
  FaTimes
} from "react-icons/fa";

import bg from "../images/bg4.jpg";

// import { useSearch } from "../context/search";

import ProductCard from "../components/cards/ProductCart";

import { useParams } from "react-router-dom";

export default function ProductView() {

  //cart context
  const [cart, setCart] = useCart();


  const params = useParams();
  
  const [product, setProduct] = useState({});

  const [related, setRelated] = useState([]);

  const navigate = useNavigate();
  const stock = product.quantity === 0 ? `${product.quantity} in stock` : `out of stock`;
  const color = product.quantity - product.sold === 0 ? `red` : `purple`;

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };


  const loadRelated = async(productId, categoryId)=>{
    try{
        console.log(productId,categoryId);
        const {data} = await axios.get(`/related-products/${productId}/${categoryId}`);
        setRelated(data);
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex justify-content-center m-5">
              <div className="card mb-3 m-2 hoverable " key={product._id}>
                <Badge.Ribbon
                  className="text-capitalize"
                  text={`${product.sold} sold`}
                  color="green"
                >
                  <Badge.Ribbon
                    className="text-capitalize"
                    text={`${
                      product?.quantity >= 1
                        ? `${product.quantity - product.sold} In stock`
                        : "Out of Stock"
                    }`}
                    color={color}
                    placement="start"
                  >
                    <div className="d-flex justify-content-center mt-2">
                      <img
                        className="border-bottom rounded-1 "
                        style={{
                          width: "100%",
                          height: "500px",
                          objectFit: "cover",
                        }}
                        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                        alt={product.name}
                      />
                    </div>
                  </Badge.Ribbon>
                </Badge.Ribbon>

                <div className="card-body text-center">
                  <h3 className="text-color fw-bold ">{product?.name}</h3>

                  <p className="card-text descriptionFont lead">{product?.description}</p>
                </div>

                <div className="d-flex justify-content-center text-center">
                  <div>
                    <p className="fw-bold">
                      <h4 className=" text-info"> Price : 
                         {product?.price?.toLocaleString("INR", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h4>
                    </p>

                    <p >
                      
                     <FaProjectDiagram className="text-info fw-bold"/>  Category : {product?.category?.name}
                    </p>

                    <p >
                      
                     <FaRegClock className="text-primary fw-bold"/>  Added : {moment(product?.createdAt).fromNow()}
                    </p>

                    <p >
                      
                     {product?.quantity > 0 ? <FaCheck className="text-primary fw-bold"/>:<FaTimes className="text-danger fw-bold"/>}{"  "}
                     {product?.quantity > 0 ? "In Stock" : "Out of Stock"}

                    </p>

                    <p >
                      
                     <FaWarehouse className="text-primary fw-bold"/>  Available : {product?.quantity - product?.sold}
                    </p>


                  </div>
                </div>

                <div className="d-flex justify-content-between m-2">
                  {/* <div
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomLeftRadius: "5px" }}
              onClick={() => {
                navigate(`/product/${product.slug}`);
              }}
            >
              View Item
            </div> */}
                  <div
                    className="btn btn-success col card-button"
                    style={{
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                    onClick={() => {
                      // navigate(`/product/cart`);
                      setCart([...cart, product])
                    }}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 border">
            <div className="d-flex justify-content-center m-3 bg-info bg-opacity-75 rounded-1 p-1">
              <h3>Related Products</h3>

              
            </div>
            
            {/* <pre>{JSON.stringify(related, null, 4)}</pre> */}

            <div className="d-flex justify-content-center flex-wrap">

                {related?.length < 1 && <p>No Related products</p>}
                {related.map((p)=>(
                    <ProductCard p={p} key={p._id}/>
                ))}
            </div>

            {/* <div className="d-flex justify-content-between flex-wrap">
              {related?.map((p) => (
                <ProductCard p={p} />
              ))}
            </div> */}


          </div>
        </div>
      </div>
    </>
  );
}
