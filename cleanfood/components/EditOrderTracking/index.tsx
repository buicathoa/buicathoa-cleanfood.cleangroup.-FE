/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Button, Col, Form, Input, Row, Select } from 'antd'

import { GeneralMenuActions } from '../../reducer/generalMenuReducer'
import { useAppDispatch, useAppSelector } from '../../reducer/hook'
import { LocationActions } from '../../reducer/LocationReducer'

import { DistrictInterface, EditOrderTrackingInterface, OrderTrackingInterface, ProvinceInterface, ResponseFormatItem, ResponseFormatListInterface, ResponseFormatObjectItemInterface, WardInterface } from '../../interface'

import { removeAccentsToLower } from '../../utils/string'

const EditOrderTracking = ({ trackingDaySelected, setIsEditTrackingOrder }: EditOrderTrackingInterface) => {
    const dispatch = useAppDispatch()
    const [formValues, setformValues] = useState<OrderTrackingInterface>({})

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

    const getOneDayRegister = (param: any): Promise<ResponseFormatObjectItemInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.getOneDayRegister({ param, resolve, reject }));
        });
    };


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

    const updateDaysRegister = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.updateDaysRegister({ param, resolve, reject }));
        });
    };


    const [form] = Form.useForm()
    const { Option } = Select

    useEffect(() => {
        form.resetFields()
    }, [formValues])

    useEffect(() => {
        const payload = { order_tracking_id: trackingDaySelected }
        getOneDayRegister(payload).then(res => {
            setformValues(res?.data)
        })
    }, [])

    useEffect(() => {
        if (Object.keys(formValues)?.length > 0) {
            const payloadDistrict = {
                province_id: formValues.province_id
            }

            const payloadWard = {
                district_id: formValues.district_id
            }
            fetchListCity({})
            fetchListDistrict(payloadDistrict)
            fetchListWard(payloadWard)
        }
    }, [formValues])

    const listCity = useAppSelector((state) => state.location.listCity)
    const listDistrict = useAppSelector((state) => state.location.listDistrict)
    const listWard = useAppSelector((state) => state.location.listWard)

    const handleSelectProvince = (event: string) => {
        const payload = { province_id: event }
        fetchListDistrict(payload)
    }

    const handleSelectDistrict = (event: string) => {
        const payload = { district_id: event }
        fetchListWard(payload)
    }

    const onSubmitForm = (values: OrderTrackingInterface) => {
        const payload = { ...values, order_tracking_id: trackingDaySelected }
        updateDaysRegister(payload).then(() => {
            setIsEditTrackingOrder(false)
        })
    }

    const handleBackToTrackingOrder = () => {
        setIsEditTrackingOrder(false)
    }

    return (
        <div className="edit-tracking-order-content">
            <div className="edit-tracking-order-content-header">
                <h3>Chỉnh sửa</h3>
            </div>
            <div className="tracking-delivery-image">
                <img src="../images/tracking-delivery.png" alt="" />
            </div>
            <Form
                name="modal_edit_tracking_order"
                initialValues={formValues}
                validateMessages={validateMessages}
                layout="vertical"
                autoComplete="off"
                onFinish={onSubmitForm}
                form={form}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Calories"
                            name="calories"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Calories" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Buổi ăn"
                            name="session"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Buổi ăn" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Thời hạn"
                            name="mealplans"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Thời hạn gói" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Người nhận"
                            name="full_name"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Người nhận" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone_number"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Số điện thoại" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="province_id"
                            rules={validateSchema.oldpassword}
                            label="Tỉnh / Thành phố"
                        >

                            <Select
                                className="form-select"
                                placeholder={"Tỉnh / Thành phố"}
                                allowClear
                                virtual={false}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option: any) =>
                                    removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                }
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                onChange={handleSelectProvince}
                            >
                                {listCity?.map((item: ProvinceInterface, index) => {
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
                            label="Quận / huyện"
                        >

                            <Select
                                className="form-select"
                                placeholder={"Quận / Huyện"}
                                allowClear
                                virtual={false}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option: any) =>
                                    removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                }
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                onChange={handleSelectDistrict}
                            >
                                {listDistrict?.map((item: DistrictInterface, index) => {
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
                            label="Phường / xã"
                        >

                            <Select
                                className="form-select"
                                placeholder={"Phường / Xã"}
                                allowClear
                                virtual={false}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option: any) =>
                                    removeAccentsToLower(option.children).indexOf(removeAccentsToLower(input)) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA?.children?.toLowerCase().localeCompare(optionB?.children?.toLowerCase())
                                }
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            >
                                {listWard?.map((item: WardInterface, index) => {
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
                            label="Địa chỉ chi tiết"
                            name="address_detail"
                            rules={validateSchema.oldpassword}
                        >

                            <Input className="form-input" placeholder="Địa chỉ chi tiết" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className="footer-button">
                <Button className="cancel-order">
                    Hủy ngày này
                </Button>,
                <Button key="Cancel" className="cancel"  onClick={() => handleBackToTrackingOrder()}>
                    Hủy
                </Button>,
                <Button className="submit" form="modal_edit_tracking_order" key="submit" htmlType="submit">
                    OK
                </Button>
            </div>
        </div>
    )
}

export default EditOrderTracking
