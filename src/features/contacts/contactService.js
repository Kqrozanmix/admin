import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getContacts = async () => {
  const response = await axios.get(`${base_url}contact/`);
  return response.data;
};

const getContact = async (id) => {
  const response = await axios.get(`${base_url}contact/${id}`, config);

  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`${base_url}contact/${id}`, config);

  return response.data;
};
const ContactService = {
  getContact,
  getContacts,
  deleteContact,
};

export default ContactService;
