/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Empty, Form, Input, Modal, Row, Select, TimePicker } from 'antd'
import {
    PushpinFilled
} from "@ant-design/icons";
import moment from 'moment'
import _ from 'lodash'

import { DeliveryItemInterface, DeliveryPayloadApi, DistrictInterface, ModalInterface, ModalTrackingOrderInterface, ProvinceInterface, ResponseFormatItem, ResponseFormatListInterface, WardInterface } from '../../interface';

import { useAppDispatch, useAppSelector } from '../../reducer/hook';
import { LocationActions } from '../../reducer/LocationReducer';
import { UserActions } from '../../reducer/userReducer';

import { removeAccentsToLower } from '../../utils/string';
import { deliveryItem } from '../../constants';
import { GeneralMenuActions } from '../../reducer/generalMenuReducer';

const ModalTrackingOrder = ({ visible, setVisible, trackingDaySelected }: ModalTrackingOrderInterface) => {
    const { Option } = Select
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const listCity = useAppSelector((state) => state.location.listCity)
    const listDistrict = useAppSelector((state) => state.location.listDistrict)
    const listWard = useAppSelector((state) => state.location.listWard)

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

    const [formValues, setformValues] = useState({})

    const getDaysRegister = (param: any): Promise<ResponseFormatListInterface> => {
        return new Promise((resolve, reject) => {
            dispatch(GeneralMenuActions.getDaysRegister({ param, resolve, reject }));
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

    useEffect(() => {
        form.resetFields()
    }, [formValues])

    useEffect(() => {
        if (visible) {
            const payload = { order_status: "ready", _id: trackingDaySelected }
            getDaysRegister(payload).then(res => {
                setformValues(res?.data![0])
            })
        }
    }, [visible])

    useEffect(() => {
        if(formValues){
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

    const handleCloseModal = () => { }

    const onSubmitForm = () => {

    }

    const handleSelectProvince = () => {}

    const handleSelectDistrict = () => {}

    const handleSelectWards = () => {

    }

    return (
        <Modal className="modal-tracking-order" getContainer={false} title={'test chơi'} open={visible}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="exit" onClick={() => handleCloseModal()}>
                    Thoát
                </Button>,
            ]}>
            <Form
                name="basic"
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
                            label="Thời hạn gói"
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
                                onChange={handleSelectWards}
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
        </Modal>
    )
}

export default ModalTrackingOrder
