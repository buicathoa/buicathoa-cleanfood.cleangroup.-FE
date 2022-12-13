/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ProductItemInterface } from "../../interface";

interface ProductItemComponentInterface extends ProductItemInterface {
  renderType: String
}

export const ProductItem = (props: ProductItemComponentInterface) => {
  const { image, title, sub_title, renderType } = props;
  return (

    <div>
      {renderType === 'full' ? <div className="product-item-wrapper">
        <img src={image} alt="" />
        <div className="product-item-content">
          <div className="product-info">
            <div className="title-item">{title}</div>
            <div className="description">
              {sub_title}
            </div>
          </div>
          <div className="min-price">
            ** Giá sẽ phụ thuộc vào calo trên mỗi bữa ăn **
          </div>
        </div>
      </div> :
        <div className="product-slider">
          <div className="product-slider-item-image">
            <img src={image} alt="something" />
          </div>
          <div className="product-slider-item-content">
            <div className="title-price">
              <div className="title">{title}</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <small className="description">{sub_title}</small>
            <p className="note">** Giá sẽ phụ thuộc vào calo trên mỗi bữa ăn **</p>
          </div>
        </div>}
    </div>
  )
};
