/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import { Input, Carousel } from "antd";
import { listMenuTableData, listProduct, ProductItem } from "../../interface";
import Link from 'next/link'
// import './style.scss'
// import './style.scss'
// import { strapiFreshFast, strapiFreshFastImage, strapiFreshFastClient } from 'utils/utils';
// import NewsRelated from '../../../components/NewsRelated';
// import CarouselItem from 'components/Common/CarouselItem';
// import imageSetup from './../../../helpers/loadImageStrapi';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Search } = Input;

const Categories = ({ listProduct }: listProduct) => {
    return (
        <div className="categories-component">
            <div className="categories-container">
                {listProduct?.length > 0 && listProduct.map((item: ProductItem, index:number) => {
                    return (
                        <Link href={item.url_generated || ''} key={index}>
                            <div className="categories-item">
                                <div className="categories-item-image">
                                    <img src={item?.image} />
                                </div>
                                <span>{item?.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Categories;
