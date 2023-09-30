import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

//Assets
import { ReactComponent as UncheckedCheckbox } from "ASSETS/images/checkbox.svg";
import { ReactComponent as CheckedCheckbox } from "ASSETS/images/checkedbox.svg";

//Style
import "./CustomCheckbox.scss";

const CustomCheckbox = (props) => {
    return (
        <div
            className={`checkbox-component ${props?.className} ${props.disabled ? "disabled": ""}`}
        >
            {props.checked ? (
                <CheckedCheckbox
                    id="checkbox"
                    className="cursor-pointer"
                    onClick={props.onChange}
                />
            ) : (
                <UncheckedCheckbox
                    id="checkbox"
                    className="cursor-pointer"
                    onClick={props.onChange}
                />
            )}
            <Form.Check
                onChange={props.onChange}
                className={props.labelClass}
                checked={props.checked}
                inline
                id={props.id}
                label={props.label}
                disabled={props.disabled}
            />
        </div>
    );
};

CustomCheckbox.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
};

export default CustomCheckbox;
