/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Input, Carousel, Row, Col } from "antd";
import { NewsItemInterface } from "../../interface";
import { SmileOutlined, HeartOutlined } from "@ant-design/icons";

export const ProductItem = (props: NewsItemInterface) => {
  const { image, title, content, minimum_price } = props;
  return (
    <div className="product-item-wrapper">
      <img src={image} alt="" />
      <div className="product-item-content">
        <div className="product-info">
          <div className="title-item">{title}</div>
          <div className="description">
            {content}
          </div>
        </div>
        <div className="min-price">{minimum_price}</div>
      </div>
    </div>
  )
};
