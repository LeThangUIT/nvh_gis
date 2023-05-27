import { useState } from "react";
import "./RegisterPage.css";
import FormInput from "../../Components/FormInput/FormInput.jsx";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage: "Tên phải có 3-16 ký tự và không bao gồm ký tự đặc biệt!",
      label: "Tên đăng nhập",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    // {
    //   id: 2,
    //   name: "email",
    //   type: "email",
    //   errorMessage: "Phải là một địa chỉ email hợp lệ!",
    //   label: "Email",
    //   required: true,
    // },
    {
      id: 3,
      name: "std",
      type: "number",
      label: "Số điện thoại",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      errorMessage:
        "Mật khẩu nên có 8-20 ký tự và bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      errorMessage: "Mật khẩu không khớp!",
      label: "Xác nhận mật khẩu",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="register-container">
        <div className="left-container">
          <form onSubmit={handleSubmit}>
            <Link to="/" className="logo-icon">
              <img src={logo} alt="" />
            </Link>
            <h1>Đăng ký</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="register-button">
              <button>Đăng ký</button>
              <Link to="/login" className="login-btn">
                Đăng nhập
                <FiArrowRight className="icon-right" />
              </Link>
            </div>
          </form>
        </div>
        <div className="right-container">
          <img
            src="https://s3-alpha-sig.figma.com/img/f387/b38c/0e0ad28791ce289b38712b9cc27b2123?Expires=1684713600&Signature=QsBCQ2y~uLLtaW-SP2~pcCFClSit38PO50pphZEF~VE~klWz0-wDkUmMVNa5fpz1K1FkmUxhzN5Qt6PKnoMBaQObmbUxxIJuMRVkJoES~n2OLW0u~OakUY~PKuNh4Wy5msZy4V4Ci4kvZDiVUhK10REoNc1uzL8zHy4cy17abM9AnJHM35eFmoEIk8iIUKg3zF9cm9ZbqwM8yeZMSlhrLSGSvPov3~IJf48XV2pxwDM6Hdk3X5mmEdgP9HwjTsJiIQBBXEl047HrNWeMKALeCSMwebNvcb96OWd~oTlbHjwCifPF2eLICyq-mfi91iM2R2fs~Cj0HfijJkIAhH64AA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
