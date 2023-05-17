/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../../Assets/Logo.svg";


const Header = () => {
  return (
    <nav >
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a href="">Trang chủ</a>
        <a href="">Giới thiệu</a>
        <a href="">Đánh giá</a>
        <a href="">Liên hệ</a>
        <button className="primary-button">Đăng nhập</button>
      </div>
    </nav>
  );
};

export default Header;
