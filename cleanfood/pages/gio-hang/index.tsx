/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Button, InputNumber, DatePicker, Modal, Radio, RadioChangeEvent, Row, Select, Steps, Switch, Tag } from 'antd';
import {
    MinusOutlined, PlusOutlined, DeleteOutlined, UserOutlined,
    GiftOutlined,
    RightOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { CartItemInterface, DeliveryItemInterface, listCartsInterface, ResponseFormatItem, ResponseFormatListInterface } from '../../interface';

import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { CartActions } from '../../reducer/cartReducer';
import { AppActions } from '../../reducer/appReducer';
import { UserActions } from '../../reducer/userReducer';

import { getrandomcolor } from '../../utils/helper';

import ModalConfirm from '../../components/Modal/ModalConfirm';
import ModalAddress from '../../components/Modal/ModalAddress';
import ModalVoucher from '../../components/Modal/ModalVoucher';
import AddressItem from '../../components/AddressItem';
import ModalPayment from '../../components/Modal/ModalPayment';
import moment from 'moment';
import { orderActions } from '../../reducer/orderReducer';
import { GeneralMenuActions } from '../../reducer/generalMenuReducer';
import Item from 'antd/lib/list/Item';
import useInterval from '../../utils/useInterval';
const Cart: React.FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const listCart: listCartsInterface = useAppSelector((state) => state.cart.listCart)
    const user = useAppSelector((state) => state.user.user)
    const listDeliveryAddress = useAppSelector((state) => state.user.listDeliveryAddress)
    const [addressSelected, setAddressSelected] = useState<DeliveryItemInterface>({})
    const [value, setValue] = useState(0)
    const [currentStep, setCurrentStep] = useState(0);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false)
    const [isOpenVoucherModal, setIsOpenVoucherModal] = useState(false)
    const [isUseCoin, setIsUseCoin] = useState(false)
    const [cartSelected, setCartSelected] = useState<CartItemInterface>({})
    const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false)
    const [isOpenDeliveryDate, setIsOpenDeliveryDate] = useState(false)

    const [paymentSelected, setPaymentSelected] = useState<{ name: string, value: string }>({ name: 'Momo - 0909370002 (Bùi Cát Hòa)', value: 'momo' })
    const [breakPoint, setBreakPoint] = useState(false)

    const { Step } = Steps;

    //Chung
    const handleMoveToCheckoutPage = () => {
        setCurrentStep(currentStep + 1)
    }
    const handleOrder = () => {
        const line_items = listCart?.list_carts?.map((item) => {
            return {
                quantity: item?.quantity, total_price: item?.total_price, calories: item?.daily_calories,
                session: item?.session, mealplans: item?.mealplans, product_image: item?.product_info?.image, product_title: item?.product_info?.title,
                cart_id: item?._id
            }
        })
        handlePurchase({
            line_items: line_items,
            delivery_date: moment(new Date()).add(3, "days").format("YYYY-MM-DD"),
            pay_method: paymentSelected?.value
        }).then((res: any) => {
            for (let i = 0; i < listCart?.total_quantity!; i++) {
                if ((listCart?.list_carts!)[i]?.product_info?.product_type === 'combo') {
                    const start_day = moment(new Date()).add(3, "days").format("YYYY-MM-DD");
                    const end_day = listCart?.list_carts![i].mealplans === '1 tuần'
                        ? moment(new Date()).add(10, "days").format("YYYY-MM-DD")
                        : moment(new Date()).add(17, "days").format("YYYY-MM-DD")
                    const delivery_start_time = moment(addressSelected?.delivery_time![0]).format(
                        "HH:mm:ss"
                    )
                    const delivery_end_time = moment(addressSelected?.delivery_time![1]).format(
                        "HH:mm:ss"
                    )
                        debugger
                    const payloadDaysRegister = {
                        start_date: start_day,
                        end_date: end_day,
                        delivery_start_time: delivery_start_time,
                        delivery_end_time: delivery_end_time,
                        order_code: (res?.data!)[i]?.order_code,
                        province_id: addressSelected?.province_id,
                        district_id: addressSelected?.district_id,
                        ward_id: addressSelected?.ward_id,
                        address_detail: addressSelected?.address_detail,
                        phone_number: addressSelected?.phone_number,
                        full_name: addressSelected?.full_name,
                        product: listCart?.list_carts![i]?.product_info?.title,
                        calories: listCart?.list_carts![i]?.daily_calories,
                        session: listCart?.list_carts![i]?.session,
                        mealplans: listCart?.list_carts![i]?.mealplans
                    }
                    createDaysRegister(payloadDaysRegister)
                }
            }
            setCurrentStep(currentStep + 1)
        })
    }

    const handleBackToPreviousPage = () => {
        if (currentStep === 1 || currentStep === 2) {
            setCurrentStep(currentStep - 1)
        } else {
            router.push('/dat-hang')
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

    const fetchAllCart = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(CartActions.fetchAllCart({ param, resolve, reject }));
        });
    };

    const getAllDeliveryAddress = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.getAllDeliveryAddress({ param, resolve, reject }));
        });
    };

    const handlePurchase = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(orderActions.handlePurchase({ param, resolve, reject }));
        });
    };

    const createDaysRegister = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.createDaysRegister({ param, resolve, reject }));
        });
    };

    console.log('listCart', listCart)

    useEffect(() => {
        if (!Cookies.get('cleanfood')) {
            router.push('/tai-khoan/dang-nhap')
        } else {
            if (currentStep === 0) {
                fetchAllCart({})
            }
            getAllDeliveryAddress({}).then((res) => {
                const default_address = res?.data?.find(item => item?.default_address === true)
                setAddressSelected(default_address)
            })
        }
    }, [])

    // const breakPoint = useInterval(1)

    // useEffect(() => {
    //     if(breakPoint && value !== 0){
    //         const params = { cart_id: cartSelected?._id, quantity: value }
    //         updateCartByUser(params).then(() => {
    //             setValue(0)
    //             setCartSelected({})
    //         })
    //     }
    // }, [breakPoint, value])

    const handleUpdateQuantity = (number: number, item: any) => {
        if (item.quantity === 1 && number === -1) {
            setCartSelected(item)
            setIsOpenConfirmModal(true)
        } else {
            dispatch(AppActions.openLoading(true))
            const params = { cart_id: item?._id, inc_quantity: number }
            updateCartByUser(params)
        }
    }


    const handleUpdateQuantityInput = (event: number, item) => {
        let seconds = 1;
        setTimeout(() => {
            // debugger
            seconds = seconds - 1
            if (seconds === 0) {
                // setValue(event)
                // setCartSelected(item)
                const params = { cart_id: item?._id, quantity: event }
                updateCartByUser(params)
            }
        }, 1000)
    }

    const handleBlurUpdateQuantity = (item: CartItemInterface) => {

    }

    const handleDeleteCartItem = (item: CartItemInterface) => {
        setCartSelected(item)
        setIsOpenConfirmModal(true)
    }

    const handleModalDelete = () => {
        dispatch(AppActions.openLoading(true))
        const payload = { cart_id: cartSelected?._id }
        deleteCartItem(payload).then(() => {
            setIsOpenConfirmModal(false)
            setCartSelected({})
        })
    }

    const handleModalCancel = () => {
        setIsOpenConfirmModal(false)
        setCartSelected({})
    }
    return (
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
                            currentStep > 1 && currentStep < 3
                                ? 'Hoàn thành'
                                : currentStep === 0
                                    ? 'Đang chờ'
                                    : currentStep === 1 && 'Đang tiến hành'
                        }
                        />
                        <Step title={'Xác nhận'} description={
                            currentStep > 2 && currentStep < 3
                                ? 'Hoàn thành'
                                : currentStep >= 0 && currentStep <= 1
                                    ? 'Đang chờ'
                                    : currentStep === 2 && 'Đang tiến hành'
                        }
                        />
                    </Steps>
                </div>
                {currentStep === 0 && <>
                    <div className="cart-content">
                        <div className="cart-list">
                            {listCart?.total_quantity! > 0 && listCart?.list_carts?.map((item) => {
                                return (
                                    <div className="cart-item" key={item?._id}>
                                        <div className="cart-item-info">
                                            <img src={item?.product_info?.image} alt="" />
                                            <div className="cart-item-content">
                                                <div className="cart-item-content-info">
                                                    <div className="cart-item-title">{item?.product_info?.title}</div>
                                                    <div className="cart-item-desc">{item?.product_info?.sub_title}</div>
                                                </div>
                                                <div className="cart-item-price">{item?.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                            </div>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="update-quantity">
                                                <PlusOutlined onClick={() => handleUpdateQuantity(1, item)} />
                                                <InputNumber type="number" value={item?.quantity} onChange={(event) => handleUpdateQuantityInput(event!, item)}
                                                //  onBlur={() => handleBlurUpdateQuantity(item)} 
                                                />
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
                        <div className="contact-decor"></div>
                        <div className="cart-voucher">
                            <div className="voucher-left"><GiftOutlined /> <span className="voucher-title">FreshMeal Vouchers</span></div>
                            <div className="voucher-right">
                                <div className="list-vouchers">
                                    <Tag color={getrandomcolor()}>magenta</Tag>
                                    <Tag color={getrandomcolor()}>Hihi</Tag>
                                </div>
                                <div className="voucher-more">
                                    <Tag color="#108ee9" onClick={() => setIsOpenVoucherModal(true)} >Thay đổi</Tag>
                                </div>
                            </div>
                        </div>
                        <div className="contact-decor"></div>
                        <div className="coin-cart">
                            <div className="coin-cart-content">
                                <div className="coin-cart-title">
                                    <DollarOutlined /> Dùng xu
                                </div>
                                <Switch className="form-switch" checked={isUseCoin} onChange={() => setIsUseCoin(!isUseCoin)} />
                            </div>
                            {isUseCoin && <div className="coin-cart-typing">
                                <InputNumber className="form-input" placeholder='Số lượng xu' />
                            </div>}
                        </div>
                        <div className="contact-decor"></div>
                        <div className="cart-delivery-date">
                            <span className="title">Ngày nhận: </span>
                            <div className="delivery-date-content">
                                <DatePicker size='large' defaultValue={moment(new Date()).add(3, "days")} format="DD-MM-YYYY"/>
                                {/* <span className="date-delivery">{moment(new Date()).add(3, "days").format("DD-MM-YYYY")}</span>
                                <span className="date-delivery-edit"><Tag color="#e46d4f" onClick={() => setIsOpenDeliveryDate(true)}>Thay đổi</Tag></span> */}
                            </div>
                        </div>
                        <div className="contact-decor"></div>
                        <div className="cart-calc-price">
                            <div className="cart-calc-price-item">
                                <span className="title">Tổng giá: </span>
                                <div className="price">{listCart?.total_price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                            </div>
                            <div className="cart-calc-price-item">
                                <span className="title">Phí ship: </span>
                                <div className="price">Thanh toán khi giao hàng (Xem bảng dưới)</div>
                            </div>
                        </div>
                    </div>
                </>
                }

                {currentStep === 1 && (
                    <div className="cart-content">
                        <AddressItem setIsOpenAddressModal={setIsOpenAddressModal} addressSelected={addressSelected} />
                        <div className="contact-decor"></div>
                        <div className="payment-wrapper">
                            <div className="payment-title">Phương thức thanh toán</div>
                            <div className="payment-content-wrapper">
                                <div className="payment-content">{paymentSelected.name}</div>
                                <Tag color="#108ee9" onClick={() => setIsOpenPaymentModal(true)}>Thay đổi</Tag>
                            </div>
                        </div>
                        <div className="contact-decor"></div>
                        <div className="cart-calc-price">
                            <div className="cart-calc-price-item">
                                <span className="title">Tổng giá: </span>
                                <div className="price">60.00</div>
                            </div>
                            <div className="cart-calc-price-item">
                                <span className="title">Phí ship: </span>
                                <div className="price">Thanh toán khi giao hàng (Xem bảng dưới)</div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="confirm-order-wrapper">
                        <div className="delivery-image">
                            <img src="images/deliver-image.jpg" alt="" />
                        </div>
                        <div className="confirm-order-content">
                            <span className="title">Đơn hàng của bạn đang chờ xác nhận</span>
                            <span className="desc"><span className="detail-desc"> Cảm ơn bạn đã đặt hàng, bạn có thể kiểm tra đơn hàng tại </span><span className="link">Đơn hàng của tôi</span></span>
                            <span className="est-time">Tiến trình mất khoảng 5 phút</span>
                        </div>
                        <div className="confirm-order-button">
                            <div className="track-order-button">
                                <span className="track-order">Tra cứu đơn hàng</span>
                            </div>
                            <div className="order-st-else-button">
                                <span className="order-st-else">Đặt tiếp</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`cart-checkout ${currentStep === 2 ? 'none' : ''}`} style={{ justifyContent: currentStep === 2 ? 'center' : 'space-between' }}>
                    {(currentStep === 0 || currentStep === 1) && <Button className="checkout-button left" onClick={() => handleBackToPreviousPage()}>{currentStep === 0 ? 'Tiếp tục mua' : 'Trở lại'}</Button>}
                    <div className="total-price"><span className="total-price-title">Tổng tiền: </span>{listCart?.total_price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    {currentStep === 0 && <Button className="checkout-button right" onClick={() => handleMoveToCheckoutPage()}>Check Out</Button>}
                    {currentStep === 1 && <Button className="checkout-button right" onClick={() => handleOrder()}>Thanh toán</Button>}
                </div>

            </div>
            <ModalAddress
                visible={isOpenAddressModal} setVisible={setIsOpenAddressModal}
                addressSelected={addressSelected} setAddressSelected={setAddressSelected}
            />
            <ModalConfirm
                modalType={'general'}
                visible={isOpenConfirmModal}
                setVisible={setIsOpenConfirmModal}
                onConfirmModal={handleModalDelete}
                onConfirmCancelModal={handleModalCancel}
                title="Xác nhận"
                confirmTitle="Bạn có chắc chắn muốn xóa sản phẩm này?"
                confirmContent="Sau khi xóa sản phẩm, dữ liệu sẽ không thể hoàn tác"
            />
            <ModalPayment visible={isOpenPaymentModal} setVisible={setIsOpenPaymentModal} paymentSelected={paymentSelected} setPaymentSelected={setPaymentSelected} />
            <ModalVoucher visible={isOpenVoucherModal} setVisible={setIsOpenVoucherModal} />
        </div>
    )
}

export default Cart
