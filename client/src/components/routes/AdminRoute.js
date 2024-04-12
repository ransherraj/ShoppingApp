import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import {useAuth} from '../../context/auth'

import axios from 'axios';

import Loading from "./Loading";

export default function AdminRoute() {

    //context
    const [auth, setAuth] = useAuth();

    //state

    const [ok, setOk] = useState(false);

    //use of server request for security
    useEffect(()=>{
        const adminCheck = async () => {
            
            const {data} = await axios.get(`/admin-check`);

            data.ok === true ? setOk(true) : setOk(false);
        };

        if(auth?.token) adminCheck();

    }, [auth?.token]);


    return ok ? <Outlet /> : <Loading path=''/>;

}