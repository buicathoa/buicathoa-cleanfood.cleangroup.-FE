import React from 'react'
import ClassNames from 'classnames'
import { useSelector } from 'react-redux'

import { LoadingOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../reducer/hook'

// import './style.scss'

const Loading = () => {
    const loading = useAppSelector((state) => state.app.isLoading)
    return (
        <div className={ClassNames('loading-content', !loading && 'hiden')}>
            <div className="wrap">
                <div className="loading">
                    <div className="text">
                        <LoadingOutlined /> Connect247
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
