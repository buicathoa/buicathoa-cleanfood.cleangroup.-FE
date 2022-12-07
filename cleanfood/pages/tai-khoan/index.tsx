/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  BankOutlined, SmileOutlined, WalletOutlined,
  EnvironmentOutlined, StarOutlined, HomeOutlined, SolutionOutlined, MessageOutlined
} from '@ant-design/icons';
const Account = () => {
  return (
    <div className="account-wrapper">
      <div className="account-header">
        <div className="account-header-avatar">
          <img src="images/hazard.jpg" alt="" />
        </div>
        <div className="account-header-info">
          <div className="account-header-name">Bùi Cát Hòa</div>
          <div className="account-header-sub-info">Thành viên mới</div>
        </div>
      </div>
      <div className="account-content">
        <div className="account-category">
          <h3>Hoạt động cá nhân</h3>
          <ul>
            <li><BankOutlined />Lịch sử ăn sạch</li>
            <li><SmileOutlined />Thông tin tài khoản</li>
            <li><WalletOutlined />Ví</li>
            <li><EnvironmentOutlined />Địa chỉ giao hàng</li>
            <li><MessageOutlined />Hộp thư của tôi</li>
          </ul>
        </div>
        <div className="account-category">
          <h3>Thông tin hỗ trợ</h3>
          <ul>
            <li><StarOutlined />Sự kiện / khuyến mãi</li>
            <li><HomeOutlined />Trung tâm trợ giúp</li>
            <li><SolutionOutlined />Chính sách</li>
          </ul>
        </div>
        <div className="account-category">
          <h3>Tiện ích cá nhân</h3>
          <ul>
            <li><BankOutlined />Theo dõi sức khỏe</li>
          </ul>
        </div>
        <div className="account-category">
          <h3>Cộng đồng ăn sạch</h3>
          <img src="images/facebook.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Account
