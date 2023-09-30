import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'SERVICES/i18n'
import { Col , Row} from 'react-bootstrap'

import "./CustomViewOnly.scss";

const CustomViewOnly = props => {
    return (
        <div className='custom-view-only'>
            <Row>
                {props?.viewList.map((item, index) => {
                    return <Col hidden={item?.isHidden} md={props?.colClass} key={index} className="mb-3">
                        <div className="element-label">
                            {translate(item.label)}
                        </div>
                        <div className={`element-details ${props?.valueClassName}`}>
                            {item.value}
                        </div>
                    </Col>
                })}

            </Row>
        </div>
    )
}

CustomViewOnly.propTypes = {
    viewList: PropTypes.array,
    valueClassName: PropTypes.any,
    colClass: PropTypes.any
}

export default CustomViewOnly