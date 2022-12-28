import { EnvironmentOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deliveryItem } from '../../constants'
import { AddressItemComponentInterface, DeliveryItemInterface } from '../../interface'

const AddressItem = ({ setIsOpenAddressModal, listDeliveryAddress }:AddressItemComponentInterface) => {
    
    const [defaultAddress, setDefaultAddress] = useState<DeliveryItemInterface>(deliveryItem)

    useEffect(() => {
        if(listDeliveryAddress && listDeliveryAddress?.length > 0){
            const address:DeliveryItemInterface = listDeliveryAddress?.find(item => item.default_address === true)!
            setDefaultAddress(address)
        }
    }, [listDeliveryAddress])
    
    return (
        <div className="contact-info">
            <div className="contact-info-title">
                <div className="title">
                    <EnvironmentOutlined />
                    <span>Địa chỉ nhận hàng</span>
                </div>
                <div className="contact-default">
                    <Tag color="#f50">Mặc định</Tag>
                    <Tag color="#108ee9" onClick={() => setIsOpenAddressModal(true)}>Thay đổi</Tag>
                </div>
            </div>
            <div className="contact-info-content">
                <div className="user-info">
                    <div className="user-name">{defaultAddress?.full_name}</div>
                    <div className="user-phone">{defaultAddress?.phone_number}</div>
                </div>
                <div className="user-address">
                    {defaultAddress?.full_address}
                </div>
            </div>
        </div>
    )
}

export default AddressItem
