/* eslint-disable @next/next/no-img-element */
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Row } from 'antd'
import {
    SwapLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Verify = () => {
    const router = useRouter();
    const [value, setValue] = useState<string[] | []>(['','','','',''])
    const validateMessages = {
        required: 'required'
    }

    const onKeyUpEvent = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue: string[] = [...value]
        if(event.target.value.length === 5) {
            for(let i = 0; i < event.target.value.length; i++) {
                newValue[i] = event.target.value[i]
            }
            setValue(newValue)
        }else {
            if (index !== 5) {
                if (newValue[index - 1]) {
                    const currentVal = (event.target as HTMLInputElement).value.slice(1)
                    newValue[index - 1] = currentVal
                    setValue(newValue)
                } else {
                    newValue[index - 1] = (event.target.value)
                    setValue(newValue)
                }
            } else {
                if(newValue[index - 1]){
                    const currentVal = (event.target as HTMLInputElement).value.slice(1)
                    newValue[index - 1] = currentVal
                    setValue(newValue)
                }else {
                    const currentVal = event.target.value
                    newValue[index - 1] = currentVal
                    setValue(newValue)
                }
            }
            const indexs = value.findIndex(item => item === '')
            if((value.filter(item => item === '' ).length === 1 && indexs === index - 1) || (value.filter(item => item === '' ).length === 0 && event.target.value !== '')){
                console.log('goi api')
            }
        }
    }
    // }

    const handleKeyPress = (e:React.KeyboardEvent, index:number) => {
        const newValue: string[] = [...value]
        if (e.key === 'Backspace') {
            if (index !== 1) {
                newValue[index - 1] = ""
                setValue(newValue)
                document.getElementById(`verify${index - 1}`)?.focus()
            }
        } else {
            if ((e.target as HTMLInputElement).value !== '') {
                if (index === 5) {
                    document.getElementById(`verify${index}`)?.blur()
                } else {
                    document.getElementById(`verify${index + 1}`)?.focus()
                }
            }
        }
    }

    const handleSubmitVerify = () => {
        console.log('value', value)
    }

    return (
        <div className="auth-wrapper">
            <div className="backtohome" onClick={() => router.push("/")}><SwapLeftOutlined /> Back to home page</div>
            <div className="image-verify">
                <img src="../images/verify-account.png" alt="" />
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
                            <Input type="number" value={value[0]} maxLength={1} className="form-input" id="verify1" onChange={(e) => onKeyUpEvent(e, 1)} onKeyUp={(e) => handleKeyPress(e, 1)} />
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[1]} maxLength={1} className="form-input" id="verify2" onChange={(e) => onKeyUpEvent(e, 2)} onKeyUp={(e) => handleKeyPress(e, 2)} />
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[2]} maxLength={1} className="form-input" id="verify3" onChange={(e) => onKeyUpEvent(e, 3)} onKeyUp={(e) => handleKeyPress(e, 3)} />
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[3]} maxLength={1} className="form-input" id="verify4" onChange={(e) => onKeyUpEvent(e, 4)} onKeyUp={(e) => handleKeyPress(e, 4)} />
                        </Col>
                        <Col span={4}>
                            <Input type="number" value={value[4]} maxLength={1} className="form-input" id="verify5" onChange={(e) => onKeyUpEvent(e, 5)} onKeyUp={(e) => handleKeyPress(e, 5)} />
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span={24} className="auth-button verify">
                        <Button onClick={() => handleSubmitVerify()}>
                            Xác nhận
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

export default Verify
