/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Col, Empty, Form, Input, Modal, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    PushpinFilled
} from "@ant-design/icons";
import { ModalInterface, ResponseFormatItem } from '../../interface';
import { useAppDispatch } from '../../reducer/hook';
import { LocationActions } from '../../reducer/LocationReducer';
import { useSelector } from 'react-redux';
import { removeAccentsToLower } from '../../utils/string';
import _, { isEmpty } from 'lodash'

const ModalAddress = ({ visible, setVisible }: ModalInterface) => {
    const { Option } = Select
    const dispatch = useAppDispatch()
    const listCity = useSelector((state) => state.location.listCity)
    const listDistrict = useSelector((state) => state.location.listDistrict)
    const listWard = useSelector((state) => state.location.listWard)
    const user = useSelector((state) => state.user.user)
    console.log('user', user)

    const [isOpenAddressDetail, setIsOpenAddressDetail] = useState(false)
    const [isEditAddress, setIsEditAddress] = useState(false)
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

    const fetchListCity = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(LocationActions.fetchListCity({ param, resolve, reject }));
        });
    };

    const fetchListDistrict = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(LocationActions.fetchListDistrict({ param, resolve, reject }));
        });
    };

    const fetchListWard = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(LocationActions.fetchListWard({ param, resolve, reject }));
        });
    };

    useEffect(() => {
        if (isOpenAddressDetail) {
            fetchListCity({})
        }
    }, [isOpenAddressDetail])

    const handleEditAddress = () => {
        setIsOpenAddressDetail(true)
        setIsEditAddress(true)
    }

    const onSubmitForm = (values) => {
        console.log(values)
    }

    const handleCloseModal = () => {
        setIsEditAddress(false)
        setIsOpenAddressDetail(false)
        setVisible(false)
    }

    const handleAddNewAddress = () => {
        setIsEditAddress(false)
        setIsOpenAddressDetail(true)
    }

    const handleSelectProvince = (event) => {
        const payload = {
            province_id: event
        }
        fetchListDistrict(payload)
    }

    const handleSelectDistrict = (event) => {
        const payload = {
            district_id: event
        }
        fetchListWard(payload)
    }


    return (
        <Modal className="modal-address" title={(visible && !isOpenAddressDetail) ? 'Địa chỉ của tôi' : (isEditAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm mới địa chỉ')} open={visible}
            onOk={onSubmitForm}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => handleCloseModal()}>
                    Cancel
                </Button>,
                <Button form="basic" key="submit" htmlType="submit">
                    Save
                </Button>
            ]}>
            {isOpenAddressDetail ?
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    validateMessages={validateMessages}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onSubmitForm}
                >
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <div className="contact-info-title">
                                Địa chỉ
                            </div>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="province_id"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Select
                                            className="form-select"
                                            placeholder={"Tỉnh / Thành phố"}
                                            allowClear
                                            virtual={false}
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectProvince}
                                        >
                                            {listCity?.map((item, index) => {
                                                return (
                                                    <Option value={item?.province_id} key={index}>
                                                        {item?.province_name}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="district_id"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Select
                                            className="form-select"
                                            placeholder={"Quận / Huyện"}
                                            allowClear
                                            virtual={false}
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectDistrict}
                                        >
                                            {listDistrict?.map((item, index) => {
                                                return (
                                                    <Option value={item?.district_id} key={index}>
                                                        {item?.district_name}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="ward_id"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Select
                                            className="form-select"
                                            placeholder={"Phường / Xã"}
                                            allowClear
                                            virtual={false}
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectDistrict}
                                        >
                                            {listWard?.map((item, index) => {
                                                return (
                                                    <Option value={item?.ward_id} key={index}>
                                                        {item?.ward_name}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
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
                                    <Form.Item name="only_root" valuePropName="checked" label="Đặt làm mặc định" className="checkbox">
                                        <Checkbox className="form-checkbox" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Form> :
                <div className="list-address">
                    {!_.isEmpty(user?.delivery_address) ? user?.delivery_address?.map((item, index) => {
                        return (
                            <div className="address-item" key={index}>
                                <div className="address-pin">
                                    <PushpinFilled />
                                </div>
                                <div className="address-detail">
                                    <div className="user-info">
                                        <div className="user-name">Bùi Cát Hòa</div>
                                        <div className="user-phone">(+84) 0909370002</div>
                                    </div>
                                    <div className="full-address">107/16 Hà đặc, phường Trung Mỹ Tây, quận 12, tphcm</div>
                                    <div className="is-default">Mặc định</div>
                                </div>
                                <div className="actions-button">
                                    <div className="update-address" onClick={() => handleEditAddress()}>Cập nhật</div>
                                    <div className="delete-address">Xóa</div>
                                </div>
                            </div>
                        )
                    }) : <Empty className="empty-data"/>}
                    <div className="create-new-delivery" onClick={() => handleAddNewAddress()}>
                        <span>Thêm mới địa chỉ</span>
                    </div>
                </div>
            }
        </Modal>
    )
}

export default ModalAddress
