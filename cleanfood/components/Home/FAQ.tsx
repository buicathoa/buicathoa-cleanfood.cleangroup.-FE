import React from 'react'
import { Collapse, Row, Col } from 'antd'
const FAQ = () => {
    const { Panel } = Collapse;
    return (
        <div className="faq-wrapper">
            <span className="bow-decor">🎀</span>
            <div className="faq-content">
                <div className="faq-title">FAQs</div>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Fresh Meals là gì" key="1">
                        <p>Fresh Meals là quần què đó</p>
                    </Panel>
                    <Panel header="Fresh Meals hoạt động thế nào" key="2">
                        <p>Không nha đcm!!!</p>
                    </Panel>
                    <Panel header="Bố láo" key="3">
                        <p>Hihi</p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}

export default FAQ
