/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import {
  BankOutlined,
  WechatOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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

const onChange = () => {};

const Carousels:React.FC = () => {
  return (
    <div className="carousel-component">
      <Carousel afterChange={onChange}>
        <div className="carousel-item">
          <img src="https://cdn.chotot.com/admincentre/3gYR13RERgEIzsrIQxfS1mVwwvcmRT24-8fwjHsVOmk/preset:raw/plain/705b0fb7dd4f4c9312dc5eec3c6f5d30-2780305789471981321.jpg"/>
        </div>
        <div className="carousel-item">
          <img src="https://cdn.okxe.vn/banner/title1652758695_o.png"/>
        </div>
      </Carousel>
    </div>
  );
  // return <div></div>
}

export default Carousels;
