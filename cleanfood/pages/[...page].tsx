import { Divider, Select } from 'antd';
import React from 'react'
import { apiUrl } from '../constants';
import { ComboItem } from '../interface';
import { apiRequest } from '../utils/apiRequest';

export async function getServerSideProps(context) {

    const listCombo = await apiRequest(
        apiUrl.comboPackage.getAll,
        {},
        'general'
      )
      const data = listCombo

    if(context?.query?.page.length > 1 || listCombo?.data?.filter((item:ComboItem) => item.package_url_generated === `/${context?.query?.page[0]}`).length === 0){
        return {
            notFound: true
        }
    } else {
        return {
            props: {
              context: context?.query?.page[0],
            }
        }; 
    }
}

const SEOProduct = ({context}) => {
    console.log('context', context)
    return (
        <div className="detail-product-wrapper">
            <div className="detail-product-container">
                <img src="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667975232/blogs/l5rxm0xue7rivkquxplw.jpg" alt="" />
                <div className="product-content">
                    <div className="product-title">
                        Gói Fresh Full
                    </div>
                    <div className="product-sub-content">
                        <span className="rating">⭐<span className="rating-number">4.7</span><span className="total-review">(58 Reviews)</span></span>
                        <span className="delivery-icon">🚚<span className="delivery-info">Giá ship sẽ tùy vào khu vực</span></span>
                    </div>
                    <div className="note">
                        *** Lưu ý: Giá trên là giá cho Thực Đơn Tiêu Chuẩn 5 ngày từ Thứ 2 đến Thứ 6. Nếu bạn đặt hàng vào hôm nay (Thứ 2), đơn hàng của bạn sẽ được giao từ Thứ 4(23.11). Giá Gói Ăn bạn phải trả là 450,000đ cho 3 ngày (Thứ 4(23.11) tới Thứ 6)
                    </div>
                    <div className="description">
                        <div className="food-detail-info">
                            Food Details
                        </div>
                        Gói 3 bữa SÁNG - TRƯA - TỐI <br /><br />

                        - Sử dụng thực đơn 3 bữa/ngày tại trang fitfood.vn/menu.<br /><br />

                        - Giao 03 phần ăn tận nơi mỗi ngày, từ thứ 2 đến thứ 6.<br /><br />

                        - Calories dao động từ 1300 - 1500 Kcal phù hợp với thể trạng người Châu Á<br /><br />

                        - Kèm tinh bột phức, ít đường, đảm bảo ko bột ngọt, nhiều rau củ và chất đạm<br /><br />

                        * Thích hợp cho người ăn kiêng bận rộn hoặc theo đuổi chế độ ăn lâu dài
                    </div>
                    <Divider orientation="center">Chọn số lượng calories cho từng gói</Divider>
                    <Select
                        showSearch
                        placeholder="Chọn số lượng calories"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'undefined',
                                label: 'Chưa xác định',
                            },
                            {
                                value: 60,
                                label: '1100 kcal',
                            },
                            {
                                value: 65,
                                label: '1500 kcal',
                            },
                            {
                                value: 70,
                                label: '2000 kcal',
                            },
                            {
                                value: 75,
                                label: '2500 kcal',
                            },
                            {
                                value: 80,
                                label: '3000 kcal',
                            },
                        ]}
                    />
                    <Divider orientation="center">Giá</Divider>
                    <p className='price'>2,100,000 VNĐ</p>
                </div>
                <div className="buy-actions">
                        <div className="add-to-cart">add to cart</div>
                        <div className="buy-now">buy now</div>
                </div>
            </div>
        </div>
    )
}

export default SEOProduct
