import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteContact,
  getContacts,
  resetState,
} from "../features/contacts/contactSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";



const Contactlist = () => {

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Nội dung liên hệ",
      dataIndex: "description",
      render: (text, record) => (
        <Button onClick={() => showModalDes(text)}>Xem nội dung</Button>
      ),
    },
    {
      title: "Thời gian liên hệ",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [open, setOpen] = useState(false);
  const [openDes, setOpenDes] = useState(false);
  const [des, setDes] = useState("");
  const [contactid, setContactId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setContactId(e);
  };

  const showModalDes = (e) => {
    setOpenDes(true);
    setDes(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const brandState = useSelector((state) => state.contacts.contacts);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].name,
      email: brandState[i].email,
      phone: brandState[i].phone,
      address: brandState[i].address,
      description: brandState[i].description,
      createdAt: moment(brandState[i].createdAt).format("DD-MM-YYYY"),
      action: (
        <>
          <div className="flex">
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }

  const deletedContact = (e) => {
    dispatch(deleteContact(e));
    setOpen(false);
    setTimeout(async () => {
      await dispatch(resetState());
      await dispatch(getContacts());
    }, 1000);
    toast.success("Xóa thành công")
  };

  useEffect(() => {

    dispatch(getContacts());
  }, [dispatch]);



  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="mb-4 text-xl font-bold">Liên hệ</h3>
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
            deletedContact(contactid);
          }}
          title="Bạn có muốn xóa liên hệ này không?"
        />
      </div>
      <div className="mt-4">
        <Modal
          open={openDes}
          onCancel={() => setOpenDes(false)}
          title="Nội dung"
          footer={null}
        >
          {des}
        </Modal>
      </div>
    </div>
  );
};

export default Contactlist;
