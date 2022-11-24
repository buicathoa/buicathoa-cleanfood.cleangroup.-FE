import React, { Fragment, useEffect, useState } from "react";
import {
  MessageFilled,
  ShoppingFilled,
  BellFilled
} from "@ant-design/icons";
import { Input, Button } from "antd";
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

const Header:React.FC = () => {
  return (
    <header className="header-component">
      <div className="header-container">
        <div className="header-content">
          <div className="personal-contact">
            <MessageFilled/>
          </div>
          <span className="header-logo">
            Fresh Meals
          </span>
          <div className="header-personal">
            <BellFilled />
            {/* <span className="header-account">Đăng nhập</span> */}
            <ShoppingFilled />
          </div>
        </div>
      </div>
    </header>
  );
  // return <div></div>
}

export default Header;
