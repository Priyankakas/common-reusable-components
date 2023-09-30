import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledTooltip } from "reactstrap";

import "./CustomTooltip.scss";
import { translate } from 'SERVICES/i18n';

const CustomTooltip = props => {
    return (
        <div className='custom-tooltip-container'>
            <div
                className='tooltip-render-for'
                style={props?.styleForTooltipRender}
                id={props?.target}>
                {props?.tooltipToRenderFor ? props?.tooltipToRenderFor : translate("NOT_APPLICABLE")}
            </div>
            {props?.tooltipData ?
                <UncontrolledTooltip
                    className={`custom-tooltip ${props?.toolTipClassName}`}
                    placement={props?.placement ? props?.placement : "bottom"}
                    target={props?.target}
                    // trigger="click"
                    autohide={false}
                    boundariesElement="viewport"
                    container={"div"}
                >
                    {props?.tooltipData}
                </UncontrolledTooltip> : null}
        </div>
    )
}

CustomTooltip.propTypes = {
    target: PropTypes.any,
    tooltipData: PropTypes.any,
    tooltipToRenderFor: PropTypes.any,
    styleForTooltipRender: PropTypes.any,
    toolTipClassName: PropTypes.any,
    placement: PropTypes.string,
    isEmpty: PropTypes.bool
}

export default CustomTooltip