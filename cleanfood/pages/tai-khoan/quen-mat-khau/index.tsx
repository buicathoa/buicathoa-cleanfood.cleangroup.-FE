/* eslint-disable @next/next/no-img-element */
import { SwapLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const ForgetPassword = () => {
    const router = useRouter();
    return (
        <div className="auth-wrapper">
            <div className="backtohome" onClick={() => router.push("/")}><SwapLeftOutlined /> Back to home page</div>
            <div className="image-verify">
                <img src="../images/forgot-password.png" alt="" />
            </div>
            <div className="auth-content">
                <div className="auth-title">Hello Again!</div>
                <div className="auth-description">Fill your phone number to recovery password!</div>
            </div>
            <div className="auth-form">
                <Input placeholder='Vui lòng nhập số điện thoại' />
            </div>
        </div>
    )
}

export default ForgetPassword
