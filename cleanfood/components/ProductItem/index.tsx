/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ProductItemInterface } from "../../interface";

export const ProductItem = (props: ProductItemInterface) => {
  const { image, title, content } = props;
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
        <div className="min-price">
          ** Giá sẽ phụ thuộc vào calo trên mỗi bữa ăn **
        </div>
      </div>
    </div>
  )
};
