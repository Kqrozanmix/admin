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
  import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
const TotalUser = () => {
  const [user, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}user/all-users`);
        const users = response.data;
         // Sử dụng filter để lọc danh sách người dùng có role là "employee"
         const employees = users.filter(user => user.role === 'user');

          const employeeCount = employees.length;
        setUserCount(employeeCount);
      } catch (error) {
        toast.error("Đã xảy ra lỗi! Thử lại");
      }
    };
  
    fetchUserCount();
  }, []);
  
    return user != 0 ? (
      <div className="total-US">
        <Card>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Số lượng người dùng
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  {user}
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
                    <FiUser className="w-10 h-10"/>
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
                Số lượng nhân viên
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
                    <FiUser className="w-10 h-10"/>
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
  export default TotalUser;
  