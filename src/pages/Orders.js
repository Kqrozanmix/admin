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
import TableAntd from "./TableGetOrder";
import TableAntdAction from "./TableGetOrderAction";
import TableConfirmOrder from "./TableConfirmOrder";
import TableShipingOrder from "./TableShipingOrder";
import TableAllOrder from "./TableAllOrder";

const Oders = () => {
  const [alloder, setAllOder] = useState([]);
  useEffect(() => {
    const getalloder = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}orders/getallorder`)
        .then((response) => {
          setAllOder(response.data);
        });
    };
    getalloder();
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
      <div className="w-full ml-auto mr-auto p-10">
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
export default Oders;
