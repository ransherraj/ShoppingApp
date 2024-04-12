import express from 'express';
const router =  express.Router();
// import {users} from '../controllers/auth.js'
import {register, login, secret, detail, updateProfile, getOrders, test, updateUser, deleteUser, allAdmin} from '../controllers/auth.js'
import {requireSignin, isAdmin} from '../middlewares/auth.js'

// router.get('/users', users)
router.post('/register', register)
router.post('/login', login)

//all admin
router.get('/admin-all/:role', requireSignin, isAdmin, allAdmin)

//update admin
router.put('/admin-update/:userId', requireSignin, isAdmin, updateUser)
//delete admin
router.delete('/admin-delete/:userId', requireSignin, isAdmin, deleteUser)

//update User
router.put('/user-update/:userId', requireSignin, updateUser)
//delete user
router.delete('/user-delete/:userId', requireSignin, deleteUser)


router.get('/auth-check', requireSignin, (req, res)=>{
    res.json({ok:true});
});

router.get('/admin-check', requireSignin, isAdmin, (req, res)=>{
    res.json({ok:true});
});

//testing route of login

// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         currentuser : req.user,
//     })  
// });

router.get('/secret', requireSignin, isAdmin, secret);  // multiparameterized middilewares here
router.put('/profile', requireSignin, updateProfile);

// router.get('/admin', isAdmin, admin);
//order
router.get('/orders', requireSignin, getOrders);
//loggedin user with admin role route





//------for test of get only
router.get('/detail', detail);
router.get('/test', test);

export default router;