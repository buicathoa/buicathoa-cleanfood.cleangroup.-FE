/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
    StarOutlined, CarOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons';
import { Divider, Row, Select, Col, Carousel } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';

import { ProductItem } from '../components/ProductItem';
import { openSuccess } from '../components/NotificationStatus';

import { useAppDispatch } from '../reducer/hook';
import { ProductActions } from '../reducer/ProductReducer';
import { CartActions } from '../reducer/cartReducer';
import { AppActions } from '../reducer/appReducer';

import { apiUrl, optionsCalories, optionsMealPlans, optionsMealPlansSession } from '../constants';

import { ProductItemInterface, ResponseFormatItem } from '../interface';

import { apiRequest } from '../utils/apiRequest';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const [listProduct] = await Promise.all([
        apiRequest(
            apiUrl.product.getAll,
            { product_type: 'combo' },
            'general'
        )
    ])
    if ((context?.query?.page as Array<string>).length > 1 || listProduct?.data?.filter((item: ProductItemInterface) => item.url_generated === `/${(context?.query?.page || [])[0]}`).length === 0) {
        return {
            notFound: true
        }
    } else {
        const productItem = await apiRequest(
            apiUrl.product.getByRoute,
            { route: `/${(context?.query?.page || [])[0]}` },
            'general'
        )
        return {
            props: {
                productDetail: productItem.data || undefined,
                listProduct: listProduct?.data || undefined
            }
        };
    }
}

interface Props {
    productDetail: ProductItemInterface | undefined,
    listProduct: ProductItemInterface[]
}

