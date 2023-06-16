import CancleOrder from "./Statistical/CancleOrder";
import ConfirmedOrder from "./Statistical/ConfirmedOrder";
import DeliveredOrder from "./Statistical/DeliveredOrder";
import HandleOrder from "./Statistical/HandleOrder";
import ShipingOrder from "./Statistical/ShipingOrder";
import TotalUserEm from "./Statistical/TotalUserEm";
import TotalUser from "./Statistical/TotalUser";
import "./style/StatisticalTotal.css";
import UserActive from "./Statistical/UserActive";
import UserBlock from "./Statistical/UserBlocked";
const StatisticalTotal = () => {
  return (
    <div className="homeAdmin">
      <div className="homeContainerAdmin">
        <h1 className="text-xl font-medium">Thống kê tổng quát đơn hàng</h1>
        <div className="TotalUS">
          <div className="userTotal">
            <HandleOrder />
          </div>
          <div className="deviceTotal">
            <ConfirmedOrder />
          </div>
          <div className="deviceC">
            <ShipingOrder />
          </div>
          <div className="deviceD">
            <CancleOrder />
          </div>
        </div>
        <div className="tableU">
          <DeliveredOrder />
        </div>
        <div className="mt-2">
          <h1 className="text-xl font-medium">
            Thống kê tổng quát người dùng{" "}
          </h1>
        </div>
        <div className="TotalUS">
          <div className="deviceC">
            <TotalUserEm />
          </div>
          <div className="deviceD">
            <TotalUser />
          </div>
          <div className="deviceD">
            <UserActive />
          </div>
          <div className="deviceD">
            <UserBlock />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatisticalTotal;
