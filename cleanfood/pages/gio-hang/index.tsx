/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
    MinusOutlined, PlusOutlined, DeleteOutlined, UserOutlined,
    EnvironmentOutlined,
    LoadingOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, RadioChangeEvent, Row, Select, Steps } from 'antd';
import { useAppDispatch } from '../../reducer/hook';
import { CartItem, ResponseFormatItem } from '../../interface';
import { CartActions } from '../../reducer/cartReducer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppActions } from '../../reducer/appReducer';
import ModalConfirm from '../../components/ModalConfirm';
const Cart: React.FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const listPaymentMethods = [{ name: 'Momo', image: 'images/momo.png' }, { name: 'COD', image: 'images/cod.png' }]
    const [value, setValue] = useState(0)
    const listCart = useSelector((state) => state.cart.listCart)
    const [currentStep, setCurrentStep] = useState(0);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [cartSelected, setCartSelected] = useState<CartItem>({})
    const [paymentSelected, setPaymentSelected] = useState('Momo')

    const { Step } = Steps;
    const validateMessages = {
        required: 'required'
    }

    const validateSchema = {
        oldpassword: [
            {
                required: true
            }
        ]
    }
    //Chung
    const handleMoveToCheckoutPage = () => {
        setCurrentStep(currentStep + 1)
    }

    const handleMoveToNextPage = () => {
        setCurrentStep(currentStep + 1)
    }

    const handleBackToPreviousPage = () => {
        if (currentStep === 1 || currentStep === 2) {
            setCurrentStep(currentStep - 1)
        }
    }

    // ======================================== Giỏ Hàng ====================================//

    const updateCartByUser = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(CartActions.updateCartByUser({ param, resolve, reject }));
        });
    };

    const deleteCartItem = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(CartActions.deleteCartItem({ param, resolve, reject }));
        });
    };

    useEffect(() => {
        if (!Cookies.get('cleanfood')) {
            router.push('/tai-khoan/dang-nhap')
        }
    }, [])

    const handleUpdateQuantity = (number: number, item: any) => {
        const params = { cart_id: item?.cart_id, inc_quantity: number }
        updateCartByUser(params)
    }

    const handleUpdateQuantityInput = (event: number) => {
        setValue(event)
    }

    const handleBlurUpdateQuantity = (item: CartItem) => {
        const params = { cart_id: item?.cart_id, quantity: value }
        updateCartByUser(params).then(() => {
            setValue(0)
        })
    }

    const handleDeleteCartItem = (item: CartItem) => {
        setCartSelected(item)
        setIsOpenConfirmModal(true)

    }

    const handleModalDelete = () => {
        dispatch(AppActions.startLoading({}))
        const payload = { cart_id: cartSelected?.cart_id }
        deleteCartItem(payload).then(() => {
            setIsOpenConfirmModal(false)
            setCartSelected({})
        })
    }

    const handleModalCancel = () => {
        setIsOpenConfirmModal(false)
        setCartSelected({})
    }
    // ======================================== Giỏ Hàng ====================================//

    // ======================================== Payment ====================================//

    const onChangePaymentMethods = (e: RadioChangeEvent) => {
        setPaymentSelected(e.target.value)
    }

    // ======================================== Payment ====================================//
    return (
        // ======================================== Giỏ Hàng ====================================//
        <div className="cart-wrapper">
            <div className="cart-container">
                <div className="cart-header">
                    <Steps direction="horizontal" current={currentStep} responsive={false} labelPlacement="vertical">
                        <Step title={'Cart'} description={
                            currentStep > 0
                                ? 'Hoàn thành'
                                : currentStep === 0 && 'Đang tiến hành'
                        }
                        />
                        <Step title={'Contact'} description={
                            currentStep > 1 && currentStep < 4
                                ? 'Hoàn thành'
                                : currentStep === 0
                                    ? 'Đang chờ'
                                    : currentStep === 1 && 'Đang tiến hành'
                        }
                        />
                        <Step title={'Payment'} description={
                            currentStep > 2 && currentStep < 4
                                ? 'Hoàn thành'
                                : currentStep >= 0 && currentStep <= 1
                                    ? 'Đang chờ'
                                    : currentStep === 2 && 'Đang tiến hành'
                        }
                        />
                        <Step
                            title={"Confirm"}
                            description={
                                currentStep === 3
                                    ? 'Đang tiến hành'
                                    : currentStep < 3
                                        ? 'Đang chờ'
                                        : currentStep > 3 && currentStep <= 4
                                            ? 'Hoàn thành'
                                            : ''
                            }
                        />
                    </Steps>
                </div>
                {currentStep === 0 && <>
                    <div className="cart-content">
                        {listCart?.total_quantity > 0 && listCart?.list_carts?.map((item, index) => {
                            return (
                                <div className="cart-item" key={item?._id}>
                                    <div className="cart-item-info">
                                        <img src={item?.product_info?.image} alt="" />
                                        <div className="cart-item-content">
                                            <div className="cart-item-content-info">
                                                <div className="cart-item-title">{item?.product_info?.title}</div>
                                                <div className="cart-item-desc">{item?.product_info?.description}</div>
                                            </div>
                                            <div className="cart-item-price">{item?.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="update-quantity">
                                            <PlusOutlined onClick={() => handleUpdateQuantity(1, item)} />
                                            <InputNumber type="number" value={item?.quantity} onChange={(event) => handleUpdateQuantityInput(event)} onBlur={() => handleBlurUpdateQuantity(item)} />
                                            <MinusOutlined onClick={() => handleUpdateQuantity(-1, item)} />
                                        </div>
                                        <div className="remove-item">
                                            <DeleteOutlined onClick={() => handleDeleteCartItem(item)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                    // ======================================== Giỏ Hàng ====================================//
                }

                {currentStep === 1 && (
                    // ======================================== Contact ====================================//
                    <div className="basic-info">
                        <div className="cart-content">
                            <div className="contact-info">
                                <div className="contact-info-title">
                                    <EnvironmentOutlined />
                                    <span>Địa chỉ nhận hàng</span>
                                </div>
                                <div className="contact-info-content">
                                    <div className="user-info">
                                        <div className="user-name">Bùi Cát Hòa</div>
                                        <div className="user-phone">0909370002</div>
                                    </div>
                                    <div className="user-address">
                                        107/16 Hà Đặc, phường Trung Mỹ Tây, quận 12, tpHcm
                                    </div>
                                </div>
                            </div>
                            <div className="contact-decor"></div>
                            {/* <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                validateMessages={validateMessages}
                                layout="vertical"
                                autoComplete="off"
                            >
                                <div className="contact-info">
                                    <div className="contact-info-item">
                                        <div className="contact-info-title">
                                            Liên hệ chi tiết
                                        </div>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Input className="form-input" placeholder="Full Name" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Input className="form-input" placeholder="Mobile No" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="contact-info-item">
                                        <div className="contact-info-title">
                                            Địa chỉ
                                        </div>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Select
                                                        placeholder="Tỉnh / Thành phố"
                                                        className="form-select"
                                                        // onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'jack',
                                                                label: 'Jack',
                                                            },
                                                            {
                                                                value: 'lucy',
                                                                label: 'Lucy',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Select
                                                        placeholder="Quận / huyện"
                                                        className="form-select"
                                                        // onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'jack',
                                                                label: 'Jack',
                                                            },
                                                            {
                                                                value: 'lucy',
                                                                label: 'Lucy',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Select
                                                        placeholder="Phường / Xã"
                                                        className="form-select"
                                                        // onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'jack',
                                                                label: 'Jack',
                                                            },
                                                            {
                                                                value: 'lucy',
                                                                label: 'Lucy',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >

                                                    <Input className="form-input" placeholder="Địa chỉ chi tiết" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="only_root" valuePropName="checked" label="Đặt làm địa chỉ mặc định" className="checkbox">
                                                    <Checkbox className="form-checkbox" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="contact-info-item">
                                        <div className="contact-info-title">
                                            Thời gian giao hàng
                                        </div>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="username"
                                                    rules={validateSchema.oldpassword}
                                                >
                                                    <Select
                                                        placeholder="Thời gian giao hàng"
                                                        className="form-select"
                                                        // onChange={handleChange}
                                                        options={[
                                                            {
                                                                value: 'jack',
                                                                label: 'Jack',
                                                            },
                                                            {
                                                                value: 'lucy',
                                                                label: 'Lucy',
                                                            },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                            <div className="payment-content">
                                <div className="payment-title">Phương thức thanh toán</div>
                                <div className="payment-method-selection">
                                    <Radio.Group value={paymentSelected} onChange={onChangePaymentMethods}>
                                        {listPaymentMethods.map((item, index) => {
                                            return (
                                                <div className="payment-method-item" key={index}>
                                                    <Radio value={item.name}>{item.name}</Radio>
                                                    <img src={item.image} alt="" />
                                                </div>
                                            )
                                        })}
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="payment-detail">
                                {paymentSelected === 'Momo' ?
                                    <div className="momo-wrapper">
                                        <div className="momo-content">
                                            <div className="momo-title">Vui lòng scan mã dưới đây để thanh toán</div>
                                            <div className="momo-description">Đơn sẽ được xác nhận tối đa sau 10 phút</div>
                                            <div className="momo-steps">
                                                <div className="step-item">B1. Vào ứng dụng Momo trên điện thoại</div>
                                                <div className="step-item">B2. Vào mục quét mã</div>
                                                <div className="step-item">B3. Scan mã QR này, và tiến hành chuyển số tiền tương ứng</div>
                                            </div>
                                        </div>
                                        <img src="images/payment-momo.jpg" alt="" />
                                    </div> :
                                    <div className="cod wrapper">
                                        <div className="cod-detail">Vui lòng thanh toán đúng ngày giờ dùm tao</div>
                                    </div>
                                }
                            </div> */}
                        </div>
                    </div>



                    // ======================================== Contact ====================================//
                )}

                <div className="cart-checkout">
                    {(currentStep === 1 || currentStep === 2 || currentStep === 3) && <Button className="checkout-button left" onClick={() => handleBackToPreviousPage()}>Trở lại</Button>}
                    <div className="total-price">{listCart?.total_price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    {currentStep === 0 && <Button className="checkout-button right" onClick={() => handleMoveToCheckoutPage()}>Check Out</Button>}
                    {(currentStep === 1 || currentStep === 2) && <Button className="checkout-button right" onClick={() => handleMoveToNextPage()}>Tiếp theo</Button>}
                </div>

            </div>
            <ModalConfirm
                isOpenConfirmModal={isOpenConfirmModal}
                onConfirmOk={handleModalDelete}
                onConfirmCancel={handleModalCancel}
                title="Xác nhận"
                confirmTitle="Bạn có chắc chắn muốn xóa sản phẩm này?"
                confirmContent="Sau khi xóa sản phẩm, dữ liệu sẽ không thể hoàn tác"
            />
        </div>
    )
}

export default Cart
