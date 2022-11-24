/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Row } from 'antd'
import {
    SwapLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Verify = () => {
    const router = useRouter();
    const [value, setValue] = useState<number[] | []>([])
    const [error, setError] = useState('')
    const validateMessages = {
        required: 'required'
    }

    const onKeyUpEvent = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue: number[] = [...value]
        
        if (value[0] && value[1]&& value[2]&& value[3]&& value[4]) {
            console.log('gọi api')
        } else {
            if (index !== 5) {
                if (newValue[index - 1]) {
                    const currentVal = event.target.value.slice(1)
                    newValue[index - 1] = Number(currentVal)
                    setValue(newValue)
                } else {
                    newValue[index - 1] = Number(event.target.value)
                    setValue(newValue)
                }
                // setValue(newValue)
            } else {
                const currentVal = event.target.value.slice(1)
                newValue[index - 1] = Number(currentVal)
                setValue(newValue)
            }
        }
    }
    // }

    const handleKeyPress = (e, index) => {
        const newValue: number[]  = [...value]
        if (e.keyCode === 8) {
            if (index !== 1) {
                document.getElementById(`verify${index - 1}`)?.focus()
                newValue[index-1] = 3
            }
        } else {
            if (index === 5) {
                document.getElementById(`verify${index}`)?.blur()
            } else {
                document.getElementById(`verify${index + 1}`)?.focus()
            }
        }
    }

    const onFocusEvent = (index) => {
        // const newVal = [...value];
        // if (newVal[index - 1]) {
        //     const currentVal = event.target.value.slice(1)
        //     newVal[index - 1] = Number(currentVal)
        //     setValue(newVal)
        // } else {
        //     newVal[index - 1] = Number(event.target.value)
        //     setValue(newVal)
        // }
    }

    return (
        <div className="auth-wrapper">
            <div className="backtohome" onClick={() => router.push("/")}><SwapLeftOutlined /> Back to home page</div>
            <div className="image-verify">
                <img src="images/verify-account.png" alt="" />
            </div>
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
                    <Row>
                        <Col span={4}>
                            <Input type="number" value={value[0]} maxLength={1} className="form-input" id="verify1" onChange={(e) => onKeyUpEvent(e, 1)} onKeyUp={(e) => handleKeyPress(e, 1)} onFocus={() => onFocusEvent(1)}/>
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[1]} maxLength={1} className="form-input" id="verify2" onChange={(e) => onKeyUpEvent(e, 2)} onKeyUp={(e) => handleKeyPress(e, 2)} onFocus={() => onFocusEvent(2)}/>
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[2]} maxLength={1} className="form-input" id="verify3" onChange={(e) => onKeyUpEvent(e, 3)} onKeyUp={(e) => handleKeyPress(e, 3)} onFocus={() => onFocusEvent(3)}/>
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[3]} maxLength={1} className="form-input" id="verify4" onChange={(e) => onKeyUpEvent(e, 4)} onKeyUp={(e) => handleKeyPress(e, 4)} onFocus={() => onFocusEvent(4)}/>
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[4]} maxLength={1} className="form-input" id="verify5" onChange={(e) => onKeyUpEvent(e, 5)} onKeyUp={(e) => handleKeyPress(e, 5)} onFocus={() => onFocusEvent(5)}/>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="register">
                <span>Nếu bạn chưa có tài khoản ? </span><span className="register-text" onClick={() => router.push("/dang-ky")}>Đăng ký!</span>
            </div>
            <div className="other-auth-wrapper">
                <Divider orientation='center'>Hoặc đăng nhập với</Divider>
                <div className="other-auth">
                    <div className="auth-way google">
                        <img src="images/google.png" alt="" />
                    </div>
                    <div className="auth-way facebook">
                        <img src="images/facebook.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="policy">
                Bằng việc nhấp vào nút <span>Đăng ký</span> hoặc <span>Đăng nhập</span> đồng nghĩa với việc bạn đã chấp nhận Điều khoản sử dụng và Chính sách bảo mật của OKXE
            </div>
        </div>
    )
}

export default Verify
