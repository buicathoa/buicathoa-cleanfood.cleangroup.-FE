/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from "react";
import {
  BankOutlined,
  WechatOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Carousel, Row, Col } from "antd";
import Link from "next/link";
import { NewsItem } from "../NewsItem";

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

const LatestNews: React.FC = () => {
  return (
    <div className="latest-news-component">
      <div className="latest-news-container">
        <h3 className="title">Tin đăng mới nhất</h3>
        <Row>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
          <NewsItem pageType={"main"} type={"grid"}/>
        </Row>
      </div>
      <div className="see-more">
        <span> Xem thêm </span>
      </div>
    </div>
  );
  // return <div></div>
};

export default LatestNews;
