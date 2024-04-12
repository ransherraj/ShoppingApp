
import useCategory from '../hooks/useCategory'
import Jumbotron from '../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom';


import bg from "../images/bg4.jpg";
import bgFilter from "../images/bg6.jpg";

import {Link} from 'react-router-dom'
 
export default function CategoriesList(){

    const categories = useCategory();

    return (
        <>
        
        <Jumbotron title="Categories" subtitle="List of all categories"/>
        

        <div className="container-fluid overflow-hidden bg-info bg-opacity-75" style={{ backgroundImage: `url(${bgFilter})` }} >
            <div className="row gx-5 gy-5 mb-3 pt-5 pb-5">
                {categories?.map((c)=>(
                    <div className="col-md-6" key={c._id}>
                        {/* <button className="btn btn-light col-12 text-dark p-3"></button> */}
                        <NavLink
                          className="btn btn-light col-12 text-dark p-3 nav-link text-dark"
                          to={`/products-by-category/${c.slug}`}
                        >
                          {c.name}
                        </NavLink>
                        
                    </div>
                ))}
            </div>
        </div>

        </>
    )
}