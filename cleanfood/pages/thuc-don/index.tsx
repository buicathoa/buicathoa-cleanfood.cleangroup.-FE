import React from 'react'
import {
    LeftOutlined,
    RightOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons"
import { Divider } from 'antd';

const menus = () => {
    return (
        <main className="menu-wrapper">
            <div className="menu-banner">
                <img src="/images/bannerbg.jpg" />
                <div className="menu-banner-content">
                    <div className="title">MEAL PLANS</div>
                    <div className="time-active">21.11 - 25.11</div>
                    <div className="button-order">Đặt ngay</div>
                </div>
            </div>
            <div className="menu-bot-content">
                <div className="menu-timetable">
                <h3 className="menu-title">Thực đơn chung</h3>
                    <div className="quick-view">
                        <div className="previous">
                            <LeftOutlined />
                            <span className="content"> Tuần trước</span>
                        </div>
                        <div className="current">
                            <span className="number">01.03</span>
                            <ArrowRightOutlined />
                            <span className="number">07.03</span>
                        </div>
                        <div className="next">
                            <span className="content"> Tuần sau</span>
                            <RightOutlined />
                        </div>
                    </div>
                    <div className="timetable">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Sáng</th>
                                    <th scope="col">Trưa</th>
                                    <th scope="col">Chiều</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="menu-timetable">
                    <h3 className="menu-title">Thực đơn chay</h3>
                    <div className="quick-view">
                        <div className="previous">
                            <LeftOutlined />
                            <span className="content"> Tuần trước</span>
                        </div>
                        <div className="current">
                            <span className="number">01.03</span>
                            <ArrowRightOutlined />
                            <span className="number">07.03</span>
                        </div>
                        <div className="next">
                            <span className="content"> Tuần sau</span>
                            <RightOutlined />
                        </div>
                    </div>
                    <div className="timetable">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Sáng</th>
                                    <th scope="col">Trưa</th>
                                    <th scope="col">Chiều</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="date"><span>T2 01.03</span></th>
                                    <td>SALAD CÁ NGỪ RAU CỦ</td>
                                    <td>BURGER GÀ LOWCARB</td>
                                    <td>TÔM CHÁY TỎI + COUS COUS</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default menus
