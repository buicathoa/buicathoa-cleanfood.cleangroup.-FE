import { EnvironmentOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deliveryItem } from '../../constants'
import { AddressItemComponentInterface, DeliveryItemInterface } from '../../interface'

const AddressItem = ({ setIsOpenAddressModal, listDeliveryAddress }: AddressItemComponentInterface) => {

    const [defaultAddress, setDefaultAddress] = useState<DeliveryItemInterface>(deliveryItem)
    const [deliveryTime, setDeliveryTime] = useState<string>('')
    useEffect(() => {
        if (listDeliveryAddress && listDeliveryAddress?.length > 0) {
            const address: DeliveryItemInterface = listDeliveryAddress?.find(item => item.default_address === true)!
            const deliveryTimeString = address?.delivery_time?.map((item) => {
                return moment(item).format('HH:mm')
            }).join(' - ')
            setDeliveryTime(deliveryTimeString)
            setDefaultAddress(address)
        }
    }, [listDeliveryAddress])

    return (
        <div className="contact-info">
            <div className="contact-info-title">
                <div className="title">
                    <EnvironmentOutlined />
                    <span>Thông tin nhận hàng</span>
                </div>
                <div className="contact-default">
                    <Tag color="#f50">Mặc định</Tag>
                    <Tag color="#108ee9" onClick={() => setIsOpenAddressModal(true)}>Thay đổi</Tag>
                </div>
            </div>
            <div className="contact-info-content">
                <div className="user-info">
                    <div className="user-basic-info">
                        <div className="user-name">Tên: <span>{defaultAddress?.full_name}</span></div>
                        <div className="user-phone">Sđt: <span>{defaultAddress?.phone_number}</span></div>
                    </div>
                    <div className="delivery-time">
                        Khoảng thời gian giao: <span>{deliveryTime}</span>
                    </div>
                    <div className="user-address">
                        Địa chỉ: <span>{defaultAddress?.full_address}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressItem
