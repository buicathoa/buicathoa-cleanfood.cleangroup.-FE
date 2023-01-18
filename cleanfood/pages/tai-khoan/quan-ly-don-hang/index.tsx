/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import moment, { duration, Moment } from 'moment';

import { Button, Card, DatePicker, DatePickerProps, Form } from 'antd';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";

import EditOrderTracking from '../../../components/EditOrderTracking';
import AddressItem from '../../../components/AddressItem';

import { GeneralMenuActions } from '../../../reducer/generalMenuReducer';
import { useAppDispatch, useAppSelector } from '../../../reducer/hook';
import { UserActions } from '../../../reducer/userReducer';
import ModalAddress from '../../../components/Modal/ModalAddress';
import { openError } from '../../../components/NotificationStatus';

import { DeliveryItemInterface, OrderCancelInterface, OrderTrackingInterface, OrderTrackingInterfaceConvert, ResponseFormatItem, ResponseFormatListInterface } from '../../../interface';

import { renderStatusTracking } from '../../../utils/helper';
const orderCancelInit = {
    _id: '',
    product: '',
    calories: '',
    session: '',
    order_day_id: '',
    user_id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    mealplans: ''
}

const OrderManage = () => {
    const [listOrder, setListOrder] = useState<OrderTrackingInterfaceConvert[] | undefined>([])
    const [isEditTrackingOrder, setIsEditTrackingOrder] = useState(false)
    const [trackingDaySelected, setTrackingDaySelected] = useState('')
    const [isOpenSupplement, setIsOpenSupplement] = useState(false)
    const [listOrderCancel, setListOrderCancel] = useState<Array<OrderCancelInterface>>([])
    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false)
    const [addressSelected, setAddressSelected] = useState<DeliveryItemInterface>({})
    const [dateSup, setDateSup] = useState<Moment>()
    const [orderCancelSelected, setOrderCancelSelected] = useState<OrderCancelInterface>(orderCancelInit)

    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const user = useAppSelector((state) => state.user.user)
    const daysRegister = useAppSelector((state) => state.generalMenu.daysRegister)



    useEffect(() => {
        if (!isEditTrackingOrder) {
            getAllDaysRegister({}).then(res => {
                const list_order = res?.data?.map((item) => {
                    return {
                        start: moment(item?.start).format('YYYY-MM-DD HH:mm:ss'),
                        end: moment(item?.end).format('YYYY-MM-DD HH:mm:ss'),
                        title: item?.product,
                        id: item?._id,
                        extendedProps: {
                            calories: item?.calories,
                            session: item?.session,
                            mealplans: item?.mealplans,
                            province_id: item?.province_id,
                            district_id: item?.district_id,
                            ward_id: item?.ward_id,
                            address_detail: item?.address_detail,
                            ship_place: item?.ship_place,
                            order_status: item?.order_status,
                            full_name: item?.full_name,
                            phone_number: item?.phone_number,
                        }
                    }
                })
                setListOrder(list_order)
            })
            getAllOrderDaysCancel({}).then(res => {
                if (res?.data!?.length > 0) {
                    setOrderCancelSelected(res?.data![0])
                    setListOrderCancel(res?.data!)
                }
            })
        }
    }, [isEditTrackingOrder, isOpenSupplement])

    useEffect(() => {
        getAllDeliveryAddress({}).then((res) => {
            const listAddress = res?.data
            const default_address = listAddress?.find((item: DeliveryItemInterface) => item?.default_address === true)
            setAddressSelected(default_address)
        })
    }, [])

    const getAllDaysRegister = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.getAllDaysRegister({ param, resolve, reject }));
        });
    };

    const getAllOrderDaysCancel = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.getAllOrderDaysCancel({ param, resolve, reject }));
        });
    };

    const getAllDeliveryAddress = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.getAllDeliveryAddress({ param, resolve, reject }));
        });
    };

    const createSupplement = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.createSupplement({ param, resolve, reject }));
        });
    };


    const handleEventClick = (eventInfo: any) => {
        setTrackingDaySelected(eventInfo.event.id)
        setIsEditTrackingOrder(true)
    }

    const handleOpenOrderSupplement = () => {
        setIsOpenSupplement(true)
    }

    const handleChangeDateSup: DatePickerProps['onChange'] = (event) => {
        const date_select = moment(event).format('DD-MM-YYYY')
        const three_date_after = moment().add(3, 'days').format('DD-MM-YYYY')
        if (date_select < moment().format('DD-MM-YYYY')) {
            openError('Vui lòng chọn ngày đặt sau ngày hiện tại ')
        } else {
            if ((three_date_after === date_select) || (three_date_after < date_select)) {
                setDateSup(event!)
            } else {
                openError('Vui lòng chọn ngày đặt cách 3 ngày từ ngày hôm nay')
            }
        }
    }

    const handleSelectOrderCancel = (item: OrderCancelInterface) => {
        setOrderCancelSelected(item)
    }


    const handleCreateSupplement = () => {
        const payload = {
            delivery_date: dateSup,
            delivery_start_time: addressSelected?.delivery_time![0],
            delivery_end_time: addressSelected?.delivery_time![1],
            order_status: 'pending',
            order_id: orderCancelSelected?.order_id,
            address_info: addressSelected,
            product: orderCancelSelected?.product,
            calories: orderCancelSelected?.calories,
            session: orderCancelSelected?.session,
            mealplans: orderCancelSelected?.mealplans,
            order_cancel_id: orderCancelSelected?._id
        }
        createSupplement(payload).then(() => {
            {
                setIsOpenSupplement(false)
            }
        })
    }

    const renderEventContent = (eventInfo: any) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                <div className="order-info">
                    <div className="product-info">
                        <span className="product-info-title">{eventInfo.event.title}</span>
                        <div className="product-info-detail">
                            <div className="product-flex-info">
                                <div className="product-info-detail-item">
                                    <span className="title">Calories: </span><span className="content">{eventInfo.event.extendedProps.calories}</span>
                                </div>
                                <div className="product-info-detail-item">
                                    <span className="title">Buổi ăn: </span><span className="content">{eventInfo.event.extendedProps.session}</span>
                                </div>
                                <div className="product-info-detail-item">
                                    <span className="title">Thời hạn gói: </span><span className="content">{eventInfo.event.extendedProps.mealplans}</span>
                                </div>
                            </div>
                            <div className="product-flex-info">
                                <div className="product-info-detail-item">
                                    <span className="title">Người nhận: </span><span className="content">{eventInfo.event.extendedProps.full_name}</span>
                                </div>
                                <div className="product-info-detail-item">
                                    <span className="title">Số điện thoại: </span><span className="content">{eventInfo.event.extendedProps.phone_number}</span>
                                </div>
                            </div>
                            <div className="product-info-detail-item">
                                <span className="title">Địa chỉ: </span><span className="content">{eventInfo.event.extendedProps.ship_place}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-follow-status">
                    <span className="content" style={{
                        color: eventInfo.event.extendedProps.order_status === 'reject'
                            ? 'red'
                            : eventInfo.event.extendedProps.order_status === 'wait_confirmed'
                                ? 'blue'
                                : eventInfo.event.extendedProps.order_status === 'deliveried'
                                    ? 'green' : 'rgb(23 202 146)'
                    }}>{renderStatusTracking(eventInfo.event.extendedProps.order_status)}</span>
                </div>
            </div>
        );
    }

    const renderContentSup = () => {
        const listCancelDay = daysRegister?.filter((item: OrderTrackingInterface) => item.order_status === 'reject').length
        if (user.order_day_cancel === 0) {
            return <div>Bạn đã hủy <span className="number">{listCancelDay} ngày</span> và đã <span className="number">bù đủ</span></div>
        } else {
            return <div>Bạn đã hủy <span className="number">{listCancelDay}</span> và đã bù <span className="number">{listCancelDay - user.order_day_cancel}</span> ngày</div>
        }
    }

    return (
        <div className="order-manage-wrapper">
            {!isOpenSupplement ?
                !isEditTrackingOrder ?
                    <div className="full-calendar">
                        <div className="full-calendar-image">
                            <img src='../images/estimate_delivery.jpg' />
                        </div>
                        <div className="cancel-order-number">
                            {renderContentSup()}
                            {/* Bạn đã hủy <span className="number">{user?.order_day_cancel}</span> ngày */}
                        </div>
                        {user.order_day_cancel > 0 && <div className="click-here">
                            Bấm vào <span className="here" onClick={() => handleOpenOrderSupplement()}> đây </span> để chọn ngày bù
                        </div>}
                        <FullCalendar
                            plugins={[interactionPlugin, dayGridPlugin, listPlugin]}
                            headerToolbar={{
                                left: "prev,next",
                                right: "title"
                            }}
                            initialView="listWeek"
                            editable={true}
                            selectable={true}
                            displayEventTime={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            events={listOrder}
                            eventContent={renderEventContent}
                            eventClick={handleEventClick}
                        />
                    </div> :
                    <EditOrderTracking
                        trackingDaySelected={trackingDaySelected}
                        setIsEditTrackingOrder={setIsEditTrackingOrder}
                    />
                : <div className="supplement-wrapper">
                    <div className="supplement-image">
                        <img src='../images/estimate_delivery.jpg' />
                    </div>
                    <div className="supplement-content">
                        <div className="supplement-header">
                            <div className="supplement-list">
                                {listOrderCancel.length > 0 &&
                                    listOrderCancel?.map((item, index) => {
                                        return (
                                            <div className={`supplement-item`} key={index} onClick={() => handleSelectOrderCancel(item)}>
                                                <Card title={item?.product} bordered={false} style={{ width: 200 }} className={`${orderCancelSelected?._id === item._id ? 'active' : ''}`}>
                                                    <div className="supplement-content-item"><span className="title">Buổi ăn: </span> {item?.session}</div>
                                                    <div className="supplement-content-item"><span className="title">Calories: </span>{item?.calories}</div>
                                                </Card>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        <div className="date-delivery">
                            <DatePicker
                                className="form-date"
                                placeholder='Ngày giao'
                                format="DD-MM-YYYY"
                                onChange={handleChangeDateSup}
                            />
                        </div>
                        <div className="supplement-form">
                            <AddressItem setIsOpenAddressModal={setIsOpenAddressModal} addressSelected={addressSelected} />
                        </div>
                        <div className="button-submit-supplement">
                            <Button onClick={() => handleCreateSupplement()}>Đăng ký</Button>
                        </div>
                    </div>
                </div>}
            <ModalAddress
                visible={isOpenAddressModal}
                setVisible={setIsOpenAddressModal}
                addressSelected={addressSelected}
                setAddressSelected={setAddressSelected}
            />
        </div>
    )
}

export default OrderManage
