/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
    LeftOutlined,
    RightOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons"
import moment from 'moment'
import 'moment/locale/vi'
import { useAppDispatch } from "../../reducer/hook";
import { listMenuTableData, MenuTableDataItem, ResponseFormatItem, titleHeaders } from '../../interface';
import { GeneralMenuActions } from '../../reducer/generalMenuReducer';
import TableMenu from '../../components/TableMenu';
import { apiRequest } from '../../utils/apiRequest';
import { apiUrl } from '../../constants';
import { AxiosResponse } from 'axios';


export const getServerSideProps  = async () => {

    const listMenu = await apiRequest(
      apiUrl.generalMenus.getAll,
      {},
      'general'
    )
    const {data}:AxiosResponse = listMenu
    return {
      props: {
        listMenu: data || undefined,
      },
    };
  }

const Menus = ({listMenu}: listMenuTableData) => {
    console.log('listMenu', listMenu)
    const dispatch = useAppDispatch();

    const titleHeader: titleHeaders[] = [
        {key: '', label: ''},
        {key: "breakfast_vi", label: "Sáng"},
        {key: "lunch_vi", label: "Trưa"},
        {key: "dinner_vi", label: "Tối"}
    ]

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
                            <span className="number">{listMenu?.length > 0 && moment(listMenu[0]?.date).locale("Vi").format("DD-MM")}</span>
                            <ArrowRightOutlined />
                            <span className="number">{listMenu?.length > 0 && moment(listMenu[listMenu.length - 1]?.date).locale("Vi").format("DD-MM")}</span>
                        </div>
                        <div className="next">
                            <span className="content"> Tuần sau</span>
                            <RightOutlined />
                        </div>
                    </div>
                    <TableMenu listMenu={listMenu} titleHeader={titleHeader} type="menu"/>
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
                </div>
            </div>
        </main>
    )
}

export default Menus
