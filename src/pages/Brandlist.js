import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
import { getcContainers } from "../features/CategoryContainer/cContainerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên nhãn hàng",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const brandState = useSelector((state) => state.brand.brands);
  const dispatch = useDispatch();
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const CategoryContainer = useSelector((state) => state.catectn.cContainers);
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getcContainers());
  }, []);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <div className="flex">
            <Link
              to={`/brand/${brandState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
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
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(async () => {
      await dispatch(resetState());
      await dispatch(getBrands());
    }, 1000);

    toast.success("Xóa nhãn hàng thành công");
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="mb-4 text-xl font-bold">Nhãn hàng</h3>
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
            deleteBrand(brandId);
          }}
          title="Bạn có muốn xóa nhãn hàng này không?"
        />
      </div>
    </div>
  );
};

export default Brandlist;
