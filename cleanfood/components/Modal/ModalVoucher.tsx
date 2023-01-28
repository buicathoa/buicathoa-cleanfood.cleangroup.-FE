/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Col, Drawer, Input, Modal, Row } from 'antd'
import React from 'react'
import { ModalInterface } from '../../interface'

const ModalVoucher = ({ visible, setVisible }: ModalInterface) => {

    const onConfirmOk = () => {

    }

    const onConfirmCancel = () => {
        setVisible(false)
    }

    return (
        <Drawer
        title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        size="large"
        className={visible ? 'active' : 'deactive'}

        // size="large"
        >
            <div className="modal-voucher-content">
                <div className="voucher-manual">
                    <label className="title">Mã Voucher</label>
                    <Input placeholder='Mã Fresh Meals Voucher' className="form-input" />
                    <Button className="apply-button">Áp dụng</Button>
                </div>
                <div className="voucher-list">
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Checkbox value="A" className="form-checkbox">
                            <div className="voucher-item">
                                <img src="images/fresh.png" alt="" />
                                <div className="voucher-item-content">
                                    <div className="voucher-item-content-top">
                                        <span className="voucher-item-title">Giảm 30k</span>
                                        <div className="voucher-item-description">Đơn tối thiểu 0đ</div>
                                    </div>
                                    <div className="voucher-item-expire">HSD: 31.03.2023</div>
                                </div>
                            </div>
                        </Checkbox>
                        <Checkbox value="A" className="form-checkbox">
                            <div className="voucher-item">
                                <img src="images/fresh.png" alt="" />
                                <div className="voucher-item-content">
                                    <div className="voucher-item-content-top">
                                        <span className="voucher-item-title">Giảm 30k</span>
                                        <div className="voucher-item-description">Đơn tối thiểu 0đ</div>
                                    </div>
                                    <div className="voucher-item-expire">HSD: 31.03.2023</div>
                                </div>
                            </div>
                        </Checkbox>
                        <Checkbox value="A" className="form-checkbox">
                            <div className="voucher-item">
                                <img src="images/fresh.png" alt="" />
                                <div className="voucher-item-content">
                                    <div className="voucher-item-content-top">
                                        <span className="voucher-item-title">Giảm 30k</span>
                                        <div className="voucher-item-description">Đơn tối thiểu 0đ</div>
                                    </div>
                                    <div className="voucher-item-expire">HSD: 31.03.2023</div>
                                </div>
                            </div>
                        </Checkbox>
                    </Checkbox.Group>
                </div>
            </div>
            </Drawer>
    )
}

export default ModalVoucher
