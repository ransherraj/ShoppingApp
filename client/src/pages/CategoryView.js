import Jumbotron from "../components/cards/Jumbotron";
import { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import ProductCard from "../components/cards/ProductCart";

export default function CategoryView() {
  //state
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [category, setCategory] = useState({});
  //hook
  const navigate = useNavigate();
  const params = useParams();

    useEffect(()=>{
        if(params?.slug) loadProductsByCategory();
    }, [params?.slug]);

    const loadProductsByCategory = async()=>{
        try{

            
            const {data} = await axios.get(`/products-by-category/${params?.slug}`);
            // console.log(data)
            setProductsByCategory(data.products);
            setCategory(data.category);
            

        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
      <Jumbotron title={category.name} subtitle={`${productsByCategory?.length} Products found in ${category.name}`}/>

      <div className="container-fluid text-center">

      <div className="d-flex justify-content-center flex-wrap">
            {productsByCategory?.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        
      </div>
    </>
  );
}
