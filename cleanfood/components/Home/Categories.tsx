/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import { Input, Carousel } from "antd";

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

const Categories: React.FC = () => {
    return (
        <div className="categories-component">
            <div className="categories-container">
                    <div className="categories-item">
                        <div className="categories-item-image">
                            <img src='images/cate1.jpg' />
                        </div>
                        <span>Combo sáng-trưa</span>
                    </div>
                    <div className="categories-item">
                        <div className="categories-item-image">
                            <img src='images/cate2.jpg' />
                        </div>
                        <span>Combo sáng-tối</span>
                    </div>
                    <div className="categories-item">
                        <div className="categories-item-image">
                            <img src='images/cate1.jpg' />
                        </div>
                        <span>Combo trưa tối</span>
                    </div>
                    <div className="categories-item">
                        <div className="categories-item-image">
                            <img src='images/cate2.jpg' />
                        </div>
                        <span>Combo full</span>
                    </div>
                    <div className="categories-item">
                        <div className="categories-item-image">
                            <img src='images/cate1.jpg' />
                        </div>
                        <span>Combo chay</span>
                    </div>
                </div>
            </div>
    );
    // return <div></div>
}

export default Categories;
