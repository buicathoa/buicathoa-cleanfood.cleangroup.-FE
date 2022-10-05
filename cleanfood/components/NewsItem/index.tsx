import React from "react";
import Link from "next/link";
import { Input, Carousel, Row, Col } from "antd";
import { NewsItemInterface } from "../../interface";
import { SmileOutlined, HeartOutlined } from "@ant-design/icons";

export const NewsItem = (props: NewsItemInterface) => {
  const { type, pageType } = props;
  return type === "grid" ? (
    <Col xl={pageType === "main" ? 6 : 8} md={8} sm={12} xs={24}>
      <div className="latest-news-item">
        <Link href="/foxfood/nha-cung-cap/[id]" as={`/foxfood/nha-cung-cap/`}>
          <a>
            <img src="images/product.jpg" />
            <div className="latest-news-item-description">
              <h3 className="title">Samsung S21 Ultra 5G 12/256GB Fullbox</h3>
              <h4 className="price">7 triệu / tháng</h4>
              <span className="location">Khánh hòa </span>
            </div>
          </a>
        </Link>
      </div>
    </Col>
  ) : (
    <div className="list-news-wrapper">
      <div className="list-news-item">
        <div className="list-news-left">
          <div className="list-news-image">
            <img src="images/product.jpg" />
          </div>
          <div className="list-news-content">
            <div className="list-news-content-top">
              <h1>Cần bán máy tính bảng Huawei MatePad 11</h1>
              <span className="price">11.000.000 đ</span>
            </div>
            <div className="list-news-content-bottom">
              <div className="name">
                <SmileOutlined />
                <span>Quang Nguyen</span>
              </div>
              <div className="tracking-time">
                <span>Quang Nguyen</span>
              </div>
              <div className="tracking-location">
                <span>Hồ chí minh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="list-news-right">
          <HeartOutlined />
        </div>
      </div>
    </div>
  );
};
