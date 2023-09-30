/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select, { components } from "react-select";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

import { translate } from "SERVICES/i18n";
import "./CustomSelect.scss";
import searchImg from "ASSETS/images/Ic_Search.svg";
import { getTextWithEnclosedBrackets } from 'UTILS/Utils';


/* #region  Keep this MenuList outside Function Because scroll bar moves up on selection cos this gets rerender everytime */
const MenuList = (props) => {
    // menuListclassname is to align multi options in menu in rowwise
    return (
        <components.MenuList {...props} className={props?.selectProps?.menuListclassname}>
            {props.children}
        </components.MenuList>
    );
};

const Group = (props) => (
    <div>
        {console.log("Group", props?.selectProps?.dependentGroupLabel, props.data.label, props?.selectProps?.isSectionDisabled)}
        <components.Group className={(props.data.label == props?.selectProps?.dependentGroupLabel) && props?.selectProps?.isSectionDisabled ? "group-section" : ""} {...props} >
            {props.children}
        </components.Group>
    </div>
);

/* #endregion */

const CustomSelectWithCheckboxSearch = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const customStyles = {
        // For the select itself (not the options)
        control: (styles, { isDisabled }) => {
            return {
                ...styles,
                backgroundColor: "white",
                opacity: isDisabled ? "0.8" : "1",
                cursor: isDisabled ? "arrow" : "pointer",
                display: props?.isSearchable ? "flex" : "none",
                width: "440px",
            };
        },
        indicatorSeparator: () => ({
            display: "none",
        }),

        option: (styles) => {
            return {
                ...styles,
                padding: "7px",
            };
        },

        menu: (provided) => ({
            ...provided,
            marginTop: 0,
            width: props?.menuWidth,
        }),

        dropdownIndicator: (base, state) => ({
            ...base,
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
        })
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <img src={searchImg} alt='searchicon' />
            </components.DropdownIndicator>
        );
    };

    const CustomSelectOption = props => {
        let selectedLength = props?.selectProps?.value?.length;
        console.log("selectProps", props?.selectProps?.value, selectedLength)
        return (
            <components.Option {...props} className={props.value == "*" ? "clear-all" : ""}>
                {props?.value !== "*" ? <>
                    <input
                        type="checkbox"
                        className="checkbox-select"
                        id={"checkbox-select-" + props.label}
                        checked={props?.isSelected}
                        onChange={() => null}
                    /> <label className="ms-2 cursorPointer">{props.label}</label>
                </> : <div className="d-flex justify-content-between w-100">
                    <span className="selected-label">{selectedLength > 0 && selectedLength + " " + translate("SELECTED")}</span>
                    <label className="clear ms-2 cursorPointer">{props.label}</label>
                </div>
                }
            </components.Option>
        );
    };

    return (
        <>
            <Dropdown className='react-select-container px-1' isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret>
                    <span>{props?.placeholder}</span>
                    <span>{props.appliedCount > 0 ?  getTextWithEnclosedBrackets(props.appliedCount) : ""}</span>
                </DropdownToggle>
                <DropdownMenu className={props?.menuclassname}>
                    <Select
                        className={`react-select-checkbox`}
                        classNamePrefix={`react-select-checkbox`}
                        onChange={props.onChange}
                        options={props.options}
                        isMulti={true}
                        autoFocus
                        value={props.value}
                        placeholder={translate("SEARCH_HERE")}
                        isDisabled={props.isDisabled}
                        menuPlacement={"auto"}
                        menuShouldScrollIntoView
                        minMenuHeight={200}
                        menuIsOpen={true}
                        styles={customStyles}
                        isSearchable={props?.isSearchable}
                        controlShouldRenderValue={false}
                        hideSelectedOptions={false}
                        isClearable={false}
                        tabSelectsValue={false}
                        components={{
                            Option: CustomSelectOption,
                            DropdownIndicator,
                            MenuList,
                            Group
                        }}
                        // custom props passed through selectprops
                        dependentGroupLabel={props?.dependentGroupLabel}
                        isSectionDisabled={props?.isSectionDisabled}
                        menuListclassname={props?.menuListclassname}
                    />
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

CustomSelectWithCheckboxSearch.propTypes = {}

export default CustomSelectWithCheckboxSearch