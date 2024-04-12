
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/nav/Menu'
import Footer from './components/nav/Footer'
import Dashboard from './pages/user/Dashboard'
import RBV from './pages/RBV'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
import Shop from './pages/Shop'

import Search from './pages/Search'
import ProductView from './pages/ProductView'
import Cart from './pages/Cart'
import CategoriesList from './pages/CategoriesList'


//Admin Category and product Page

import AdminCategory from './pages/admin/Category'
import AdminCategories from './pages/admin/Categories'
import AdminProduct from './pages/admin/Product'
import AdminProducts from './pages/admin/Products'
import AdminProductUpdate from './pages/admin/ProductUpdate'

import UpdateAdmin from '../src/pages/admin/AdminUpdate'
import AllAdmin from '../src/pages/admin/AdminAll'
import DeleteAdmin from '../src/pages/admin/AdminDelete'

//profile and orders page

import UserProfile from './pages/user/Profile'
import UserOrders from './pages/user/Orders'

//import react router dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import AdminDashboard from './pages/admin/Dashboard'
import CategoryView from './pages/CategoryView'

const PageNotFound = ()=>{
  return <>
    <div className='d-flex justify-content-center align-items-center text-center p-4 bg-info vh-100'>
      404 | Page Not Found
    </div>
  </>
}

export default function App() {
  return (

    <BrowserRouter>
      <Menu/>
      <Toaster/>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/product/:slug' element={<ProductView/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/categories' element={<CategoriesList/>}/>
        <Route path='/products-by-category/:slug' element={<CategoryView/>}/>

        <Route path='/rbv' element={<RBV/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        <Route path='/dashboard' element={<PrivateRoute/>}> 

          <Route path='user' element={<Dashboard/>}/>
          
          <Route path='user/orders' element={<UserOrders/>}/>
          <Route path='user/profile' element={<UserProfile/>}/>
          
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}> 
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/category' element={<AdminCategory/>}/>
          <Route path='admin/product' element={<AdminProduct/>}/>
          <Route path='admin/categories' element={<AdminCategories/>}/>
          <Route path='admin/products' element={<AdminProducts/>}/>
          <Route path='admin/product/update/:slug' element={<AdminProductUpdate/>}/>
          
          <Route path='admin/all-admin' element={<AllAdmin/>}/>
          <Route path='admin/update-admin' element={<UpdateAdmin/>}/>
          <Route path='admin/delete-admin' element={<DeleteAdmin/>}/>
        </Route>



        <Route path='*' element={<PageNotFound/>} replace/>
        
      </Routes>

      <Footer/>

    </BrowserRouter>
    
  );
}

// export default App;
