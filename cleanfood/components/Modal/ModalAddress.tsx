/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Empty, Form, Input, Modal, Row, Select, TimePicker } from 'antd'
import {
    PushpinFilled
} from "@ant-design/icons";
import moment from 'moment'
import _ from 'lodash'

import { DeliveryItemInterface, DeliveryPayloadApi, DistrictInterface, ModalInterface, ProvinceInterface, ResponseFormatItem, WardInterface } from '../../interface';

import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { LocationActions } from '../../reducer/LocationReducer';
import { UserActions } from '../../reducer/userReducer';

import { removeAccentsToLower } from '../../utils/string';
import { deliveryItem } from '../../constants';

const ModalAddress = ({ visible, setVisible }: ModalInterface) => {
    const { Option } = Select
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const listCity = useAppSelector((state) => state.location.listCity)
    const listDistrict = useAppSelector((state) => state.location.listDistrict)
    const listWard = useAppSelector((state) => state.location.listWard)
    const listDeliveryAddress = useAppSelector((state) => state.user.listDeliveryAddress)

    const [isOpenAddressDetail, setIsOpenAddressDetail] = useState(false)
    const [isEditAddress, setIsEditAddress] = useState(false)
    const [formValues, setformValues] = useState<DeliveryItemInterface>(deliveryItem)
    const [isUpdateAddressDefault, setIsUpdateAddressDefault] = useState(false)
    const [deliveryTime, setDeliveryTime] = useState<string>('')

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

    const createDeliveryAddress = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.createDeliveryAddress({ param, resolve, reject }));
        });
    };

    const updateDefaultDeliveryAddress = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.updateDefaultDeliveryAddress({ param, resolve, reject }));
        });
    };

    const getAllDeliveryAddress = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.getAllDeliveryAddress({ param, resolve, reject }));
        });
    };

    useEffect(() => {
        if (visible) {
            getAllDeliveryAddress({})
            if (isOpenAddressDetail) {
                fetchListCity({})
            }
        }
    }, [visible, isOpenAddressDetail, isUpdateAddressDefault])

    useEffect(() => {
        form.resetFields()
    }, [formValues])

    const handleEditAddress = (item: DeliveryItemInterface) => {
        setIsOpenAddressDetail(true)
        setIsEditAddress(true)
        const listDeliveryTime = item?.delivery_time?.map(item => {
            return moment(item)
        })
        setformValues({ ...item, delivery_time: listDeliveryTime })
        const payload = {
            province_id: item.province_id
        }
        fetchListDistrict(payload).then(() => {
            const payload = {
                district_id: item.district_id
            }
            fetchListWard(payload)
        })
    }

    const onSubmitForm = (values: DeliveryPayloadApi) => {
        if (!isEditAddress) {
            const payload = {
                ...values,
                default_address: (values?.default_address === false || !values?.default_address) ? false : true,
                delivery_time: values?.delivery_time,
            }
            createDeliveryAddress(payload).then(() => {
                setIsOpenAddressDetail(false)
            })
        } else {
            const payload = {
                ...values,
                delivery_address_id: formValues?._id,
                default_address: (values?.default_address === false || !values?.default_address) ? false : true,
                delivery_time: values?.delivery_time,
            }
            updateDefaultDeliveryAddress(payload).then(() => {
                setIsOpenAddressDetail(false)
            })
        }
    }

    const handleSetDefaultAddress = (item: DeliveryItemInterface) => {
        const payload = { ...item, default_address: true, delivery_address_id: item._id }
        updateDefaultDeliveryAddress(payload).then(() => {
            setIsUpdateAddressDefault(!isUpdateAddressDefault)
        })
    }

    const handleCloseModal = () => {
        setIsEditAddress(false)
        setIsOpenAddressDetail(false)
        setVisible(false)
    }

    const handleBackToPreviousForm = () => {
        setIsOpenAddressDetail(false)
        setIsEditAddress(false)
    }

    const handleAddNewAddress = () => {
        setIsEditAddress(false)
        setIsOpenAddressDetail(true)
        setformValues(deliveryItem)
    }

    const handleSelectProvince = (event: string) => {
        const payload = {
            province_id: event
        }
        fetchListDistrict(payload)
    }

    const handleSelectDistrict = (event: string) => {
        const payload = {
            district_id: event
        }
        fetchListWard(payload)
    }

    return (
        <Modal className="modal-address" getContainer={false} title={(visible && !isOpenAddressDetail) ? 'Địa chỉ của tôi' : (isEditAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm mới địa chỉ')} open={visible}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="exit" onClick={() => handleCloseModal()}>
                    Thoát
                </Button>,
                isOpenAddressDetail && <Button key="back" onClick={() => handleBackToPreviousForm()}>
                    Trở lại
                </Button>,
                isOpenAddressDetail && <Button form="basic" key="submit" htmlType="submit">
                    Lưu
                </Button>
            ]}>
            {isOpenAddressDetail ?
                <Form
                    name="basic"
                    initialValues={formValues}
                    validateMessages={validateMessages}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onSubmitForm}
                    form={form}
                >
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <div className="contact-info-title">
                                Thông tin cơ bản
                            </div>
                            <Row className="multiple">
                                <Col span={12}>
                                    <Form.Item
                                        name="full_name"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Input className="form-input" placeholder="Họ Tên" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="phone_number"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Input className="form-input" placeholder="Số điện thoại" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="contact-info-title">
                                Thông tin giao hàng
                            </div>
                            <Row className="multiple">
                                <Col span={24}>
                                    <Form.Item
                                        name="delivery_time"
                                        rules={validateSchema.oldpassword}
                                    >
                                        <TimePicker.RangePicker format="HH:mm:ss" className="form-date" />
                                    </Form.Item>
                                </Col>
                            </Row>
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
                                            filterOption={(input, option:any) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectProvince}
                                        >
                                            {listCity?.map((item:ProvinceInterface, index) => {
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
                                            filterOption={(input, option:any) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectDistrict}
                                        >
                                            {listDistrict?.map((item:DistrictInterface, index) => {
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
                                            filterOption={(input, option:any) =>
                                                removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                            }
                                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                            onChange={handleSelectDistrict}
                                        >
                                            {listWard?.map((item:WardInterface, index) => {
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
                                        name="address_detail"
                                        rules={validateSchema.oldpassword}
                                    >

                                        <Input className="form-input" placeholder="Địa chỉ chi tiết" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="default_address" valuePropName="checked" label="Đặt làm mặc định" className="checkbox">
                                        <Checkbox className="form-checkbox" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Form> :
                <div className="list-address">
                    {!_.isEmpty(listDeliveryAddress) ? listDeliveryAddress?.map((item, index) => {
                        return (
                            <div className="address-item" key={index}>
                                <div className="address-pin">
                                    {item?.default_address && <PushpinFilled />}
                                </div>
                                <div className="address-detail">
                                    <div className="user-info">
                                        <div className="user-name">{item?.full_name}</div>
                                        <div className="user-phone">(+84) {item?.phone_number}</div>                                        
                                    </div>
                                    <div className="full-address">{item?.full_address}</div>
                                    <div className="delivery-time">Thời gian giao: <span>{`${moment(item.delivery_time[0]).format('HH:mm')} - ${moment(item.delivery_time[1]).format('HH:mm')}`}</span></div>
                                    {item?.default_address ? <Button className="is-default" disabled>Mặc định</Button> : <div className="make-default" onClick={() => handleSetDefaultAddress(item)}>Đặt làm mặc định</div>}
                                </div>
                                <div className="actions-button">
                                    <div className="update-address" onClick={() => handleEditAddress(item)}>Cập nhật</div>
                                    <div className="delete-address">Xóa</div>
                                </div>
                            </div>
                        )
                    }) : <Empty className="empty-data" />}
                    <div className="create-new-delivery" onClick={() => handleAddNewAddress()}>
                        <span>Thêm mới địa chỉ</span>
                    </div>
                </div>
            }
        </Modal>
    )
}

export default ModalAddress
