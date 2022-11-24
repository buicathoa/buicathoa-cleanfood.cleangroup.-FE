import { Carousel } from 'antd'
import React from 'react'

const Combo = () => {
  return (
    <div className="combo-wrapper">
      <div className="combo-container">
      <div className="combo-content-header">
        <div className="combo-title">SẢN PHẨM TIÊU BIỂU</div>
        <div className="combo-content">Fresh Meals cung cấp nhiều gói ăn và thực phẩm ăn kèm đa dạng,
          phù hợp với hầu hết nhu cầu của bạn</div>
      </div>
      <Carousel
        slidesToShow={2}
        centerMode={true}
        // asNavFor={this.state.media}
        draggable={true}
        // ref={(carousel) => (this.nav = carousel)}
        swipeToSlide={true}
        touchThreshold={50}
        focusOnSelect={true}
        dots={false}
      >
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/bd.jpg" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <div className="title">Gói FULL</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/bl.jpg" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <span className="title">Gói FULL</span>
              {/* <span className="price">750000đ</span> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/ld.png" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <div className="title">Gói BL</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/lowcarb.jpg" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <div className="title">Gói BD</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/bd.jpg" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <div className="title">Gói LD</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
        <div className="combo-slider">
          <div className="combo-slider-item-image">
            <img src="images/ld.png" />
          </div>
          <div className="combo-slider-item-content">
            <div className="title-price">
              <div className="title">Gói Vegetarian</div>
              {/* <div className="price">750000đ</div> */}
            </div>
            <div className="description">Ngon lắm bạn ơi, không ăn phí của giời</div>
            <p className="note">Giá sẽ phụ thuộc vào số calories cho bữa ăn bạn chọn</p>
          </div>
        </div>
      </Carousel>
      </div>
    </div>
  )
}

export default Combo
