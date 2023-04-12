import React, { useSate, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// upload
// Layout Page
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Navigation/Footer";
// Public Page
import HomeWeb from "./components/Public_page/Home/HomeWeb";
import Products from "./components/Public_page/Products";
import User from "./components/Public_page/User/User";
// Public Page // auth user
import History from "./components/Public_page/History";
import Cart from "./components/Public_page/Cart";
import CheckOut from "./components/Public_page/CheckOut/CheckOut";
// Public page // Auth
import Login from "./components/Public_page/Auth_User/Login";
import Register from "./components/Public_page/Auth_User/Register";
// Private Page
import HomeAdmin from "./components/Private_Page/HomeAdmin";
import LoadingToRedirect from "./components/routes/LoadingToRedirect";
// Private // Manage
import ManageUser from "./components/Private_Page/Manage/ManageUser";
import ManageProduct from "./components/Private_Page/Manage/ManageProduct";
import ManageOrder from "./components/Private_Page/Manage/ManageOrder";
// Private // create
import CreateProduct from "./components/Private_Page/Create/Product/CreateProduct";
import CreateCategory from "./components/Private_Page/Create/category/CreateCategory";
// check user
import { currentUser } from "./components/function/auth";
import { useDispatch } from "react-redux";
// alert
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Route
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  const idtoken = localStorage.token;
  const dispatch = useDispatch();
  // ตรวจสอบ user คนปัจจุบัน
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        // console.log("in app",res)
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            iduser: res.data._id,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("not get token");
  }

  return (
    <div>
      <ToastContainer />
      <Navigation />
      <Routes>
        {/* public */}
        <Route path="/" element={<HomeWeb />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />

        <Route
          path="/user"
          element={
            <UserRoute>
              <User />
            </UserRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />

        {/* auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* private */}
        <Route
          path="/admin/home"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-user"
          element={
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-product"
          element={
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <AdminRoute>
              <ManageOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        {/* test
        <Route path="/test" element={<LoadingToRedirect/>}/> */}

        {/* <Route path="/product/:id" element={<Product/>}/> */}
        {/*
        <Route path="/admin/home" element={
          <AdminRoute><Homeadmin/></AdminRoute>
        }/>
        
        <Route path="/admin/manage-admin" element={
          <AdminRoute><ManageAdmin/></AdminRoute>
        }/>
        <Route path="/admin/create-category" element={
          <AdminRoute><CreateCategory/></AdminRoute>
        }/>
        <Route path="/admin/update-category/:id" element={
          <AdminRoute><UpdateCategory/></AdminRoute>
        }/>
        <Route path="/admin/create-product" element={
          <AdminRoute><CreateProduct/></AdminRoute>
        }/>
        <Route path="/admin/update-product/:id" element={
          <AdminRoute><UpdateProduct/></AdminRoute>
        }/>
        <Route path="/admin/order" element={
          <AdminRoute><Order/></AdminRoute>
        }/>
        
     
        <Route path="/user/home" element={
          <UserRoute><Homeuser/></UserRoute> 
        }/>

        <Route path="/checkout" element={
          <UserRoute><CheckOut/></UserRoute> 
        }/>
        <Route path="/user/wishlist" element={
          <UserRoute><WishList/></UserRoute> 
        }/>
        <Route path="/user/history" element={
          <UserRoute><History/></UserRoute> 
        }/> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
