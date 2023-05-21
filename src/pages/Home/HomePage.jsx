import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BannerBackground from "../../Assets/home-banner-background.png";
import AboutBackground from "../../Assets/about-background.png";
import AboutBackgroundImage from "../../Assets/about-background-image.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import ProfilePic from "../../Assets/john-doe-image.png";
import daotao from "../../Assets/daotao.png";
import vanhoa from "../../Assets/vanhoa.jpg";
import csvc from "../../Assets/csvc.jpg";

function HomePage() {
  const workInfoData = [
    {
      image: daotao,
      title: "Giáo dục - Đào tạo",
      text: "Đào tạo kĩ năng",
      text2: "Tư vấn, khởi nghiệp"
    },
    {
      image: vanhoa,
      title: "Văn hóa - Thể thao",
      text: "Âm nhạc dân tộc",
      text2: "Học đường"
    },
    {
      image: csvc,
      title: "Giải trí - Dịch vụ",
      text: "Dịch vụ cơ sở vật chất",
      text2: "Địa điểm tổ chức sự kiện"
    },
  ];
  return (
    <div className="home-container">
      <Header />
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Nhà văn hoá sinh viên thành phố Hồ Chí Minh
            </h1>
            <p className="primary-text">
              The Student Culture House In Ho Chi Minh City
            </p>
            <button className="secondary-button">
              Dịch vụ <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section">
            <img
              src="https://i1-vnexpress.vnecdn.net/2019/10/24/1-1571885998-1571889781.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=01c2nZV1hl4qLPFMRPH0zQ"
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="about" className="about-section-container">
        <div className="about-background-image-container">
          <img src={AboutBackground} alt="" />
        </div>
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading">Giới thiệu</p>
          <h1 className="primary-heading">Bạn Sẽ Được Trải Nghiệm Gì?</h1>
          <p className="primary-text">
            Với sứ mệnh là nơi đến của học sinh, sinh viên ngoài giờ lên lớp,
            Nhà văn hóa Sinh viên TP.HCM là địa điểm có đầy đủ phức hợp vui
            chơi, giải trí, đào tạo, giáo dục, văn hóa và thể thao…
          </p>
          <div className="about-buttons-container">
            <button className="secondary-button">Khám phá</button>
            <button className="watch-video-button">
              <BsFillPlayCircleFill /> Xem video
            </button>
          </div>
        </div>
      </div>
      <div id="contact" className="contact-page-wrapper">
        <p className="primary-subheading">Liên hệ</p>
        <h1 className="primary-heading">Liên hệ với chúng tôi</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="secondary-button">Gửi</button>
        </div>
      </div>
      <div className="work-section-wrapper">
        <div className="work-section-top">
          <p className="primary-subheading">Sự kiện</p>
          <h1 className="primary-heading">Danh mục nổi bật</h1>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data) => (
            <div className="work-section-info" key={data.title}>
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
              <p>{data.text2}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="rating" className="work-section-wrapper">
        <div className="work-section-top">
          <p className="primary-subheading">Đánh giá</p>
          <h1 className="primary-heading">Đánh giá của sinh viên</h1>
        </div>
        <div className="work-section-bottom">
          <div className="work-section-info">
            <img src={ProfilePic} alt="" />
            <p>
              Môi trường giao lưu và gặp gỡ được nhiều bạn bè cũng như mối quan
              hệ mới
            </p>
            <div className="testimonials-stars-container">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <h2>Hoàng Kim Thành</h2>
          </div>
          <div className="work-section-info">
            <img src={ProfilePic} alt="" />
            <p>
              Cảm ơn NVHSV đã mang đến cho mình một không gian thật tuyệt vời
            </p>
            <div className="testimonials-stars-container">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <h2>Lê Đức Thắng</h2>
          </div>
          <div className="work-section-info">
            <img src={ProfilePic} alt="" />
            <p>
              Kiến trúc độc đáo, trẻ trung, hướng tới phát triển sinh viên toàn
              diện
            </p>
            <div className="testimonials-stars-container">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <h2>Bùi Thanh Trà</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
