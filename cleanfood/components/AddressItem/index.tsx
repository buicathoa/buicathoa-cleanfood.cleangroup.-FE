import { EnvironmentOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const AddressItem = ({ isOpenAddressModal, setIsOpenAddressModal }) => {

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
                    <div className="user-name">{`${user?.firstname} ${user?.lastname}`}</div>
                    <div className="user-phone">0909370002</div>
                </div>
                <div className="user-address">
                    107/16 Hà Đặc, phường Trung Mỹ Tây, quận 12, tpHcm
                </div>
            </div>
        </div>
    )
}

export default AddressItem
