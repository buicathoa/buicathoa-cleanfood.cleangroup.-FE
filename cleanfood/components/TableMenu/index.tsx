import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { MenuTableData, titleHeaders } from '../../interface'

const TableData = ({listMenu, titleHeader, type} : MenuTableData) => {
    return (
        <div className="tabledata">
            <table>
                <thead>
                    <tr>
                        {titleHeader.length > 0 && titleHeader?.map((item, index) => {
                            return (
                                <th key={index}>{item?.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {listMenu?.length > 0 && listMenu?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row" className="date"><span>{moment(item?.date).locale("Vi").format("dd DD-MM")}</span></th>
                                {titleHeader.map((header, headerIndex) => {
                                    if(type === 'menu'){
                                        if(headerIndex === 0){
                                            return
                                        } else {
                                            return (
                                                <td key={headerIndex}>{item[header.key as keyof undefined]}</td>
                                            )
                                        }
                                    } else {
                                        return (
                                            <td key={headerIndex}>{item[header.key as keyof undefined]}</td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableData