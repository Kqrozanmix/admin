import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "react-toastify/dist/ReactToastify.css";
  import TableAntd from "./OrderToday/TableGetOrder";
  import TableAntdAction from "./OrderToday/TableConfirmOrder";
  import TableConfirmOrder from "./OrderToday/TableConfirmOrder";
  import TableShipingOrder from "./OrderToday/TableShipingOrder";
  import TableAllOrder from "./OrderToday/TableAllOrder";
  
  const OderQuy = () => {
    const [alloder, setAllOder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const getAllOrders = async () => {
      const today = new Date();
      const startOfQuarter = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
      const endOfQuarter = new Date(startOfQuarter.getFullYear(), startOfQuarter.getMonth() + 3, 0);
    
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}orders/getallorder`);
    
        const ordersThisQuarter = response.data.filter((order) => {
          const createdAt = new Date(order.createdAt);
          return createdAt >= startOfQuarter && createdAt <= endOfQuarter;
        });
    
        const deliveredOrders = ordersThisQuarter.filter((order) => order.orderStatus === "Đã giao hàng");
    
        const totalRevenue = deliveredOrders.reduce((accumulator, order) => accumulator + order.totalPrice, 0);
    
        setAllOder(ordersThisQuarter);
        setTotalPrice(totalRevenue);
      } catch (error) {
        console.error("Error retrieving orders:", error);
      }
    };
    
    useEffect(() => {
      getAllOrders();
    }, []);
    
    const dangxuly =
      alloder.filter((order) => order.orderStatus === "Đang xử lý") || [];
    const daxacnhan =
      alloder.filter((order) => order.orderStatus === "Đã xác nhận") || [];
    const danggiaohang =
      alloder.filter((order) => order.orderStatus === "Đang giao hàng") || [];
    const dagiaohang =
      alloder.filter((order) => order.orderStatus === "Đã giao hàng") || [];
    const dahuy = alloder.filter((order) => order.orderStatus === "Đã hủy") || [];
  
    return (
      <div className="w-full">
        <h1 className="justify-center flex">Thống kê đơn hàng trong quý</h1>       
        <div className="w-full ml-auto mr-auto p-10">
        <div className="justify-start flex">
            <h1 className="text-gray-500">Doanh thu: </h1>
            &nbsp;
            <span className="font-bold text-red-500 text-xl">
            {new Intl.NumberFormat({
                                style: "currency",
                                currency: "VND",
                              }).format(totalPrice)}{" "}
                              VNĐ
            </span>
        </div>
          <div className="px-6 pb-6 mt-6 border-t w-[100%] border-gray-300 ">           
            <Tabs value="tatca">
              <TabsHeader className="bg-[#007bff]">
                <Tab value="tatca">Tất cả</Tab>
                <Tab value="xuly" className="z-30">
                  Đang xử lý
                </Tab>
                <Tab value="xacnhan" className="z-30">
                  Đã xác nhận
                </Tab>
                <Tab value="danggiao" className="z-30">
                  Đang giao
                </Tab>
                <Tab value="hoanthanh" className="z-30">
                  Hoàn thành
                </Tab>
                <Tab value="dahuy" className="z-30">
                  Đã hủy
                </Tab>
              </TabsHeader>
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="tatca">
                  <TableAllOrder orderData={alloder} />
                </TabPanel>
              </TabsBody> 
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="xuly">
                  <TableConfirmOrder orderData={dangxuly} />
                </TabPanel>
              </TabsBody>
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="xacnhan">
                  <TableShipingOrder orderData={daxacnhan} />
                </TabPanel>
              </TabsBody>
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="danggiao">
                  <TableAntdAction orderData={danggiaohang} />
                </TabPanel>
              </TabsBody>
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="hoanthanh">
                  <TableAntd orderData={dagiaohang} />
                </TabPanel>
              </TabsBody>
  
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="dahuy">
                  <TableAntd orderData={dahuy} />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };
  export default OderQuy;
  