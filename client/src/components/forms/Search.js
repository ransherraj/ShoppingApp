
import axios from "axios";


import { useSearch } from "../../context/search";

import { useNavigate } from "react-router-dom";



export default function Search() {

  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const  handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      if(values?.keyword?.trim().length === 0){
        const { data } = await axios.get(`/products`);
      // setResults(data);
        console.log("Query data=>",data);
        setValues({...values, results:data});
      }
     else{
        const { data } = await axios.get(`/products/search/${values?.keyword}`);
        // setResults(data);
        console.log("Query data=>",data);
  
        setValues({...values, results:data});
     }
        navigate('/search');
      // console.log(values);

    }
    catch(err){

      console.log(err);

    }
  }


  return (
    <form  className="d-flex text-center" onSubmit={handleSubmit}>
      <input 
        className="form-control me-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        value={values.keyword}
        onChange={(e)=>{
          
          e.preventDefault();
          console.log("=====================");
          setValues({...values, keyword:e.target.value})
          
          // navigate('/searched-products');
          
        }}
        
      />
      <button className="btn btn-light
       text-dark " 
        type="submit"
        style={{backgroundColor:'#bec2c4', border:'none'}}
        >
        Search 
      </button>
    </form>
  );
}
