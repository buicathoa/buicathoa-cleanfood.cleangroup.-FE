import React, { Fragment, useEffect, useState } from "react";
import {
  BankOutlined,
  WechatOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined
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
        <div className="header-top">
          <div className="header-top-logo">
            <span>Do Cu</span>
          </div>
          <div className="header-top-attributes">
            <div className="header-top-attributes-item">
              <div>
                <BankOutlined />
                <span className="header-menu">Trang chủ</span>
              </div>
            </div>
            <div className="header-top-attributes-item">
              <div>
                <WechatOutlined />
                <span className="header-menu">Chat</span>
              </div>
            </div>
            <div className="header-top-attributes-item">
              <div>
                <BellOutlined />
                <span className="header-menu">Thông báo</span>
              </div>
            </div>
            <div className="header-top-attributes-item">
              <div>
                <UserOutlined />
                <span className="header-menu">Tài khoản</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-search">
            <Input
              className="input-search-global"
              allowClear
              placeholder="Tìm kiếm trên chợ cũ"
            //   onChange={(event) => {
            //     setsearchValue(event?.target?.value);
            //     setsearchTerm(event?.target?.value);
            //   }}
              prefix={<SearchOutlined />}
            //   onKeyDown={onKeyDown}
            />
          </div>
          <div className="header-bottom-post">
            <Button type="primary">
              Đăng tin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
  // return <div></div>
}

export default Header;
