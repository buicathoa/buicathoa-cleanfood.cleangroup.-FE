/* eslint-disable @next/next/no-img-element */
import React from 'react'

import { Modal, Button } from 'antd'
import { ModalConfirm } from '../../interface'

// import './style.scss'

const ModalConfirm = ({title, isOpenConfirmModal, onConfirmOk, onConfirmCancel, confirmTitle, confirmContent} : ModalConfirm) => {
    return (
        <>
            <Modal
                className="modal-confirm-container"
                title={title}
                visible={isOpenConfirmModal}
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
                <div className="modal-confirm-content-container">
                    <img src="images/delete.png" alt="icon delete confirm"></img>
                    <h4>{confirmTitle}</h4>
                    <h5>{confirmContent}</h5>
                </div>
            </Modal>
        </>
    )
}

export default ModalConfirm
