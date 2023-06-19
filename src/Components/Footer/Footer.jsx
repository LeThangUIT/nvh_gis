import React from "react";
import logo from "../../Assets/logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Liên kệ</span>
          <span>Góp ý</span>
          <span>Fanpage</span>
          <span>Youtube</span>
          <span>Bản đồ</span>
        </div>
        <div className="footer-section-columns">
          <span>028 3835 1118 - 1109</span>
          <span>vanphong@nhavanhoasinhvien.vn</span>
          <span>Nhà Văn hóa Sinh viên TP. Hồ Chí Minh.</span>
          <span>@nhavanhoasinhvientp.hochim251</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
