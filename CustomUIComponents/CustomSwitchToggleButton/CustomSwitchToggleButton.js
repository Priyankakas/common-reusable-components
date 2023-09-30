import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";

import "./CustomSwitchToggleButton.scss";
const CustomSwitchToggleButton = (props) => {
    const [checked, setChecked] = useState(props?.row.hideFromInvoice);
    console.log("checked: ", checked);

    useEffect(() => {
        setChecked(props?.row.hideFromInvoice);
    });

    const handleToggleChange = () => {
        setChecked(!checked);
        props?.setIsSaveEnabled(true);
        props?.handleOnToggleChange(props?.row, !checked);
    };

    return (
        <>
            <Switch
                className="react-switch-container"
                onChange={() => handleToggleChange()}
                checked={checked}
                checkedIcon={<span>{"Yes"}</span>}
                uncheckedIcon={<span>{"No"}</span>}
                disabled={props?.disabled ? props?.disabled : false}
                height={16}
                width={44}
                handleDiameter={14}
            />
        </>
    );
};

CustomSwitchToggleButton.propTypes = {
    disabled: PropTypes.bool,
    // checked: PropTypes.any,
    // setChecked: PropTypes.func,
    // handleToggleChange: PropTypes.func,
    setIsSaveEnabled: PropTypes.func,
    row: PropTypes.any,
    handleOnToggleChange: PropTypes.func,
};

export default CustomSwitchToggleButton;
