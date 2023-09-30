import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

import Ic_field_error from "ASSETS/images/Ic_field_error.png";

export const CustomTextBox = props => {

    const getErrorMessage = (errorMessage) => {
        return (
            errorMessage?.length > 0 && (
                <div className="error-text pt-1">
                    <span>
                        <img className="errorIcon pe-1" src={Ic_field_error} />
                        {errorMessage}
                    </span>
                </div>
            )
        );
    };

    return (
        <>
            <Form.Group
                className="mb-3"
                controlId= {props?.name}
            >
                <Form.Label>
                    {props?.label}
                  {props?.isMandatory &&  <span className="ms-1 mandatory">*</span>}
                </Form.Label>
                <Form.Control
                    data-input-type="string"
                    type="text"
                    as={props?.as}
                    className={props?.className}
                    onChange={props?.handleChange}
                    onBlur={props?.handleBlur}
                    name= {props?.name}
                    value={props?.inputValue}
                    placeholder={props?.placeholder}
                    minLength={props?.minLength}
                    maxLength={props?.maxLength}
                    disabled={props?.isDisabled}
                    rows={props?.rows}
                    onKeyDown={props?.onKeyDown}
                />
                {getErrorMessage(props?.errorMessage)}
            </Form.Group>
        </>
    )
}

CustomTextBox.propTypes = {
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    inputValue: PropTypes.any,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    rows: PropTypes.any,
    className: PropTypes.string,
    as: PropTypes.any,
    isMandatory: PropTypes.bool,
    errorMessage: PropTypes.any
}
