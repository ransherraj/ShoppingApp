import ProductCard from "../components/cards/ProductCart";
import axios from "axios";
import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import bg from "../images/bg4.jpg";
import bgFilter from "../images/bg6.jpg";

import { prices } from "../prices";


import { Checkbox , Radio} from "antd";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);


  //radio state
  const [radio, setRadio] = useState([]); 

  //categories
  const [checked, setChecked] = useState([]);


  useEffect(()=>{
    if(!checked.length && !radio.length){
      loadProducts();
    }
  },[checked, radio]);


  useEffect(()=>{
    if(checked.length || radio.length){
      loadFilteredProducts();
    }
  },[checked, radio]);


  const loadFilteredProducts = async()=>{
    try{

      const {data} = await axios.post('/filtered-products',{
        checked,
        radio
      });
      // console.log("filtered Products=> ", data);
      setProducts(data);
    }
    catch(err){
      console.log(err);
    }
  }

  //or

  // useEffect(()=>{
    
  //     loadFilteredProducts();
    
  // },[checked, radio]);


  const handleChecked = (value, id)=>{

    let all = [...checked];
    // console.log(value, id);

    if(value){
      all.push(id);
    }
    else{
      all = all.filter( (c)=> c !== id)
    }
    
    setChecked(all);
  };

 

  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <>
      <Jumbotron title="Shop" subtitle="Get your books at reasonable prices" />

      {/* <pre>{JSON.stringify({checked, radio}, null, 4)}</pre> */}
      

      <div className="container-fluid">
        <div className="row" style={{ backgroundImage: `url(${bgFilter})` }}>
          <div className="col-md-3 ">
            <div className="p-2 mt-4 mb-0 h5 bg-light bg-opacity-75 justify-content-center text-dark rounded-1 text-center" >
              Filter by Categories
            </div>

            <div className="row m-1 p-3">
                {categories?.map((c)=>(
                    <Checkbox className=" p-2 m-1 rounded-1 text-light bg-dark bg-opacity-75 border" key={c._id} onChange={(e)=>{
                        handleChecked(e.target.checked, c._id)
                        
                    }}>
                       {c.name} 
                    </Checkbox>
                ))}
            </div>


            <div className="p-2 mt-2 mb-0 h5 bg-light bg-opacity-75  text-dark text-center rounded-1" >
              Filter By Price
            </div>

            <div className="row p-2">
                <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {prices?.map((p)=>(
                    
                    <div className=" m-2  rounded-1 text-light bg-dark bg-opacity-75 border radioButton"  key={p._id}>
                      <Radio value={p.array}>
                       <div className="text-light p-2">{p.name}</div>
                      </Radio>
                    </div>

                ))}
                </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              <button className="btn btn-light col-md-12" onClick={()=>window.location.reload()}>
                Reset Filter
              </button>
            </div>


          </div>



          <div className="col-md-9 border p-1" >
            {/* <h2 className="p-3 mt-2 h4 bg-light bg-opacity-75 d-flex justify-content-center text-dark rounded-1">
              Products{" "}
            </h2> */}
            <div className="d-flex justify-content-between flex-wrap">
              {products?.map((p) => (
                <ProductCard p={p} />
              ))}
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
