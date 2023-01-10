/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import { Form } from 'antd';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";

import EditOrderTracking from '../../../components/EditOrderTracking';

import { GeneralMenuActions } from '../../../reducer/generalMenuReducer';
import { useAppDispatch, useAppSelector } from '../../../reducer/hook';

import { OrderTrackingInterfaceConvert, ResponseFormatListInterface } from '../../../interface';
const OrderManage = () => {
    const [listOrder, setListOrder] = useState<OrderTrackingInterfaceConvert[] | undefined>([])
    const [isEditTrackingOrder, setIsEditTrackingOrder] = useState(false)
    const [trackingDaySelected, setTrackingDaySelected] = useState('')
    const [formValues, setformValues] = useState({})
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields()
    }, [formValues])

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
        }
    }, [isEditTrackingOrder])

    const getAllDaysRegister = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.getAllDaysRegister({ param, resolve, reject }));
        });
    };

    const renderStatusTracking = (content: string) => {
        let contentConvert;
        switch (content) {
            case 'pending':
                contentConvert = 'Chờ nhận hàng';
                break;
            case 'shipped':
                contentConvert = 'Đã nhận';
                break;
            case 'cancelled':
                contentConvert = 'Đã hủy';
                break;
        }
        return contentConvert
    }

    const handleEventClick = (eventInfo: any) => {
        setTrackingDaySelected(eventInfo.event.id)
        setIsEditTrackingOrder(true)
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
                    <span className="content">{renderStatusTracking(eventInfo.event.extendedProps.order_status)}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="order-manage-wrapper">
            {!isEditTrackingOrder ?
                <div className="full-calendar">
                    <div className="full-calendar-image">
                        <img src='../images/estimate_delivery.jpg' />
                    </div>
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
            }
        </div>
    )
}

export default OrderManage
