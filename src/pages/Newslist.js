import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit, BiCommentDetail } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../components/CustomModal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getBlogNews,
  deleteBlog,
  resetState,
} from "../features/blogNews/blogSlice";

import Modal from "antd/es/modal/Modal";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import imgerror from "../image/imgerror.png";
import { getCategories } from "../features/bcategory/bcategorySlice";
const Listnews = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",

      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text, record) => (
        <Button onClick={() => showModal(text)}>Xem mô tả</Button>
      ),
      // render: (text) => text.slice(0, 20),
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Ảnh tin tức",
      dataIndex: "imageThumbnail",
      render: (url) =>
        url == undefined ? (
          <img src={imgerror} alt="" width={100} height={100} />
        ) : (
          <img src={url.secure_url} alt="" width={100} height={100} />
        ),
    },
    {
      title: "Video tin tức",
      dataIndex: "video",
      render: (id) => (
        <iframe
          width="100"
          height="50"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [visible, setVisible] = useState(false);
  const [pNewID, setpNewID] = useState("");
  const [open, setOpen] = useState(false);
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const blogState = useSelector((state) => state.blognew.blogs);
  const bCategoryState = useSelector((state) => state.bCategory.bCategories);
  const dispatch = useDispatch();

  const showModelNews = (e) => {
    setOpen(true);
    setpNewID(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (desc) => {
    setEditorContent(
      EditorState.createWithContent(convertFromRaw(JSON.parse(desc)))
    );
    setVisible(true);
  };

  const data = [];
  if (bCategoryState.length != 0 && blogState.length != 0)
    for (let i = 0; i < blogState.length; i++) {
      const nameBCategory = bCategoryState.filter((ct) => {
        return ct._id == blogState[i].category;
      });
      data.push({
        key: i + 1,
        title: blogState[i].title,
        description: blogState[i].description,
        category:
          nameBCategory[0].title != undefined ? nameBCategory[0].title : null,
        imageThumbnail: blogState[i].imageThumbnail,
        video: blogState[i].video,
        action: (
          <>
            <div className="flex">
              <Link
                className="fs-3 text-primary bg-transparent border-0"
                to={`/news/${blogState[i]._id}`}
                // onClick={() => showModalEdit(blogState[i])}
              >
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModelNews(blogState[i]._id)}
              >
                <AiFillDelete />
              </button>
              <Link to={`../comment/${blogState[i]._id}`}>
                <button className="ms-3 fs-3 text-success bg-transparent border-0">
                  <BiCommentDetail />
                </button>
              </Link>
            </div>
          </>
        ),
      });
    }
  const deleteCategory = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);

    setTimeout(async () => {
      await dispatch(resetState());
      await dispatch(getBlogNews());
      await dispatch(getCategories());
    }, 1000);
    toast.success("Xóa thành công");
  };

  useEffect(() => {
    dispatch(getBlogNews());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div>
        <h3 className="mb-4 text-xl font-bold">Danh Mục Tin Tức</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>

        <div className="mt-4">
          <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteCategory(pNewID);
            }}
            title="Bạn có chắc chắn muốn xóa tin tức này không?"
          />
        </div>

        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Description"
          footer={null}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                convertToRaw(editorContent.getCurrentContent())
              ),
            }}
          ></div>
        </Modal>
      </div>
    </>
  );
};

export default Listnews;
