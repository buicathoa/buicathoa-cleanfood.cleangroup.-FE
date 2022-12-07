/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'antd'
import React from 'react'
import { listCombo } from '../../interface'
import Link from 'next/link'
import {
  LeftOutlined, RightOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
const Combo = ({ listCombo }: listCombo) => {

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
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {listCombo?.length > 0 && listCombo?.map((item, index) => {
            return (
              <Link href={item?.package_url_generated} key={index}>
                <a>
                  <div className="combo-slider">
                    <div className="combo-slider-item-image">
                      <img src={item?.package_image} alt="something" />
                    </div>
                    <div className="combo-slider-item-content">
                      <div className="title-price">
                        <div className="title">{item?.package_title}</div>
                        {/* <div className="price">750000đ</div> */}
                      </div>
                      <small className="description">{item?.package_description}</small>
                      <p className="note">** Giá sẽ phụ thuộc vào calo trên mỗi bữa ăn **</p>
                    </div>
                  </div>
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
