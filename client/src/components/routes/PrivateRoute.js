import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import {useAuth} from '../../context/auth'

import axios from 'axios';

import Loading from "./Loading";

export default function PrivateRoute() {

    //context
    const [auth, setAuth] = useAuth();

    //state

    const [ok, setOk] = useState(false);

    //use of server request for security
    useEffect(()=>{
        const authCheck = async () => {
            
            const {data} = await axios.get(`/auth-check`);

            data.ok === true ? setOk(true) : setOk(false);
        };

        if(auth?.token) authCheck();

    }, [auth?.token]);

    // context used is not secure
    // useEffect(() => {
    //     if(auth?.token){
    //         setOk(true);
    //     }
    //     else{
    //         setOk(false);
    //     }
        
    // }, [auth?.token]);

    return ok ? <Outlet /> : <Loading/>;

}