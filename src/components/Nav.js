import MainLayout from "./MainLayout.js";
import { Layout, Menu, theme } from "antd";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

function RootLayout({ children }) {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <div className="flex lg:gap-5">
        <MainLayout />
        <main className="max-w-7xl flex-1 py-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
