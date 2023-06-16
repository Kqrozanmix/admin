import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./Menu.js";
import { motion } from "framer-motion";
import { Layout, Menu, theme } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { BsCartCheck } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import Logoimage from "../image/logo.png";
import {
  FiShoppingBag,
  FiInfo,
  FiHome,
  FiPocket,
  FiList,
  FiBookmark,
  FiMenu,
  FiLayers,
  FiGrid,
  FiTrello,
  FiPlusSquare,
  FiPackage,
  FiSettings,
} from "react-icons/fi";
import { FaRegNewspaper, FaUserFriends } from "react-icons/fa";
import { GrContact, GrServices } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const dispatch = useDispatch();

  const logOut = useCallback(async () => {
    dispatch(logout());
    await navigate("/login");
  }, [dispatch]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "20rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "20rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "6rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[20rem]  w-[20rem] 
        overflow-y-scroll md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img src={Logoimage} width={70} className="ml-2" />
          <button
            onClick={logOut}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Đăng xuất
          </button>
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                    x: 10,
                    y: -550,
                    rotate: 0,
                  }
                : {
                    x: 10,
                    y: -550,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} className={"text-blue-500"} />
          </motion.div>
        </div>

        <div className="flex flex-col  h-full ">
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "Statistical",
                icon: <FiList className="fs-4" />,
                label: "Thống kê",
                children: [
                  {
                    key: "statistical-total",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Tổng quát",
                  },
                  {
                    key: "statistical-order-today",
                    icon: <FiLayers className="fs-4" />,
                    label: "Đơn trong ngày",
                  },
                  {
                    key: "statistical-order-month",
                    icon: <FiLayers className="fs-4" />,
                    label: "Đơn trong tháng",
                  },
                  {
                    key: "statistical-order-quy",
                    icon: <FiLayers className="fs-4" />,
                    label: "Đơn trong quý",
                  },
                ],
              },
              {
                key: "dmcs",
                icon: <FiTrello className="fs-4" />,
                label: "Danh mục chính",
                children: [
                  {
                    key: "dmc",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục chính",
                  },
                  {
                    key: "dmc-list",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách danh mục lớn",
                  },
                ],
              },
              {
                key: "Catalogs",
                icon: <FiList className="fs-4" />,
                label: "Quản lý danh mục",
                children: [
                  {
                    key: "category",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục",
                  },
                  {
                    key: "list-category",
                    icon: <FiLayers className="fs-4" />,
                    label: "Danh sách danh mục",
                  },
                ],
              },
              {
                key: "brands",
                icon: <FiPocket className="fs-4" />,
                label: "Quản lý nhãn hàng",
                children: [
                  {
                    key: "brand",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm nhãn hàng",
                  },
                  {
                    key: "list-brand",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách nhãn hàng",
                  },
                ],
              },
              {
                key: "Catalog",
                icon: <FiShoppingBag className="fs-4" />,
                label: "Hàng Hóa",
                children: [
                  {
                    key: "product",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm hàng hóa",
                  },
                  {
                    key: "list-product",
                    icon: <FiPackage className="fs-4" />,
                    label: "Danh sách hàng hóa",
                  },
                ],
              },
              {
                key: "blogcategory",
                icon: <FiBookmark className="fs-4" />,
                label: "Danh mục tin tức",
                children: [
                  {
                    key: "blog-category",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục tin tức",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách danh mục tin",
                  },
                ],
              },
              {
                key: "Newss",
                icon: <FaRegNewspaper className="fs-4" />,
                label: "Quản lý tin tức",
                children: [
                  {
                    key: "news",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm tin tức",
                  },
                  {
                    key: "list-news",
                    icon: <FiGrid className="fs-4" />,
                    label: "Danh sách tin tức",
                  },
                ],
              },
              {
                key: "Contact",
                icon: <GrContact className="fs-4" />,
                label: "Quản lý liên hệ",
                children: [
                  {
                    key: "list-contact",
                    icon: <GrContact className="fs-4" />,
                    label: "Danh sách liên hệ",
                  },
                ],
              },
              {
                key: "Userss",
                icon: <FaRegNewspaper className="fs-4" />,
                label: "Quản lý người dùng",
                children: [
                  {
                    key: "user",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm người dùng",
                  },
                  {
                    key: "list-user",
                    icon: <FiGrid className="fs-4" />,
                    label: "Danh sách người dùng",
                  },
                ],
              },
              {
                key: "Order",
                icon: <BsCartCheck className="fs-4" />,
                label: "Quản lý đơn đặt hàng",
                children: [
                  {
                    key: "list-order",
                    icon: <FiGrid className="fs-4" />,
                    label: "Danh sách đơn đặt hàng",
                  },
                ],
              },
              {
                key: "setting",
                icon: <FiSettings className="fs-4" />,
                label: "Cài đặt",
                children: [
                  {
                    key: "add-home",
                    icon: <FiHome className="fs-4" />,
                    label: "Trang chủ",
                  },
                  {
                    key: "add-footer",
                    icon: <FiInfo className="fs-4" />,
                    label: "Thông tin website",
                  },
                  {
                    key: "add-service",
                    icon: <GrServices className="fs-4" />,
                    label: "Trang dịch vụ",
                  },
                  {
                    key: "add-about",
                    icon: <FaUserFriends className="fs-4" />,
                    label: "Trang về chúng tôi",
                  },
                ],
              },
            ]}
          />
        </div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
