/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { ProductItem } from '../../components/ProductItem'

const Order = () => {

    const [categorySelected, setCategorySelected] = useState('meal')

    const handleSelectCategory = (cate: string) => {
        setCategorySelected(cate)
    }

    const renderCate = () => {
        if (categorySelected === 'meal') {
            return (
                <>
                    <ProductItem title="Gói Fresh BL" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667975232/blogs/l5rxm0xue7rivkquxplw.jpg" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                    <ProductItem title="Gói Fresh BD" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667975405/blogs/gymoiwqcehnph7mk8mz2.jpg" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                    <ProductItem title="Gói Fresh LD" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1667974777/blogs/zo4qqtikgchxyrqtdxtb.jpg" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                    <ProductItem title="Gói Full" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395666/blogs/mvoqp53mxjmwuurofbjx.webp" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                </>
            )
        } else if (categorySelected === 'drink') {
            return (
                <>
                    <ProductItem title="Nước xoài" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665394936/blogs/tzlkjyurx3pfw0t0kc0g.jpg" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                    <ProductItem title="Nước táo" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395215/blogs/g7p6jwrpplt2cfpxcwjy.jpg" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
                    <ProductItem title="Nước vải" image="https://res.cloudinary.com/dd8brzr2h/image/upload/v1665395381/blogs/ascpoqs6xc3m3g4fzads.webp" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum" minimum_price="30000" />
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
                    <div className="time-active">21.11 - 25.11</div>
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
