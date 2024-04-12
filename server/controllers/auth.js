import express from 'express';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import User from '../models/user.js'
import jwt from 'jsonwebtoken';

import Order from '../models/order.js'
import {requireSignin} from '../middlewares/auth.js'

import dotenv from 'dotenv';
dotenv.config();


// const router =  express.Router();

// export const users = async(req, res) => {
//     res.json({
//         msg : 'the express server running',
//         srn : 24,
//         appno: 20,
//     })
// }



export const register = async(req, res) => {
    // console.log(req.body);

    try{


        // 1. destruct password, name, email from req.body

        const {name, email, password} = req.body;

        if(!name){
            return res.json({error : "Name is required"});
        }

        if(!email){
            return res.json({error : "Email is required"});
        }

        

        // 2. all fields requires password

        if(!password || password.length < 6){
            return res.json({error : "password should be of length atleast 6"});
        }

        // const existingUser = await User.findOne({email : email})
        


        // 3. check if email is taken or naot
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({error: 'email is already taken'});
        }


        // 4. hash password

        const hashedPassword = await hashPassword(password);


        // 5. register user

        const user = await new User({name, email, password : hashedPassword}).save();

        // 6. jwt token implementation 

        const token = jwt.sign(
            {_id : user._id},                      //data
             process.env.JWT_SECRET,     //
            {expiresIn : '9d',
        });


        // 7. send response

        res.json({
            user : {
                name : user.name,
                email : user.email,
                role: user.role,
                address: user.address,
            }, token,
        });

        console.log(res);

        // const user = await new User(req.body).save();
        // user.save();
        // res.json(user);

    }
    catch(err){
        console.log("error =>" , err);
    }
}

//==================================================================
//==========Al Admin
//=================================================================

export const allAdmin = async (req, res)=>{
    try{
        const users = await User.find({})
    }
    catch(err){
        console.log(err);
        return res.json(err);
    }
}




//==================================================================
//==========Admin update and Delete
//=================================================================


export const updateUser = async (req, res) => {
    try{

        //
        const {name, email, password, role, address} = req.body;

        if(!name){
            return res.json({error : "Name is required"});
        }

        if(!email){
            return res.json({error : "Email is required"});
        }

        

        // 2. all fields requires password

        if(!password || password.length < 6){
            return res.json({error : "password should be of length atleast 6"});
        }

        

        // const existingUser = await User.findOne({email : email})
        


        // 3. check if email is taken or naot
        // const existingUser = await User.findOne({email});
        // if(existingUser){
        //     return res.json({error: 'email is already taken'});
        // }


        // 4. hash password

        const hashedPassword = await hashPassword(password);


        const {userId} = req.params;
        const user = await User.findByIdAndUpdate(userId, {
            name,
            email,
            password : hashedPassword,
            role,
            address
        },

        {
            new: true,
        }
        );
        console.log(user);
        return res.json(user);

    }
    catch(err){
        console.log(err);
        return res.status(401).json(err);
    }
}


//===================Delete

export const deleteUser = async (req, res) => {
    try{

        //

        const user = await User.findByIdAndDelete(req.params.userId);
        return res.json(user);

    }
    catch(err){
        console.log(err);
        return res.status(401).json(err);
    }
}

//==================================================================
//==========User Update and Delete
//==================================================================



//----========Login====----------


export const login = async(req, res) => {
    // console.log(req.body);

    try{


        // 1. destruct password, name, email from req.body

        const {email,password} = req.body;


        if(!email){
            return res.json({error : "Email is required"});
        }

        

        // 2. all fields requires password

        if(!password || password.length < 6){
            return res.json({error : "password should be of length atleast 6"});
        }


        // 3. check if email is taken or naot
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: 'User not found!!'});
        }


        // 4. login user

        const match = await comparePassword(password, user.password);

        if(!match) {
            return res.json({error: 'Wrong Password!!'});
        }

        // 6. jwt token implementation 

        const token = jwt.sign(
            {_id : user._id},                      //data
             process.env.JWT_SECRET,     //
            {expiresIn : '9d',
        });


        // 7. send response

        res.json({
            user : {
                name : user.name,
                email : user.email,
                role: user.role,
                address: user.address,
            }, token,
        });

        console.log(res);

        // const user = await new User(req.body).save();
        // user.save();
        // res.json(user);

    }
    catch(err){
        console.log("error =>" , err);
    }
}


//update 

export const updateProfile = async(req, res) =>{
    try{
        //
        // console.log(req.body);
        // res.json("abc")
        const {name, password, address} = req.body;

        if(!name){
            return res.json({error : "Name is required"});
        }

        

        // 2. all fields requires password

        if(!password || password.length < 6){
            return res.json({error : "password should be of length atleast 6"});
        }

        const user = await User.findById(req.user._id);
        const hashed = password ? await hashPassword(password) : undefined;

        const updated = await User.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            password : hashed || user.password,
            address : address || user.address,
        }, {new : true});

        updated.password = undefined;
        return res.json(updated);

    }
    catch(err){
        console.log(err);
    }
}


//------------getOrders------------------

export const getOrders = async(req, res)=>{

    try{
        const orders = await Order.find({buyer:req.user._id}).populate('products', '-photo').populate('buyer','name').sort({createdAt:-1});
        console.log("userId=>",req.user_id)
        console.log("userId=>",orders)
        return res.json(orders);
    }
    catch(err){
        console.log(err);
    }

}



//------------------secret controller------------

export const secret = async(req, res) =>{
    res.json({
        currentuser : req.user,
    })
}

//----------------admin test conroller-------------

// export const admin = async(req, res) =>{
//     res.json({
//         currentuser : req.user,
//     })
// }


//-----------------category create-------------



//-------------------========== test for /detail route =========-----------------------

export const detail = async(req, res) =>{
    res.json({
        user: 'ransherraj',
        password: '12345',
    })
}

export const test = async(req, res) =>{
    res.json({
        data: 'data',
        id : '1',
    })
}