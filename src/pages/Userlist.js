import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAUser,
  getAllUsers,
  resetState,
} from "../features/user/userSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Họ",
    dataIndex: "firstname",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Tên",
    dataIndex: "lastname",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Quyền",
    dataIndex: "role",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Userlist = () => {
  const [open, setOpen] = useState(false);
  const [userid, setUserId] = useState("");
  const userState = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const data1 = [];
  for (let i = 0; i < userState.length; i++) {
    data1.push({
      key: i + 1,
      email: userState[i].email,
      phone: userState[i].mobile,
      firstname: userState[i].firstname,
      status:
        userState[i].isBlocked === false ? (
          <span className="font-bold text-red-600">Block</span>
        ) : (
          <span className="font-bold text-green-500">Active</span>
        ),
      lastname: userState[i].lastname,
      role:
        userState[i].role === "admin" ? (
          <span className="font-bold">Quản trị viên</span>
        ) : userState[i].role === "user" ? (
          <span className="">Người dùng</span>
        ) : (
          <span className="font-bold">Nhân viên</span>
        ),
      action: (
        <>
          <div className="flex">
            <Link
              to={`/user/${userState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(userState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const deletedUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(async () => {
      await dispatch(resetState());
      await dispatch(getAllUsers());
    }, 1000);

    toast.success("Xóa người dùng thành công");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="mb-4 text-xl font-bold">Người dùng</h3>
      <div className="overflow-x-auto w-full">
        <Table
          columns={columns}
          dataSource={data1}
          className="table-auto w-full border-collapse"
        />
      </div>
      <div className="mt-4">
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletedUser(userid);
          }}
          title="Bạn có muốn xóa nhãn hàng này không?"
        />
      </div>
    </div>
  );
};

export default Userlist;
