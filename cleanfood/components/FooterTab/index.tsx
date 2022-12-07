import React, { Fragment, useEffect, useState } from "react";
import { HomeFilled, SnippetsFilled, SmileFilled, BookFilled, ShopFilled } from "@ant-design/icons";
import { Input, Carousel, Row, Col } from "antd";
import { useRouter } from "next/router";

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

const Footer:React.FC = () => {
  const router = useRouter();
  const [pathname, setPathname] = useState('')
  useEffect(() => {
    setPathname(router?.pathname)
    console.log('pathname', router.pathname)
  }, [router])

  const handleChangePage = (path: string) => {
    console.log('handleChangePage', typeof path)
    router.push(path)
  }

  return (
    <footer className="footer-tab-component">
      <div className={`footer-item ${pathname == '/' ? 'active' : ''}`} onClick={() => handleChangePage("/")}>
        <HomeFilled />
        <span className="menu-desc">Trang chủ</span>
      </div>
      <div className={`footer-item ${pathname == '/thuc-don' ? 'active' : ''}`} onClick={() => handleChangePage("/thuc-don")}>
        <SnippetsFilled />
        <span className="menu-desc">Thực đơn</span>
      </div>
      {/* <div className="footer-item">
        <BookFilled />
        <span className="menu-desc">Đăng Blog</span>
      </div> */}
      <div className={`footer-item ${pathname.indexOf("/dat-hang") == 0 ? 'active' : ''}`} onClick={() => handleChangePage("/dat-hang")}>
        <ShopFilled />
        <span className="menu-desc">Đặt Hàng</span>
      </div>
      <div className={`footer-item ${pathname.indexOf("/tai-khoan") == 0 ? 'active' : ''}`} onClick={() => handleChangePage("/tai-khoan")}>
        <SmileFilled />
        <span className="menu-desc">Tài khoản</span>
      </div>
      {/* <div className="footer-container">
        <div className="footer-top">
          <Row>
            <Col xl={8} md={8} sm={12} xs={24} className="footer-top-item">
              <h3 className="title">HỖ TRỢ KHÁCH HÀNG</h3>
              <ul className="list-contact">
                <li>Trung tâm trợ giúp</li>
                <li>An toàn mua bán</li>
                <li>Quy định cần biết</li>
                <li>Liên hệ hỗ trợ</li>
              </ul>
            </Col>
            <Col xl={8} md={8} sm={12} xs={24} className="footer-top-item">
              <h3 className="title">HỖ TRỢ KHÁCH HÀNG</h3>
              <ul className="list-contact">
                <li>Giới thiệu</li>
                <li>Tuyển dụng</li>
                <li>Truyền thông</li>
                <li>Blog</li>
              </ul>
            </Col>
            <Col xl={8} md={8} sm={12} xs={24} className="footer-top-item">
              <h3 className="title">Liên kết</h3>
              <img src="https://static.chotot.com/storage/default/facebook.svg" />
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">
          <span>
            CÔNG TY TNHH CHỢ TỐT - Địa chỉ: Phòng 1808, Tầng 18, Mê Linh Point
            Tower, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh Giấy
            chứng nhận đăng ký doanh nghiệp số 0312120782 do Sở Kế Hoạch và Đầu
            Tư TPHCM cấp ngày 11/01/2013 Email: trogiup@chotot.vn - Tổng đài
            CSKH: 19003003 (1.000đ/phút)
          </span>
        </div>
      </div> */}
    </footer>
  );
  // return <div></div>
}

export default Footer;
