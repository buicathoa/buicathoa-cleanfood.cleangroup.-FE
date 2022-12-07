/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import { Input, Carousel } from "antd";
import { listCombo, listMenuTableData } from "../../interface";
import Link from 'next/link'
// import './style.scss'
// import './style.scss'
// import { strapiFreshFast, strapiFreshFastImage, strapiFreshFastClient } from 'utils/utils';
// import NewsRelated from '../../../components/NewsRelated';
// import CarouselItem from 'components/Common/CarouselItem';
// import imageSetup from './../../../helpers/loadImageStrapi';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Search } = Input;

const Categories = ({ listCombo }: listCombo) => {
    return (
        <div className="categories-component">
            <div className="categories-container">
                {listCombo?.length > 0 && listCombo.map((item, index) => {
                    return (
                        <Link href={item.package_url_generated} key={index}>
                            <div className="categories-item">
                                <div className="categories-item-image">
                                    <img src={item?.package_image} />
                                </div>
                                <span>{item?.package_title}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Categories;
