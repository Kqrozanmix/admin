import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};
const createBlogCategory = async (catData) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    catData,
    config
  );
  console.log(response.data);
  return response.data;
};
const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategory/${blogCat.id}`,
    {
      title: blogCat.blogCatData.title,
    },
    config
  );
  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};
const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
