import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpasword, setConfirmPassword] = useState("");
  //Biểu thức chính quy
  var checkMail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var checkPassword =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handelRegisters = async (e) => {
    e.preventDefault();
    if (
      firstname == "" ||
      lastname == "" ||
      email == "" ||
      password == "" ||
      phone == ""
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin đăng ký!");
      return;
    } else if (!checkPassword.test(password) || password.length == "") {
      toast.warning("Mật khẩu không hợp lệ!");
      return;
    } else if (!checkMail.test(email) || email.length == "") {
      toast.warning("Email không hợp lệ!");
      return;
    } else if (password != confirmpasword) {
      toast.warning("Mật khẩu và nhập lại mật khẩu không trùng khớp...");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API_URL}user/register`, {
        email: email,
        password: password,
        mobile: phone,
        lastname: lastname,
        firstname: firstname,
        role: "user",
      })
      .then((response) => {
        if (response.data.message == "User Already Exists") {
          toast.warning("Email đã được sử dụng");
        } else if (response.data.status == "fail") {
          toast.warning("Số điện thoại đã tồn tại");
        } else {
          toast.success("Đăng ký thành công");
          setEmail("");
          setFirstName("");
          setLastName("");
          setPhone("");
          setPassword("");
          setConfirmPassword("");
        }
      });
  };
  return (
    <div
      className="flex justify-center items-center"
      style={{ background: "#6698FF", minHeight: "100vh" }}
    >
      <div className="sm:w-2/3 lg:w-2/3 xl:w-[30%]">
        <div className="bg-white rounded-3 p-4 my-8 lg:my-12 mx-auto lg:mx-0 ">
          <h3 className="text-center title text-4xl">Đăng Ký</h3>
          <form onSubmit={handelRegisters}>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="first-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Họ
              </label>
              <input
                type="text"
                id="first-name"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Phan"
                required=""
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                for="last-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Tên
              </label>
              <input
                type="text"
                id="last-name"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Phương Yến"
                required=""
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Số điện thoại
              </label>
              <input
                type="number"
                id="phone"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Phương Yến"
                required=""
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Mật khẩu{": "}
                <button onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="bg-white  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
              >
                Nhập lại mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="••••••••"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: "#6698FF" }}
              type="submit"
            >
              Đăng ký
            </button>
          </form>
          <span>Đã có tài khoản? </span>
          <Link to="/login">
            <span className="text-medium font-bold">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
