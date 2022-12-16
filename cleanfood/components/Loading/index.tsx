import React from 'react'
import ClassNames from 'classnames'
import { useSelector } from 'react-redux'

import { LoadingOutlined } from '@ant-design/icons'

// import './style.scss'

const Loading = () => {
    const loading = useSelector((state) => state.app.isLoading)
    console.log('loading', loading)
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
