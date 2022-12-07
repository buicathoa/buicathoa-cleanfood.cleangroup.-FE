/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    DeleteOutlined,
} from "@ant-design/icons";

const Notification = () => {
    return (
        <div className="notification-wrapper">
            <div className="notification-header">
                {/* <div className="notification-title">
                    Notifications
                </div> */}
                <div className="notification-header-container">
                    <div className="noti-tab active">Unread</div>
                    <div className="noti-tab">All</div>
                </div>
            </div>
            <div className="notification-list">
                <div className="notification-container">
                    <div className="notification-item">
                        <div className="noti-main-content">
                            <div className="avatar">
                                <img src="images/haha.jpg" alt="" />
                            </div>
                            <div className="content">
                                <div className="noti-content">Cat Hoa Bui invite you to ingredientsFC</div>
                                <div className="noti-desc">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</div>
                                <div className="noti-time">9h ago - Notes</div>
                            </div>
                        </div>
                        <DeleteOutlined />
                    </div>
                    <div className="notification-item">
                        <div className="noti-main-content">
                            <div className="avatar">
                                <img src="images/haha.jpg" alt="" />
                            </div>
                            <div className="content">
                                <div className="noti-content">Cat Hoa Bui invite you to ingredientsFC</div>
                                <div className="noti-desc">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</div>
                                <div className="noti-time">9h ago - Notes</div>
                            </div>
                        </div>
                        <DeleteOutlined />
                    </div>
                    <div className="notification-item">
                        <div className="noti-main-content">
                            <div className="avatar">
                                <img src="images/haha.jpg" alt="" />
                            </div>
                            <div className="content">
                                <div className="noti-content">Cat Hoa Bui invite you to ingredientsFC</div>
                                <div className="noti-desc">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</div>
                                <div className="noti-time">9h ago - Notes</div>
                            </div>
                        </div>
                        <DeleteOutlined />
                    </div>
                    <div className="notification-item">
                        <div className="noti-main-content">
                            <div className="avatar">
                                <img src="images/haha.jpg" alt="" />
                            </div>
                            <div className="content">
                                <div className="noti-content">Cat Hoa Bui invite you to ingredientsFC</div>
                                <div className="noti-desc">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</div>
                                <div className="noti-time">9h ago - Notes</div>
                            </div>
                        </div>
                        <DeleteOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification