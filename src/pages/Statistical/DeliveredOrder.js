import { useState, useEffect } from "react";
import axios from "axios";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@mui/material";
  import { BsCartCheckFill } from "react-icons/bs";
const DeliveredOrder = () => {
    const [checkOrder, setCheckOrder] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
      const fetchData = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}orders/getallorder`)
          .then((result) => {
            const orders = result.data;
            const deliveredOrders = orders.filter(
              (order) => order.orderStatus === "Đã giao hàng"
            );
            const totalPrice = deliveredOrders.reduce(
              (total, order) => total + order.totalPrice,
              0
            );
    
            setCheckOrder(deliveredOrders.length);
            setTotalPrice(totalPrice);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      fetchData();
      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }, []);

    return checkOrder != 0 ? (
      <div className="total-US">
        <Card>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Đơn hàng đã hoàn thành
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  {checkOrder}
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Tổng doanh thu
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  <p className="font-bold text-red-500">
                  {new Intl.NumberFormat({
                                style: "currency",
                                currency: "VND",
                              }).format(totalPrice)}{" "}
                              VNĐ
                  </p>
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: "#27ae60",
                    height: 56,
                    width: 56,
                  }}
                >
                    <BsCartCheckFill className="w-10 h-10"/>
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                pt: 2,
              }}
            ></Box>
          </CardContent>
        </Card>
      </div>
    ) : (
      <div className="total-US">
        <Card>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                Đơn hàng đã hoàn thành
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  0
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: "#f9ca24",
                    height: 56,
                    width: 56,
                  }}
                >
                    <BsCartCheckFill className="w-10 h-10"/>
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                pt: 2,
              }}
            ></Box>
          </CardContent>
        </Card>
      </div>
    );
  };
  export default DeliveredOrder;
  