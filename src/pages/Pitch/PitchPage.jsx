import React from "react";
import "./PitchPage.css";
import pitch_1 from "../../Assets/pitch_1.png";
import { Link } from "react-router-dom";

export default function PitchPage() {
  return (
    <div className="pitch-container">
      <div className="pitch-item">
        <div className="pitch-container-left">
          <img src={pitch_1} alt="" />
        </div>
        <div className="pitch-container-right">
          <h3 className="pitch-title">
            Sân bóng đá số 1 Nhà Văn hoá Sinh viên
          </h3>
          <div className="pitch-address">
            <span>Địa chỉ: </span>
            <p>A2 Đ. Vào Đại Học Quốc Gia, Đông Hoà, Dĩ An, Bình Dương</p>
          </div>
          <div className="pitch-price">
            <span>Giá tham khảo:</span>
            <p>200,000đ - 300,000đ</p>
          </div>
          <div className="pitch-button">
            <Link className="pitch-detail-btn">Xem chi tiết</Link>
            <Link className="pitch-booking-btn">Đặt sân</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
