import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { FormControl, Form } from "react-bootstrap";

//Asset
import Ic_calendar from "ASSETS/images/calendar.svg";

//Style
import "./CustomCalendar.scss";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = (props) => {
    const ExampleCustomInput = forwardRef((props, ref) => (
        <Form.Group>
            <FormControl
                disabled={true}
                value={props.value}
                autoComplete="off"
                placeholder={props.placeholder}
                ref={ref}
            />
            <span>
                <img
                    src={Ic_calendar}
                    alt="icon"
                    className={`calendar-icon ${props.disabled
                        ? "cursor-default disabled"
                        : "cursorPointer"
                        }`}
                    onClick={props.onClick}
                />
            </span>
        </Form.Group>
    ));
    ExampleCustomInput.displayName = "ExampleCustomInput"
    console.log("props.disabled: ", props.disabled);

    return (
        <div className={`calendar ${props.disabled ? "disabled" : ""}`}>
            <Form.Label>
                {props?.label}
                {props?.isMandatory &&
                    <span className="ms-1 mandatory">*</span>
                }
            </Form.Label>
            <DatePicker
                disabled={props.disabled}
                selected={props.value}
                onChange={props.handleChange}
                showTimeSelect={false}
                dateFormat={props.format}
                showYearPicker={props.showYearPicker}
                customInput={<ExampleCustomInput />}
                minDate={props.minDate}
                maxDate={props.maxDate}
                selectsStart={props.selectsStart}
                selectsEnd={props.selectsEnd}
                placeholderText={props.placeholder}
                showMonthYearPicker={props.showMonthYearPicker}
                showMonthDropdown
                showYearDropdown
                popperClassName="custom-popper"
                popperPlacement="bottom-end"
                dropdownMode="select"
            />
        </div>
    );
};

CustomCalendar.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    dateFormat: PropTypes.string,
    showMonthYearPicker: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func,
    language: PropTypes.string,
    format: PropTypes.string,
    value: PropTypes.any,
    showYearPicker: PropTypes.bool,
    inputRef: PropTypes.any,
    selectsStart: PropTypes.any,
    selectsEnd: PropTypes.any,
    placeholder: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    label: PropTypes.string,
    isMandatory: PropTypes.bool
};

export default CustomCalendar;
