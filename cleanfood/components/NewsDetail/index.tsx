import { Button, Carousel, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  EnvironmentOutlined,
  SmileFilled,
  StarFilled,
  PhoneFilled,
  WechatOutlined,
} from "@ant-design/icons";
import { NewsDetailInterface, PostNewsInterface, UserInforInterface } from "../../interface";
import { useRouter } from "next/router";
import { routerReducer } from "connected-next-router";

const NewsDetail = (props: NewsDetailInterface) => {
  const router = useRouter();
  const { type } = props;
  const [dataPreview, setDataPreview] = useState<PostNewsInterface>();
  const [listAttr, setListAttr] = useState<Array<attributeInterface>>([]);
  const [userInfor, setUserInfor] = useState<UserInforInterface>();
  const [isShowFullPhone, setIsShowFullPhone] = useState(false);
  interface attributeInterface {
    key: string;
    val: string;
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (type === "preview") {
        const data = localStorage.getItem("post_preview");
        if(data){
          setDataPreview(JSON.parse(data));
          let listDistributesToDisplay: Array<attributeInterface> = [];
          const listAttributes = JSON.parse(data)?.attribute;
          const listFilter = localStorage.getItem("listFilter");
          if(listFilter){
            JSON.parse(listFilter).filter((item, index) => {
              const itemFound = listAttributes?.find((item1) => {
                return item1.name === item.keyEN;
              });
              if (itemFound) {
                listDistributesToDisplay.push({
                  key: item?.keyVI,
                  val: item?.droplist_value_option?.split(",")[itemFound?.value],
                });
              }
            });
          }
          setListAttr(listDistributesToDisplay);
        }
        const userInfo = localStorage.getItem("user_info");
        setUserInfor(JSON.parse(userInfo));
      } else {
        return;
      }
    }
  }, []);

  const handleEditNews = () => {
    router.back();
  };

  const handlePostNews = () => {};

  return (
    <div className="detail-news-wrapper">
      <div className="detail-news-container">
        <Row>
          <Col lg={16} md={16} sm={24}>
            <div className="detail-carousel-news">
              <Carousel>
                {dataPreview?.images && dataPreview?.images?.length > 0 &&
                  dataPreview?.images?.map((item:string, index:number) => {
                    return <img key={index} src={item} alt="detail-news"/>;
                  })}
              </Carousel>
            </div>
            <div className="detail-news-information">
              <h1 className="title">{dataPreview?.title}</h1>
              <span className="price">
                {dataPreview?.price
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                đ
              </span>
              <div className="desc">{dataPreview?.description}</div>
            </div>
            <div className="detail-news-attributes">
              {listAttr.map((item, index) => {
                return (
                  <div className="attributes-item" key={index}>
                    {item?.key}: <span>{item?.val}</span>
                  </div>
                );
              })}
            </div>
            <div className="detail-news-location">
              <div className="detail-news-location-title">Khu vực</div>
              <div className="detail-news-location-desc">
                <EnvironmentOutlined />
                <span className="address">{dataPreview?.full_address}</span>
              </div>
            </div>
            <div className="detail-news-quick-message">
              <div className="detail-news-quick-message-title">
                Hỏi người bán qua chat
              </div>
              <div className="detail-news-quick-message-flex">
                <ul>
                  <li>Điện thoại này còn không?</li>
                  <li>Điện thoại này còn không?</li>
                  <li>Điện thoại này còn không?</li>
                  <li>Điện thoại này còn không?</li>
                  <li>Điện thoại này còn không?</li>
                  <li>Điện thoại này còn không?</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col lg={8} md={8} sm={16} className="profile-detail">
            <div className="detail-news-seller-infor">
              <div className="detail-news-seller-infor-host-top">
                <div className="detail-news-seller-infor-host-top-left">
                  <img
                    src={
                      userInfor?.avatar ||
                      "https://res.cloudinary.com/dmtomrfxk/image/upload/v1661139944/icon/default-avatar_igs48t.jpg"
                    }
                    alt="avatar user"
                    title="avatar"
                  />
                  <div className="host-name">
                    <span>{userInfor?.fullname}</span>
                  </div>
                </div>
                <div className="detail-news-seller-infor-host-top-right">
                  <span>Xem trang</span>
                </div>
              </div>
              <div className="detail-news-seller-infor-host-bottom">
                <div className="host-bottom seller-type">
                  <span>
                    {dataPreview?.seller_type === "personal"
                      ? "Cá nhân"
                      : "Bán chuyên"}
                  </span>
                  <SmileFilled className="icon" />
                </div>
                <div className="host-bottom seller-review">
                  <span>Đánh giá</span>
                  <StarFilled className="icon" />
                </div>
              </div>
              <div className="detail-news-seller-infor-contact">
                <div
                  className="contact-info phone-number-contact"
                  onClick={() => setIsShowFullPhone(true)}
                >
                  {isShowFullPhone ? (
                    <div className="full-phone">{userInfor?.phone_number}</div>
                  ) : (
                    <>
                      <div className="phone-number-contact-left">
                        <PhoneFilled className="icon" />
                        <span className="title">Bấm vào để hiện số</span>
                      </div>
                      <div className="phone-number-contact-right">
                        <span className="title">
                          {userInfor?.phone_number?.replace(
                            userInfor?.phone_number?.slice(-5),
                            "*****"
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="contact-info chat-contact">
                  <WechatOutlined className="icon" />
                  <span className="title">Chat với người bán</span>
                </div>
                {type !== "preview" && (
                  <div className="ads-space">
                    <img
                      src="https://res.cloudinary.com/dmtomrfxk/image/upload/v1661139966/icon/ads_vbws0k.jpg"
                      alt="ads"
                    />
                    <img
                      src="https://res.cloudinary.com/dmtomrfxk/image/upload/v1661139966/icon/ads_vbws0k.jpg"
                      alt="ads"
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <div className="button-post-news">
          <Button className="preview" onClick={() => handleEditNews()}>
            Sửa lại tin
          </Button>
          <Button className="post-news" onClick={() => handlePostNews()}>
            Đăng tin ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
