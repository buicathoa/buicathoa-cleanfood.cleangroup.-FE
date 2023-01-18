import { Empty, Skeleton } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { ResponseFormatListInterface } from '../../../interface';
import { useAppDispatch } from '../../../reducer/hook';
import { orderActions } from '../../../reducer/orderReducer';
import {
    ArrowLeftOutlined
} from "@ant-design/icons";
const HistoryOrder = () => {
    const dispatch = useAppDispatch()
    const initPayload = {
        page: 1,
        limit: 5,
        category: 'wait_confirmed'
    }
    const [payload, setPayload] = useState(initPayload)
    const [categorySelected, setCategorySelected] = useState('wait_confirmed')
    const [histories, setHistories] = useState([])
    const [isGetNewList, setIsGetNewList] = useState(false)
    useEffect(() => {
        getHistory(payload).then(res => {
            setHistories(res?.data)
        })
    }, [])

    const getHistory = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(orderActions.getHistory({ param, resolve, reject }));
        });
    };

    const listCategory = [
        { label: 'Chờ xác nhận', value: 'wait_confirmed' },
        { label: 'Chờ nhận hàng', value: 'pending' },
        { label: 'Đã hủy', value: 'reject' },
        { label: 'Đã giao', value: 'deliveried' }
    ]

    const handleSelectCategory = (item) => {
        const payloadCategory = {
            ...initPayload,
            category: item.value
        }
        setPayload(payloadCategory)
        setCategorySelected(item.value)
        getHistory(payloadCategory).then(res => {
            setHistories(res?.data)
        })
    }

    const handleScroll = (event) => {
        if (event.target.scrollHeight - event.target.scrollTop >= event.target.clientHeight - 1) {
            setIsGetNewList(true)
            const payloadScroll = {
                ...payload,
                page: payload.page + 1
            }
            setPayload(payloadScroll)
            getHistory(payloadScroll).then(res => {
                setHistories(res?.data)
                setIsGetNewList(false)
            })
        }
    }

    return (
        <div className="history-order-wrapper">
            <div className="history-order-title">
                <ArrowLeftOutlined />
                <span>Đơn mua</span>
                <span></span>
            </div>
            <div className="history-order-category">
                {listCategory.map((item, index) => {
                    return (
                        <div onClick={() => handleSelectCategory(item)} className={`history-order-category-item ${item.value === categorySelected ? 'active' : ''}`} key={index}>{item.label}</div>
                    )
                })}
            </div>
            <div className="history-order-list" onScroll={handleScroll}>
                {histories?.length > 0 ? histories.map((item, index) => {
                    return (
                        <div className="history-order-item" key={index}>
                            <div className="history-order-item-content-left">
                                <img src={item?.product_image} alt="" />
                            </div>
                            <div className="history-order-item-content-main">
                                <div className="history-order-item-content-main-info">
                                    <div className="title">{item?.product_title}</div>
                                    <div className="list-statistics">
                                        <div className="statistics">Calories: <span className="number">{item?.calories}</span></div>
                                        <div className="statistics">x{item?.quantity}</div>
                                    </div>
                                    <div className="delivery-info">
                                        <div className="delivery-info-item">Ngày giao: <span className="number">{moment(item?.delivery_date).format('DD-MM-YYYY')}</span></div>
                                        <div className="delivery-info-item">Số tiền: <span className="number">{item?.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <Empty className="empty-data" />}
                <div className={`lazy-loading ${isGetNewList ? 'active' : ''}`}>
                    <Skeleton avatar paragraph={{ rows: 2 }} />
                </div>
            </div>
        </div>
    )
}

export default HistoryOrder