const SEOProduct = ({ productDetail, listProduct }: Props) => {
    const { Option } = Select
    const dispatch = useAppDispatch();
    const router = useRouter()

    const fetchMoneyCost = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(ProductActions.fetchMoneyCost({ param, resolve, reject }));
        });
    };

    const addToCart = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(CartActions.addToCart({ param, resolve, reject }));
        });
    };

    const fetchAllCart = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
          dispatch(CartActions.fetchAllCart({ param, resolve, reject }));
        });
      };

    const [caloriesSeleceted, setCaloriesSelected] = useState<number>()
    const [sessionSelected, setSessionSelected] = useState<number>()
    const [mealplanSelected, setMealplanSelected] = useState<number>()
    const [totalPrice, setTotalPrice] = useState<number>()
    const [originalPrice, setOriginalPrice] = useState<number>()

    const handleChangeCalories = (event: number) => {
        setCaloriesSelected(event)
        if(event === 0) {
            router.push('/tai-khoan/calories')
        } else {
            if (!mealplanSelected || !sessionSelected) {
                setCaloriesSelected(event)
            } else {
                const params = { calories_id: event, mealplans_id: mealplanSelected, mealplans_session_id: sessionSelected }
                fetchMoneyCost(params).then(res => {
                    setTotalPrice(res?.data?.total_price)
                    setOriginalPrice(res?.data?.original_price)
                })
            }
        }
    }

    const handleChangeMealPlan = (event: number) => {
        setMealplanSelected(event)
        if (!caloriesSeleceted || !sessionSelected) {
            setMealplanSelected(event)
        } else {
            const params = { mealplans_id: event, calories_id: caloriesSeleceted, mealplans_session_id: sessionSelected }
            fetchMoneyCost(params).then((res) => {
                setTotalPrice(res?.data?.total_price)
                setOriginalPrice(res?.data?.original_price)
            })
        }
    }

    const handleChangeSession = (event: number) => {
        setSessionSelected(event)
        if (!caloriesSeleceted || !mealplanSelected) {
            setSessionSelected(event)
        } else {
            const params = { mealplans_session_id: event, calories_id: caloriesSeleceted, mealplans_id: mealplanSelected }
            dispatch(AppActions.openLoading(true))
            fetchMoneyCost(params).then(res => {
                setTotalPrice(res?.data?.total_price)
                setOriginalPrice(res?.data?.original_price)
            })
        }
    }

    const handleAddToCart = () => {
        const isLogin = Cookies.get('cleanfood')
        if(!isLogin) {
            router.push('/tai-khoan/dang-nhap')
        } else {
            dispatch(AppActions.openLoading(true))
            const params = {
                product_id: productDetail?._id,
                quantity: 1,
                calories_id: caloriesSeleceted,
                session_id: sessionSelected,
                mealplans_id: mealplanSelected,
                price: totalPrice
            }
            addToCart(params).then(() => {
                openSuccess('Thêm sản phẩm vào giỏ hàng thành công')
                fetchAllCart({})
            })
        }
    }

    return (
        <div className="detail-product-wrapper">
            <div className="detail-product-container">
                <Row>
                    <Col span={10}>
                        <img src={productDetail?.image} alt="" />
                        <div className="calories-selected">
                            <div className="droplist-item">
                                <label>Calories hằng ngày</label>
                                <Select placeholder="Calories hằng ngày" value={caloriesSeleceted || undefined} onChange={handleChangeCalories}>
                                    {optionsCalories.map((item, index) => {
                                        return (
                                            <Option key={index} value={item?.value}>
                                                {item?.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="droplist-item">
                                <label>Chọn gói ăn</label>
                                <Select placeholder="Chọn gói ăn" value={mealplanSelected || undefined} onChange={handleChangeMealPlan}>
                                    {optionsMealPlans.map((item, index) => {
                                        return (
                                            <Option key={index} value={item?.value}>
                                                {item?.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                            <div className="droplist-item">
                                <label>Chọn buổi ăn</label>
                                <Select placeholder="Chọn buổi ăn" value={sessionSelected || undefined} onChange={handleChangeSession}>
                                    {optionsMealPlansSession.map((item, index) => {
                                        return (
                                            <Option key={index} value={item?.value}>
                                                {item?.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col span={14}>
                        <div className="product-content">
                            <div className="product-title">
                                {productDetail?.title}
                            </div>
                            <div className="note">
                                *** Lưu ý: Đơn hàng sẽ được xác nhận và giao sau 2 ngày kể từ ngày đặt hàng
                            </div>
                            <div className="description">
                                <div className="food-detail-info">
                                    Food Details
                                </div>
                                <div className="food-detail-content">
                                    {productDetail?.description}
                                </div>
                            </div>
                            <div className="product-sub-content">
                                <span className="rating"><StarOutlined /><span className="rating-number">4.7 </span><span className="total-review">( 58 Reviews )</span></span>
                                <span className="delivery-icon"><CarOutlined /><span className="delivery-info">Giá ship sẽ tùy vào khu vực</span></span>
                            </div>
                            <Divider orientation="center">Giá</Divider>
                            {totalPrice && <div className="price-wrapper">
                                <p className='price'>{totalPrice?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                {originalPrice !== 0 && <p className="original-price">{originalPrice?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>}
                            </div>}
                            {!totalPrice && <div className="price-none">Giá sản phẩm sẽ dựa vào số lượng calo và gói ăn</div>}
                        </div>
                        <div className="buy-actions">
                            <div className="add-to-cart" onClick={() => handleAddToCart()}>add to cart</div>
                            <div className="buy-now">buy now</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="other-product">
                <div className="combo">
                    <h3 className="other-product-title">Gói Combo Khác</h3>
                    <Carousel
                        slidesToShow={2}
                        // autoplay={true}
                        // dots={false}
                        arrows
                        prevArrow={<LeftOutlined />}
                        nextArrow={<RightOutlined />}
                    >
                        {listProduct?.length > 0 && listProduct?.map((item, index) => {
                            if (item?._id !== productDetail?._id) {
                                return (
                                    <Link href={item['url_generated'] || ''} key={index}>
                                        <a>
                                            <ProductItem title={item['title']} image={item['image']} sub_title={item['sub_title']} renderType={"spiece"} />
                                        </a>
                                    </Link>
                                )
                            }
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default SEOProduct
