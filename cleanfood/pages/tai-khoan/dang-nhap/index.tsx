/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd'
import {
    SwapLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from 'next/router'
import React from 'react'

const Login = () => {
    const router = useRouter()
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

    return (
        <div className="auth-wrapper">
            <div className="backtohome" onClick={() => router.push("/")}><SwapLeftOutlined /> Back to home page</div>
            <div className="auth-content">
                <div className="auth-title">Hello Again!</div>
                <div className="auth-description">Welcome back you have been missed!</div>
            </div>
            <div className="auth-form">
                <Form
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    validateMessages={validateMessages}
                    layout="vertical"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={validateSchema.oldpassword}
                    >
                        <Input className="form-input" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={validateSchema.oldpassword}
                    >
                        <Input.Password className="form-input" />
                    </Form.Item>
                </Form>

                <Row>
                    <Col span={24} className="auth-button">
                        <Button form="reset_password_form" key="submit" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className="register">
                <span>Nếu bạn chưa có tài khoản ? </span><span className="register-text" onClick={() => router.push("/dang-ky")}>Đăng ký!</span>
            </div>
            <div className="other-auth-wrapper">
                <Divider orientation='center'>Hoặc đăng nhập với</Divider>
                <div className="other-auth">
                    <div className="auth-way google">
                        <img src="../images/google.png" alt="" />
                    </div>
                    <div className="auth-way facebook">
                        <img src="../images/facebook.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="policy">
                Bằng việc nhấp vào nút <span>Đăng ký</span> hoặc <span>Đăng nhập</span> đồng nghĩa với việc bạn đã chấp nhận Điều khoản sử dụng và Chính sách bảo mật của OKXE
            </div>
        </div>
    )
}

export default Login
