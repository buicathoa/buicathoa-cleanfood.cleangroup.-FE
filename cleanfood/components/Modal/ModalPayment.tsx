/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Col, Input, Modal, Radio, RadioChangeEvent, Row } from 'antd'
import React from 'react'
import { ModalInterface, ModalPaymentInterface } from '../../interface'

const ModalPayment = ({ visible, setVisible, paymentSelected, setPaymentSelected }: ModalPaymentInterface) => {
    const listPaymentMethods = [{ name: 'Momo - 0909370002 (Bùi Cát Hòa)', value: 'momo' }, { name: 'COD', value: 'cod' }]

    const onChangePaymentMethods = (e: RadioChangeEvent):void => {
        const paymentFound = listPaymentMethods.find(item => item.value === e.target.value)
        setPaymentSelected(paymentFound!)
    }

    const onConfirmOk = () => {
        setVisible(false)
    }

    const onConfirmCancel = () => {
        setVisible(false)
    }

    return (
        <Modal
            className="modal-payment-container"
            title={'Payment'}
            visible={visible}
            onOk={() => onConfirmOk()}
            onCancel={() => onConfirmCancel()}
            footer={[
                <Button key="Cancel" onClick={() => onConfirmCancel()}>
                    Hủy
                </Button>,
                <Button className="modal-confirm-delete-btn" key="Delete" onClick={() => onConfirmOk()}>
                    Xóa
                </Button>
            ]}
        >
            <div className="payment-content">
                <div className="payment-title">Phương thức thanh toán</div>
                <div className="payment-method-selection">
                    <Radio.Group value={paymentSelected?.value} onChange={onChangePaymentMethods} className="custom-radio-group">
                        {listPaymentMethods.map((item, index) => {
                            return (
                                <div className="payment-method-item" key={index}>
                                    <Radio value={item.value} className="custom-radio">{item.name}</Radio>
                                </div>
                            )
                        })}
                    </Radio.Group>
                </div>
            </div>
        </Modal>
    )
}

export default ModalPayment
