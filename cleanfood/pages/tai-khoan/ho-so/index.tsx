/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Button, Col, Form, Input, Radio, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { CameraOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../reducer/hook';
import { UserActions } from '../../../reducer/userReducer';
import { ResponseFormatItem } from '../../../interface';
import AddressItem from '../../../components/AddressItem';
import ModalAddress from '../../../components/ModalAddress';
const Profile = () => {
    const router = useRouter()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [fieldnameEdit, setFieldnameEdit] = useState('')
    const [formValues, setFormvalues] = useState({})
    const [gender, setGender] = useState('')

    const user = useAppSelector((state) => state.user.user)
    const listDeliveryAddress = useAppSelector((state) => state.user.listDeliveryAddress)

    const updateUser = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.updateUser({ param, resolve, reject }));
        });
    };

    const uploadAvatar = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.uploadAvatar({ param, resolve, reject }));
        });
    };

    const getAllDeliveryAddress = (param: any): Promise<ResponseFormatItem> => {
        return new Promise((resolve, reject) => {
            dispatch(UserActions.getAllDeliveryAddress({ param, resolve, reject }));
        });
    };

    useEffect(() => {
        if (!Cookies.get('cleanfood')) {
            router.push('/tai-khoan/dang-nhap')
        } else {
            getAllDeliveryAddress({})
        }
    }, [])

    useEffect(() => {
        if (user) {
            setFormvalues(user)
            setGender(user?.gender)
            setAvatar(user?.avatar)
        }
    }, [user])

    useEffect(() => {
        form.resetFields()
    }, [formValues])

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

    const onSubmitFile = (event:React.FormEvent) => {
        const formData = new FormData()
        const inputRef = event.target as HTMLInputElement;
        if(inputRef.files !== null){
            
            formData.append('image', inputRef.files[0])
        }
        uploadAvatar(formData).then((res:any) => {
            setAvatar(res?.data)
        })
    }

    const onSubmitForm = (values) => {
        updateUser({ ...values, gender: gender })
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value)
        updateUser({ gender: event.target.value })
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-section section">
                <h3 className="title">Thông tin cá nhân</h3>
                <div className="profile-avatar">
                    <img src={avatar ? avatar : '../images/default-avatar.jpg'} alt="" />
                    <label htmlFor="upload_avatar">
                        <CameraOutlined />
                    </label>
                    <div className="avatar_url">
                        <input
                            className="input-file"
                            type="file"
                            id="upload_avatar"
                            onChange={(e) => onSubmitFile(e)}
                            onClick={(event) => {
                                event.target.value = ''
                            }}
                        />
                    </div>
                </div>
                <div className="profile-information-content">
                    <Form
                        name="profile_form"
                        form={form}
                        initialValues={formValues}
                        validateMessages={validateMessages}
                        onFinish={onSubmitForm}
                        autoComplete="off"
                        requiredMark={false}
                        layout="horizontal"
                    >
                        <Row>
                            <Col span={24}>
                                <div className="flex-profile-item none">
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                    >
                                        {fieldnameEdit === 'username' ? <Input className="form-input" placeholder='username' /> :
                                            (<div className="field-wrapper">
                                                <span className="field-value">{formValues?.username}</span>
                                            </div>)}
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className={`flex-profile-item ${fieldnameEdit === 'firstname' ? 'none' : 'flex'}`}>
                                    <Form.Item
                                        label="First Name"
                                        name="firstname"

                                    >
                                        <Input className={`form-input ${fieldnameEdit === 'firstname' ? 'displayed' : 'none'}`} placeholder='Họ' />

                                    </Form.Item>
                                    <div className={`field-wrapper ${fieldnameEdit !== 'firstname' ? 'displayed' : 'none'}`}>
                                        <span className="field-value">{formValues?.firstname}</span><EditOutlined onClick={() => setFieldnameEdit('firstname')} />
                                    </div>
                                </div>
                                <div className={`action-buttons ${fieldnameEdit === 'firstname' ? 'displayed' : 'none'}`}>
                                    <Button form="profile_form" key="submit" htmlType="submit">
                                        Lưu
                                    </Button>
                                    <Button key="back" onClick={() => setFieldnameEdit('')}>
                                        Hủy
                                    </Button>,
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className={`flex-profile-item ${fieldnameEdit === 'lastname' ? 'none' : 'flex'}`}>
                                    <Form.Item
                                        label="Last Name"
                                        name="lastname"

                                    >
                                        <Input className={`form-input ${fieldnameEdit === 'lastname' ? 'displayed' : 'none'}`} placeholder='Tên' />

                                    </Form.Item>
                                    <div className={`field-wrapper ${fieldnameEdit !== 'lastname' ? 'displayed' : 'none'}`}>
                                        <span className="field-value">{formValues?.lastname}</span><EditOutlined onClick={() => setFieldnameEdit('lastname')} />
                                    </div>
                                </div>
                                <div className={`action-buttons ${fieldnameEdit === 'lastname' ? 'displayed' : 'none'}`}>
                                    <Button form="profile_form" key="submit" htmlType="submit">
                                        Lưu
                                    </Button>
                                    <Button key="back" onClick={() => setFieldnameEdit('')}>
                                        Hủy
                                    </Button>,
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className={`flex-profile-item ${fieldnameEdit === 'phone_number' ? 'none' : 'flex'}`}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone_number"

                                    >
                                        <Input className={`form-input ${fieldnameEdit === 'phone_number' ? 'displayed' : 'none'}`} placeholder='Số điện thoại' />

                                    </Form.Item>
                                    <div className={`field-wrapper ${fieldnameEdit !== 'phone_number' ? 'displayed' : 'none'}`}>
                                        <span className="field-value">{formValues?.phone_number}</span><EditOutlined onClick={() => setFieldnameEdit('phone_number')} />
                                    </div>
                                </div>
                                <div className={`action-buttons ${fieldnameEdit === 'phone_number' ? 'displayed' : 'none'}`}>
                                    <Button form="profile_form" key="submit" htmlType="submit">
                                        Lưu
                                    </Button>
                                    <Button key="back" onClick={() => setFieldnameEdit('')}>
                                        Hủy
                                    </Button>,
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="flex-profile-item none">
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"
                                    >
                                        <Radio.Group className="custom-radio-group" value={gender} onChange={handleChangeGender}>
                                            <Radio value={'male'} className="custom-radio">Nam</Radio>
                                            <Radio value={'female'} className="custom-radio">Nữ</Radio>
                                            <Radio value={'other'} className="custom-radio">Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        {/* <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Địa chỉ"
                                name="full_address
                            >
                                {fieldnameEdit === 'full_address' ? <Input className="form-input" placeholder='Địa chỉ' /> : (<div className="field-wrapper">
                                    <span className="field-value">{formValues?.full_address}</span><EditOutlined />
                                </div>)}
                            </Form.Item>
                        </Col>
                    </Row> */}
                    </Form>
                </div>
            </div>
            <div className="contact-decor"></div>
            <div className="delivery-info-section section">
                <h3 className="title">Thông tin giao hàng</h3>
                <div className="delivery-info-content">
                    <AddressItem isOpenAddressModal={isOpenAddressModal} setIsOpenAddressModal={setIsOpenAddressModal} listDeliveryAddress={listDeliveryAddress}/>
                </div>
            </div>
            <ModalAddress visible={isOpenAddressModal} setVisible={setIsOpenAddressModal} />
        </div>
    )
}

export default Profile
