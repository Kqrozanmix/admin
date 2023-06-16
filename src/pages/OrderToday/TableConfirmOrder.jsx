import {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaCheck, FaShippingFast } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { FcSynchronize, FcShipped, FcInTransit } from "react-icons/fc";
import { GrPowerReset } from "react-icons/gr";
import { Input, Space, Table, Modal, message } from "antd";
import Highlighter from "react-highlight-words";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../features/product/productSlice";
import axios from "axios";
import moment from "moment";

const TableConfirmOrder = ({ orderData }) => {
  const dispatch = useDispatch();
  const [modalProduct, setModalProduct] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedOrder, setSelectedOrder] = useState([]);
  const searchInput = useRef(null);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [orderData]);
  const userId = JSON.parse(window.localStorage.getItem("user"));
  const iduser = userId._id;

  useEffect(() => {}, [iduser]);
  const getProductNameById = (productId) => {
    const pro = products.find((item) => item._id == productId);
    return pro ? pro.name : "Sản phẩm không tồn tại";
  };
  const getProductImagesById = (productId) => {
    const pro = products.find((item) => item._id == productId);
    return pro?.imagesDefault.secure_url;
  };
  const getProductPriceById = (productId) => {
    const pro = products.find((item) => item._id == productId);
    return pro ? pro.price : 0;
  };

  const totalPriceProduct = (price, qty) => {
    const total = price * qty;
    return total;
  };
  const showModal = (products) => {
    setSelectedOrder(JSON.parse(products));
    setModalProduct(true);
  };
  const showModalUserOrder = async (user) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}user/${user}`
      );
      const userData = response.data.getaUser;
      setUserData(userData); // Cập nhật state với thông tin người dùng
      setModalUser(true); // Mở modal
    } catch (error) {
      toast.error("Lỗi khi gọi API:", error);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm, dataIndex) => {
    clearFilters();
    confirm();
    setSearchText("");
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            type="button"
            className="text-white bg-[#007bff] hover:bg-[#007bff]/90 focus:ring-4 focus:outline-none focus:ring-[#007bff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          >
            <AiOutlineSearch />
            Tìm kiếm
          </button>
          <button
            onClick={() =>
              clearFilters && handleReset(clearFilters, confirm, dataIndex)
            }
            type="button"
            className="text-black bg-[#fff] hover:bg-[#fff]/90 focus:ring-4 focus:outline-none focus:ring-[#fff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          >
            <GrPowerReset />
            Đặt lại
          </button>

          <button
            onClick={() => {
              close();
            }}
            type="button"
            className="text-black bg-[#fff] hover:bg-[#fff]/90 focus:ring-4 focus:outline-none focus:ring-[#fff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          >
            Đóng
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <AiOutlineSearch
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let arr = [];

  orderData.map((item, index) => {
    const data = {
      id: item._id,
      key: index + 1,
      orderby: item.orderby,
      orderdate: moment(item.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
      products: JSON.stringify(item.products),
      payment: item.paymentIntent.name,
      //   shipping: item.shippingMethor.name,
      status:
        item.orderStatus === "Đã xác nhận" ? (
          <span className="text-[#079992] font-bold">
            <FaCheck className="inline w-5 h-5" /> &nbsp;Đã xác nhận
          </span>
        ) : item.orderStatus === "Đang giao hàng" ? (
          <span className="text-[#e1b12c] font-bold">
            <FcInTransit className="inline w-5 h-5" /> &nbsp; Đang giao hàng
          </span>
        ) : item.orderStatus === "Đã hủy" ? (
          <span className="text-red-500 font-bold">
            <FiDelete className="rotate-180 inline w-5 h-5" /> &nbsp; Đã hủy
          </span>
        ) : item.orderStatus === "Đã giao hàng" ? (
          <span className="text-[#27ae60] font-bold">
            <FcShipped className="inline w-5 h-5" /> &nbsp; Đơn hàng đã được
            giao
          </span>
        ) : item.orderStatus === "Đang xử lý" ? (
          <span className="text-gray-700 font-bold">
            <FcSynchronize className="inline w-5 h-5" /> &nbsp; Đang chờ xử lý
          </span>
        ) : (
          <span className="text-blue-700 font-bold">Không rõ</span>
        ),
      totalPrice: item.totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    };
    arr.push(data);
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "5%",
      ...getColumnSearchProps("key"),
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sản phẩm",
      key: "products",
      width: "15%",
      render: (text, record) => (
        <button
          className="text-white bg-[#007bff] hover:bg-[#007bff]/90 focus:ring-4 focus:outline-none focus:ring-[#007bff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          onClick={() => showModal(record.products)}
        >
          Chi tiết ({JSON.parse(record.products).length})
        </button>
      ),
      // ...getColumnSearchProps('products'),
    },
    {
      title: "Người mua",
      key: "orderby",
      width: "15%",
      render: (text, record) => (
        <button
          className="text-white bg-[#007bff] hover:bg-[#007bff]/90 focus:ring-4 focus:outline-none focus:ring-[#007bff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          onClick={() => showModalUserOrder(record.orderby)}
        >
          Chi tiết
        </button>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      width: "15%",
      ...getColumnSearchProps("payment"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "10%",
      ...getColumnSearchProps("totalPrice"),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderdate",
      key: "orderdate",
      width: "16%",
      ...getColumnSearchProps("orderdate"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
      ...getColumnSearchProps("status"),
    },
  ];

  return (
    <>
      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={arr}
      />
      <Modal
        title="Tất cả sản phẩm"
        onCancel={() => setModalProduct(false)}
        open={modalProduct}
        width="70%  "
        footer={[
          <button
            onClick={() => setModalProduct(false)}
            type="button"
            className="text-white bg-[#007bff] hover:bg-[#007bff]/90 focus:ring-4 focus:outline-none focus:ring-[#007bff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          >
            <AiOutlineCloseCircle />
            Đóng
          </button>,
        ]}
      >
        <div className="w-full overflow-x-scroll">
          <table className="table-fixed text-center mx-auto text-sm ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Ảnh</th>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Số lượng</th>
                <th className="px-6 py-3">Giá sản phẩm</th>
                <th className="px-6 py-3">Tổng tiển sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.map((item, index) => (
                <tr>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={getProductImagesById(item.product)}
                      style={{ width: "50px", height: "50px" }}
                      alt=""
                      className="rounded-lg shadow-md"
                    />
                  </td>
                  <td className="truncate max-w-[300px] px-6 py-4">
                    {getProductNameById(item.product)}
                  </td>
                  <td className="px-6 py-4">{item.qty}</td>
                  <td className="px-6 py-4">
                    {getProductPriceById(item.product).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {totalPriceProduct(
                      getProductPriceById(item.product),
                      item.qty
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      {/* Show modal user order  */}
      <Modal
        title="Thông tin người mua"
        onCancel={() => setModalUser(false)}
        open={modalUser}
        width="50%  "
        footer={[
          <button
            onClick={() => setModalUser(false)}
            type="button"
            className="text-white bg-[#007bff] hover:bg-[#007bff]/90 focus:ring-4 focus:outline-none focus:ring-[#007bff]/50 font-medium rounded-lg text-sm px-3.5 py-2 text-center inline-flex items-center mr-2 mb-2"
          >
            <AiOutlineCloseCircle />
            Đóng
          </button>,
        ]}
      >
        <div className="w-full overflow-x-scroll">
          <table className="table-fixed text-center mx-auto text-sm ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {userData && (
                <tr>
                  <td className="px-6 py-3">1</td>
                  <td className="px-6 py-3">
                    {userData.firstname} {userData.lastname}
                  </td>
                  <td className="px-6 py-3">{userData.email}</td>
                  <td className="px-6 py-3">{userData.mobile}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default TableConfirmOrder;
