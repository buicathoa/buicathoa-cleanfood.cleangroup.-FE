/* eslint-disable @next/next/no-img-element */
import { Button, Form, InputNumber, Radio, RadioChangeEvent, Slider } from 'antd'
import {
    SwapLeftOutlined,
} from "@ant-design/icons";
import React, { useState } from 'react'
import { useRouter } from 'next/router';

const Calories = () => {
    const router = useRouter()
    const [genderSelected, setGenderSelected] = useState('male')
    const [currentCalories, setCurrentCalories] = useState<number>()
    const [dietCalories, setDietCalories] = useState<number>()
    const [growthCalories, setGrowthCalories] = useState<number>()
    const calories = [
        1100, 1500, 2000, 2500, 3000
    ]

    const validateMessages = {
        required: 'required'
    }

    const validateSchema = {
        age: [
            {
                required: true
            }
        ],
        height: [
            {
                required: true
            }
        ],
        weight: [
            {
                required: true
            }
        ],
        exercise: [
            {
                required: true
            }
        ]
    }

    const handleSelectGender = (e: RadioChangeEvent): void => {
        setGenderSelected(e.target.value)
    }

    const onSubmitForm = (e: any) => {
        let result: number
        if (genderSelected === 'male') {
            result = (((10 * e?.weight) + (6.25 * e?.height) - (5 * e?.age)) - 161) * e?.exercise
        } else {
            result = (((10 * e?.weight) + (6.25 * e?.height) - (5 * e?.age)) + 5) * e?.exercise
        }
        const currentCalories: number = Math.floor(result)
        setCurrentCalories(currentCalories)
        const closest = calories.filter(item => item < currentCalories).at(-1);
        setDietCalories(closest !== null ? closest : 0)
        const growthest = calories.filter(item => item < currentCalories).at(0)
        setGrowthCalories(growthest !== null ? growthest : 0)
    }

    return (
        <div className="calories-wrapper">
            <div className="backtohome" onClick={() => router.push("/")}><SwapLeftOutlined /> Back to home page</div>
            <div className="calories-content">
                <h3 className="gender">Giới tính</h3>
                <div className="gender-selection">
                    <Radio.Group value={genderSelected} onChange={handleSelectGender} className="custom-radio-group-btn">
                        <Radio.Button value="male" className='custom-radio-btn'>
                            Nam
                        </Radio.Button>
                        <Radio.Button value="female" className='custom-radio-btn'>
                            Nữ
                        </Radio.Button>
                    </Radio.Group>
                    {/* <div className={`gender-item ${genderSelected === 'male' && 'selected'}`} onClick={() => handleSelectGender('male')}><span>Nam</span></div>
                    <div className={`gender-item ${genderSelected === 'female' && 'selected'}`} onClick={() => handleSelectGender('female')} ><span>Nữ</span></div> */}
                </div>
                <div className="gender-image">
                    <img src={`../images/${genderSelected === 'female' ? 'girl.png' : 'male.jpg'}`} alt="" />
                </div>
                <Form
                    name="calculate-calories"
                    initialValues={{ remember: true }}
                    validateMessages={validateMessages}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={(e) => onSubmitForm(e)}
                >
                    <div className="category-input">
                        <div className="category">
                            <h3>Tuổi</h3>
                            <div className="item-selection">
                                <Form.Item
                                    name="age"
                                    rules={validateSchema.age}
                                >
                                    <InputNumber placeholder='Press your age' className="form-input" prefix="Age" type="number" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="category">
                            <h3>Chiều cao</h3>
                            <div className="item-selection">
                                <Form.Item
                                    name="height"
                                    rules={validateSchema.height}
                                >
                                    <InputNumber placeholder='Press your height' prefix="Cm" className="form-input" type="number" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="category">
                            <h3>Cân nặng</h3>
                            <div className="item-selection">
                                <Form.Item
                                    name="weight"
                                    rules={validateSchema.weight}
                                >
                                    <InputNumber placeholder='Press your weight' prefix="Kg" className="form-input" type="number" />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <h3>Tần suất tập thể dục trong ngày của bạn</h3>
                        <Form.Item
                            name="exercise"
                            rules={validateSchema.exercise}
                        >
                            <Radio.Group>
                                <Radio.Button value={1.2}>Không vận động</Radio.Button>
                                <Radio.Button value={1.375}>Vận động nhẹ nhưng không liên tục</Radio.Button>
                                <Radio.Button value={1.55}>3 - 5 lần / tuần</Radio.Button>
                                <Radio.Button value={1.725}>Hằng ngày</Radio.Button>
                                <Radio.Button value={1.9}>Tính chất công việc hoạt động nhiều</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </Form>
                {currentCalories &&
                    <div className="note-advice">
                        <span className="note-advice-wrapper">Số lượng calories bạn cần nạp mỗi ngày là: <span className="number">{`${currentCalories} kcal`}</span></span>
                        {dietCalories !== 0 && <span className="note-advice-wrapper">Nếu muốn giảm cân bạn nên chọn gói: <span className="number">{`${dietCalories} kcal`}</span></span>}
                        {growthCalories !== 0 && <span className="note-advice-wrapper">Nếu muốn tăng cân bạn nên chọn gói: <span className="number">{`${growthCalories} kcal`}</span></span>}
                    </div>}
                {currentCalories && <div className="calo-directional">
                    <div className="button" onClick={() => router.back()}>Trở lại đặt hàng</div>
                    <div className="button">Chat với chuyên gia</div>
                </div>}
                <Button className="calculate-button" form="calculate-calories" key="submit" htmlType="submit">
                    Tính toán
                </Button>
            </div>
        </div>
    )
}

export default Calories
