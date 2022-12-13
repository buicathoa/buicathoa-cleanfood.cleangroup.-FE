/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ProductItem } from '../../components/ProductItem'
import { apiUrl } from '../../constants';
import { listProduct, ResponseFormatItem } from '../../interface';
import { GeneralMenuActions } from '../../reducer/generalMenuReducer';
import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { ProductActions } from '../../reducer/ProductReducer';
import { apiRequest } from '../../utils/apiRequest';

// export async function getServerSideProps() {
//     const [resCombo] = await Promise.all([
//         apiRequest(
//             apiUrl.comboPackage.getAll,
//             {},
//             'general'
//         )
//     ])
//     const [listProduct] = await Promise.all([
//         resCombo,
//     ])
//     return {
//         props: {
//             listCombo: listCombo.data,
//         }
//     };
// }

const Order = () => {
    const dispatch = useAppDispatch();
    const [categorySelected, setCategorySelected] = useState('meal')

    const fetchAllProduct = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(ProductActions.fetchAllProducts({ param, resolve, reject }));
        });
    };

    const fetchProductByRoute = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(ProductActions.fetchProductByRoute({ param, resolve, reject }));
        });
    };
    
    useEffect(() => {
        fetchAllProduct({product_type: 'combo', hihi: '123'})
        fetchProductByRoute({route: '/order-eat-clean-body-building-xay-dung-co-bap'})
    }, [])

    const listProduct = useAppSelector(state => state.product.listCombo)
    const handleSelectCategory = (cate: string) => {
        setCategorySelected(cate)
    }

    const renderCate = () => {
        if (categorySelected === 'meal') {
            if (listProduct?.length > 0) {
                return (
                    listProduct?.map((item, index) => {
                        return (
                            <Link href={item['url_generated'] || ''} key={index}>
                                <a>
                                    <ProductItem title={item['title']} image={item['image']} sub_title={item['sub_title']} renderType={"full"}/>
                                </a>
                            </Link>
                        )
                    })
                )
            }
            return (
                <>
                    <ProductItem title="Gói Fresh BL" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667975232/blogs/l5rxm0xue7rivkquxplw.jpg" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                    <ProductItem title="Gói Fresh BD" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667975405/blogs/gymoiwqcehnph7mk8mz2.jpg" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                    <ProductItem title="Gói Fresh LD" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667974777/blogs/zo4qqtikgchxyrqtdxtb.jpg" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                    <ProductItem title="Gói Full" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395666/blogs/mvoqp53mxjmwuurofbjx.webp" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                </>
            )
        } else if (categorySelected === 'drink') {
            return (
                <>
                    <ProductItem title="Nước xoài" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665394936/blogs/tzlkjyurx3pfw0t0kc0g.jpg" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                    <ProductItem title="Nước táo" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395215/blogs/g7p6jwrpplt2cfpxcwjy.jpg" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                    <ProductItem title="Nước vải" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395381/blogs/ascpoqs6xc3m3g4fzads.webp" sub_title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"  renderType={"full"}/>
                </>
            )
        }
    }

    return (
        <div className="order-wrapper">
            <div className="order-banner">
                <img src="images/bannerbg.jpg" />
                <div className="order-banner-content">
                    <div className="title">MEAL PLANS</div>
                    <div className="time-active">
                        06.03 - 12.03
                    </div>
                    <div className="button-order">Đặt ngay</div>
                </div>
            </div>
            <div className="order-main-content">
                <h3 className="title">Danh mục</h3>
                <div className="order-selection">
                    <div className={`order-item ${categorySelected === 'meal' ? 'active' : ''}`} onClick={() => handleSelectCategory('meal')}>
                        <img src={`images/icon/${categorySelected === 'meal' ? 'meal-active' : 'meal'}.png`} className={categorySelected === 'meal' ? 'active' : ''} alt="" />
                        <p className="order-item-title">Gói combo</p>
                    </div>
                    <div className={`order-item ${categorySelected === 'drink' ? 'active' : ''}`} onClick={() => handleSelectCategory('drink')}>
                        <img src={`images/icon/${categorySelected === 'drink' ? 'drink-active' : 'drink'}.png`} className={categorySelected === 'drink' ? 'active' : ''} alt="" />
                        <p className="order-item-title">Gói nước</p>
                    </div>
                    <div className={`order-item ${categorySelected === 'snack' ? 'active' : ''}`} onClick={() => handleSelectCategory('snack')}>
                        <img src={`images/icon/${categorySelected === 'snack' ? 'snack-active' : 'snack'}.png`} className={categorySelected === 'snack' ? 'active' : ''} alt="" />
                        <p className="order-item-title">Snacks</p>
                    </div>
                    <div className={`order-item ${categorySelected === 'proccess' ? 'active' : ''}`} onClick={() => handleSelectCategory('proccess')}>
                        <img src={`images/icon/${categorySelected === 'proccess' ? 'proccess-active' : 'proccess'}.png`} alt="" />
                        <p className="order-item-title">Chế biến sẵn</p>
                    </div>
                </div>
                <div className="order-content">
                    {renderCate()}
                </div>
            </div>
        </div>
    )
}

export default Order
