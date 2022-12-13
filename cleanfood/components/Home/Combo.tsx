/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'antd'
import React from 'react'
import { listProduct, ProductItemInterface } from '../../interface'
import Link from 'next/link'
import {
  LeftOutlined, RightOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
import { ProductItem } from '../ProductItem';
const Combo = ({ listProduct }: listProduct) => {

  return (
    <div className="combo-wrapper">
      <div className="combo-container">
        <div className="combo-content-header">
          <div className="combo-title">SẢN PHẨM TIÊU BIỂU</div>
          <div className="combo-content">Fresh Meals cung cấp nhiều gói ăn và thực phẩm ăn kèm đa dạng,
            phù hợp với hầu hết nhu cầu của bạn</div>
        </div>
        <Carousel
          slidesToShow={2}
          // autoplay={true}
          // dots={false}
          arrows={true}
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {listProduct?.length > 0 && listProduct?.map((item:ProductItemInterface, index:number) => {
            return (
              <Link href={item?.url_generated || ''} key={index}>
                <a>
                  <ProductItem title={item?.title} image={item?.image} sub_title={item?.sub_title} renderType={"spiece"}/>
                </a>
              </Link>
            )
          })}
        </Carousel>
        <span className="explore-menus">Xem thực đơn</span>
      </div>
    </div>
  )
}

export default Combo
