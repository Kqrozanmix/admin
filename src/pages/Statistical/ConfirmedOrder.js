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
  import { FcShipped } from "react-icons/fc";
const ConfirmedOrder = () => {
  const [checkOrder, setCheckOrder] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}orders/getallorder`)
        .then((result) => {
          const count = result.data.reduce((total, item) => {
            if (item.orderStatus === "Đã xác nhận") {
              return total + 1;
            }
            return total;
          }, 0);
          setCheckOrder(count);
        })
        .catch((e) => {
          console.log(e);
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
                  Đơn hàn đã xác nhận
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  {checkOrder}
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
                    <FcShipped className="w-10 h-10"/>
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
                Tổng đơn hàng đã giao
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  0
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: "#3498db",
                    height: 56,
                    width: 56,
                  }}
                >
                    <FcShipped className="w-10 h-10"/>
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
  export default ConfirmedOrder;
  