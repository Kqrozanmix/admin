import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Menulist from "./pages/Menulist";
import Setting from "./pages/Setting";
import Linklist from "./pages/Linklist";
import Nav from "../src/components/Nav";
import News from "../src/pages/Addnews";
import NewsList from "../src/pages/Newslist";
import AddHome from "./pages/Setting/AddHome";
import AddFooter from "./pages/Setting/AddFooter";
import AddService from "./pages/Setting/AddContact";
import AddAbout from "./pages/Setting/AddAbout";
import AddDMC from "./pages/AddDMC";
import DMCList from "./pages/DMCList";
import CommentBlog from "./pages/Commentblog.js";
import ListContact from "./pages/Contactlist";
import FeedbackProduct from "./pages/FeedbackProduct";
import AddUser from "./pages/AddUsers";
import Userlist from "./pages/Userlist";
import Register from "./pages/Register";
import Oders from "./pages/Orders";
import StatisticalTotal from "./pages/StatisticalTotal";
import OrderToday from "./pages/OrderToday";
import OrderMonth from "./pages/OrderMonth";
import OderQuy from "./pages/OrderQuy";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Lấy giá trị role từ local storage và cập nhật vào state
    const storedRole = localStorage.getItem("user");
    const userinfo = JSON.parse(storedRole);
    if (userinfo) {
      setRole(userinfo.role);
    } else {
      setRole("");
    }
  }, []);
  console.log(role);
  return (
    <Router>
      <ToastContainer pauseOnHover={false} draggable={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/" element={<Nav />}>
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blogcategory/:id" element={<Addblogcat />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="news/:id" element={<News />} />
          <Route path="news" element={<News />} />
          <Route path="list-news" element={<NewsList />} />
          <Route path="dmc" element={<AddDMC />} />
          <Route path="dmc/:id" element={<AddDMC />} />
          <Route path="dmc-list" element={<DMCList />} />
          <Route path="menu-list" element={<Menulist />} />
          <Route path="setting" element={<Setting />} />
          <Route path="link-list" element={<Linklist />} />
          <Route path="add-home" element={<AddHome />} />
          <Route path="add-footer" element={<AddFooter />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="add-about" element={<AddAbout />} />
          <Route path="list-contact" element={<ListContact />} />
          <Route path="comment/:id" element={<CommentBlog />} />
          <Route path="feedbackproduct/:id" element={<FeedbackProduct />} />
          {role === "admin" && <Route path="user/:id" element={<AddUser />} />}
          {role === "admin" && (
            <Route path="list-user" element={<Userlist />} />
          )}
          <Route path="list-order" element={<Oders />} />
          <Route path="statistical-total" element={<StatisticalTotal />} />
          <Route path="statistical-order-today" element={<OrderToday />} />
          <Route path="statistical-order-month" element={<OrderMonth />} />
          <Route path="statistical-order-quy" element={<OderQuy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
