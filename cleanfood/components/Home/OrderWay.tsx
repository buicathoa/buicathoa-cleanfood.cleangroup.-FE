/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import {
  BankOutlined,
  WechatOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Row, Col, Tooltip  } from "antd";
import Link from "next/link";
import { NewsItem } from "../ProductItem";

// import './style.scss'
// import './style.scss'
// import { strapiFreshFast, strapiFreshFastImage, strapiFreshFastClient } from 'utils/utils';
// import NewsRelated from '../../../components/NewsRelated';
// import CarouselItem from 'components/Common/CarouselItem';
// import imageSetup from './../../../helpers/loadImageStrapi';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Search } = Input;
// export async function getServerSideProps(context) {
//     const [resJob] = await Promise.all([
//         fetch(`${strapiFreshFast}/trang-dai-ly-ctv`),
//     ])
//     const [job] = await Promise.all([
//         resJob.json(),
//     ])
//     return {
//         props: {
//             job,
//         }
//     };
// }

const onChange = () => { };

const OrderWay: React.FC = () => {
  return (
    <div className="order-way-component">
      <div className="order-way-container">
        <h3 className="title">CÁCH ĐẶT HÀNG</h3>
        <Row>
          <Col span={12} className="order-way">
            <div className="order-way-item-container">
              <div className="order-way-image">
                <img src="images/pick.png" />
              </div>
              <div className="order-way-content">
                <Tooltip placement="topRight" title="Chọn Gói Ăn">
                <div className="title">Chọn Gói Ăn</div>
                </Tooltip>
                <Tooltip placement="topRight" title="Chọn thời gian gói ăn theo nhu cầu của bạn">
                <div className="content">Chọn thời gian gói ăn theo nhu cầu của bạn 
                và điền đầy đủ thông tin</div>
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col span={12} className="order-way">
            <div className="order-way-item-container">
              <div className="order-way-image">
                <img src="images/cooking.png" />
              </div>
              <div className="order-way-content">
                <div className="title">Fresh Meals nấu</div>
                <div className="content">Với tiêu chuẩn đầu bếp cao, chúng tôi chọn những nguyên liệu
                tươi và tốt nhất để chế biến</div>
              </div>
            </div>
          </Col>
          <Col span={12} className="order-way">
            <div className="order-way-item-container">
              <div className="order-way-image">
                <img src="images/delivery.png" />
              </div>
              <div className="order-way-content">
                <div className="title">Giao Hàng</div>
                <div className="content">Chúng tôi sẽ giao tận nơi theo đúng lịch trình được cấu hình
                tùy chọn của bạn theo từng ngày</div>
              </div>
            </div>
          </Col>
          <Col span={12} className="order-way">
            <div className="order-way-item-container">
              <div className="order-way-image">
                <img src="images/enjoy.png" />
              </div>
              <div className="order-way-content">
                <div className="title">Thưởng thức</div>
                <div className="content">Hông cần làm gì hết chơn hết chọi á, thưởng thức hoy nè ^^!</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
  // return <div></div>
};

export default OrderWay;
