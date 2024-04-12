import { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import LoadingGIF from '../../images/loading.gif'

export default function Loading({ path = 'admin'}){
    //state

    const [count, setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    

    useEffect(() => {
        const interval = setInterval(()=>{
            setCount((currentCount) => --currentCount);
        }, 1000);


        //redirect when count == 0
        count === 0 && navigate(`/${path}`, {
            state : location.pathname, 
        });
        

        return ()=>clearInterval(interval);
       

    }, [count]);


    return <div className="d-flex justify-content-center align-items-center p-4 text-danger">
        {/* Login to access this page. Redirecting you to Login Page in {count} seconds  */}
        <img src={LoadingGIF} alt='loading...' style={{width:"300px"}} />
    </div>;

}