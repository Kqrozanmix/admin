import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import moment from "moment";
import { config } from "../utils/axiosconfig";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "antd";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const CommentBlog = () => {
  const [commentblogs, setCommentBlog] = useState([]);
  const [idcomment, setIdComment] = useState("");
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}feedbackblog/feedback?blogid=${id}`)
      .then((response) => {
        setCommentBlog(response.data);
      })
      .catch((e) => {
      });
  }, [id, commentblogs]);

  const showModal = (item) => {
    setOpen(true);
    setIdComment(item);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const deletedComment = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}feedbackblog/${idcomment}`,
        config
      )
      .then((response) => {
        if (response.data.status == "Delete Success") {
          toast.success("Xóa bình luận thành công");
        } else {
          toast.error("Xóa bình luận không thành công");
        }
      })
      .catch((e) => {
        toast.error("Lỗi");
      });
  };
  return (
    <>
      <div>
        <TableContainer className="table container mx-auto">
          <h2 className="text-[30px] pb-3">Danh Sách Bình Luận</h2>
          <div className="overflow-y-scroll h-[500px]">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell" align="center">
                    Họ tên
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Địa chỉ email
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Bình luận
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Thời gian
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commentblogs.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.usename}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.comment}</TableCell>
                    <TableCell align="center">
                      {moment(item.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => showModal(item._id)}
                        className="text-medium text-danger bg-transparent"
                      >
                        <AiFillDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </div>
      <div className="mt-4">
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletedComment();
          }}
          title="Bạn có chắc chắn muốn xóa tin tức này không?"
        />
      </div>
    </>
  );
};

export default CommentBlog;
