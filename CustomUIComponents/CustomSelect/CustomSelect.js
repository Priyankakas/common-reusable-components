/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Form } from "react-bootstrap";

//assets
import Ic_dropdown from "ASSETS/images/Ic_dropdown.svg";

import "./CustomSelect.scss";

export const CustomSelect = (props) => {
    const customStyles = {
        // For the select itself (not the options)
        control: (styles, state) => {
            return {
                ...styles,
                backgroundColor: "white",
                opacity: state.isDisabled ? "0.8" : "1",
                cursor: state.isDisabled ? "arrow" : "pointer",
            };
        },
        indicatorSeparator: () => ({
            display: "none",
        }),

        option: (styles) => {
            return {
                ...styles,
                padding: "7px",
                // "&:hover": {
                //     backgroundColor: "#9bddff"
                // },
                // backgroundColor: state.isSelected ? "#289FF7" : ""
            };
        },

        menu: (provided) => ({
            ...provided,
            marginTop: 0,
            zIndex : 1000
        }),
    };
    const CustomDropdownIndicator = () => {
        return (
            <div className={`mx-2 ${props.isDisabled ? "disabled" : ""}`}>
                <img src={Ic_dropdown} />
            </div>
        );
    };

    const formatOptionLabel = ({ label, allocation }) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="mx-2">{label}</span>
            <span className="mx-2">
                {allocation} {"%"}
            </span>
        </div>
    );

    return (
        <div className={`customSelect mb-3 ` + props?.className} title={props?.selectedOption?.label}>
            <Form.Group>
                {props?.label &&
                    <Form.Label>
                        {props?.label}
                        {props?.isMandatory && <span className="ms-1 mandatory">*</span>}
                    </Form.Label>
                }
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={customStyles}
                    backspaceRemovesValue={false}
                    onChange={props.onSelectChange}
                    options={props.options}
                    components={{
                        DropdownIndicator: CustomDropdownIndicator,
                    }}
                    isMulti={props.isMulti}
                    formatOptionLabel={props.isFormatOption && formatOptionLabel}
                    value={props.selectedOption}
                    placeholder={props.placeholder}
                    isDisabled={props.isDisabled}
                    menuPlacement={"auto"}
                    menuShouldScrollIntoView
                    minMenuHeight={200}
                    isLoading={props.isLoading}
                    isClearable={props?.isClearable}
                />
            </Form.Group>

        </div>
    );
};

CustomSelect.propTypes = {
    options: PropTypes.array,
    isMulti: PropTypes.bool,
    isFormatOption: PropTypes.bool,
    onSelectChange: PropTypes.func,
    selectedOption: PropTypes.any,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string
};

