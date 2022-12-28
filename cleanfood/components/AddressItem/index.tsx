import { EnvironmentOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AddressItem = ({ isOpenAddressModal, setIsOpenAddressModal, listDeliveryAddress }) => {
    
    const [defaultAddress, setDefaultAddress] = useState({})

    useEffect(() => {
        if(listDeliveryAddress?.length > 0){
            const address = listDeliveryAddress?.find(item => item.default_address === true)
            setDefaultAddress(address)
        }
    }, [listDeliveryAddress])
    const user = useSelector((state) => state.user.user)
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
