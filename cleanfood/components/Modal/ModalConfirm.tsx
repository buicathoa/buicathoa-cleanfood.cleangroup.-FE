/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

import { Modal, Button, Checkbox, Radio, RadioChangeEvent } from 'antd'
import { ModalInterfaceConfirm } from '../../interface'

// import './style.scss'

const ModalConfirm = ({ title, visible, setVisible, onConfirmModal, onConfirmCancelModal, confirmTitle, confirmContent, modalType }: ModalInterfaceConfirm) => {
    const listReason = [
        { label: 'Không phù hợp đồ ăn', value: 'food_not_suitable' },
        { label: 'Bận việc đột xuất', value: 'extraordinarily_busy' },
    ]
    const [isOpenReasonForCancel, setIsOpenReasonForCancel] = useState(false)
    const onConfirmOk = () => {
        modalType === 'cancel_order' ? setIsOpenReasonForCancel(true)
        : modalType === 'recover_order' ? onConfirmModal('') : onConfirmModal('')
        
    }

    const handleChangeReason = (event: RadioChangeEvent): void => {
        onConfirmModal(event.target.value)
    }

    const onConfirmCancel = () => {
        setVisible(false)
    }

    return (
        <>
            <Modal
                className="modal-confirm-container"
                title={title}
                visible={visible}
                onOk={() => onConfirmOk()}
                onCancel={() => onConfirmCancel()}
                footer={!isOpenReasonForCancel && [
                    <Button key="Cancel" onClick={() => onConfirmCancel()}>
                        Hủy
                    </Button>,
                    <Button className="modal-confirm-delete-btn" key="Delete-cart-item" onClick={() => onConfirmOk()}>
                        Xóa
                    </Button>
                ]}
            >
                {!isOpenReasonForCancel ? <div className="modal-confirm-content-container">
                    <img src="../images/delete.png" alt="icon delete confirm"></img>
                    <h4>{confirmTitle}</h4>
                    <h5>{confirmContent}</h5>
                </div> :
                    <div className="reason-wrapper">
                        <Radio.Group style={{ width: '100%' }} onChange={handleChangeReason}>
                            {listReason.map((item, index) => {
                                return (
                                    <Radio value={item.value} className="form-radio" key={index}>{item.label}</Radio>
                                )
                            })}
                        </Radio.Group>
                    </div>
                }
            </Modal>
        </>
    )
}

export default ModalConfirm
