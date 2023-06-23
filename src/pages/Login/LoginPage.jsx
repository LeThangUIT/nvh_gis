import { useState } from "react";
import "./LoginPage.css";
import FormInput from "../../Components/FormInput/FormInput.jsx";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { instance } from "../../axios";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage: "Vui lòng nhập tên đăng nhập",
      label: "Tên đăng nhập",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      errorMessage: "Vui lòng nhập mật khẩu",
      label: "Mật khẩu",
      required: true,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await instance.post('Auth/login', values)
    console.log(res)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = () => {
    // console.log(values)
  }

  return (
    <div className="login-container">
      <div className="right-container">
        <img
          src="https://s3-alpha-sig.figma.com/img/f387/b38c/0e0ad28791ce289b38712b9cc27b2123?Expires=1684713600&Signature=QsBCQ2y~uLLtaW-SP2~pcCFClSit38PO50pphZEF~VE~klWz0-wDkUmMVNa5fpz1K1FkmUxhzN5Qt6PKnoMBaQObmbUxxIJuMRVkJoES~n2OLW0u~OakUY~PKuNh4Wy5msZy4V4Ci4kvZDiVUhK10REoNc1uzL8zHy4cy17abM9AnJHM35eFmoEIk8iIUKg3zF9cm9ZbqwM8yeZMSlhrLSGSvPov3~IJf48XV2pxwDM6Hdk3X5mmEdgP9HwjTsJiIQBBXEl047HrNWeMKALeCSMwebNvcb96OWd~oTlbHjwCifPF2eLICyq-mfi91iM2R2fs~Cj0HfijJkIAhH64AA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt=""
        />
      </div>
      <div className="login-left-container">
        <form onSubmit={handleSubmit}>
          <Link to="/" className="logo-icon">
            <img src={logo} alt="" />
          </Link>
          <h1>Đăng nhập</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div className="login-button">
            <button onClick={submit}>Đăng nhập</button>
            <Link to="/register" className="register-btn">
              Đăng ký
              <FiArrowRight className="icon-right" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
