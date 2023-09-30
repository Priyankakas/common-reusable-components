import React from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownButton } from "react-bootstrap";

import "./CustomSideDropDown.scss";

const CustomSideDropDown = (props) => {
  return (
    <div className="custom-side-dropdown">
      <DropdownButton
        // key={"start"}
        id={`dropdown-button-drop-${props.id}`}
        drop={"start"}
        variant="secondary"
        rootCloseEvent="mousedown"
        title=""
        disabled={props.disabled}
      >
        {props.menuItems.map((item, key) => {
          if (item.show) {
            return (
              <Dropdown.Item
                className={item.className}
                onClick={item.action}
                key={item.name}
                eventKey={key}
              >
                {item.name}
              </Dropdown.Item>
            );
          }
        })}
      </DropdownButton>
    </div>
  );
};

CustomSideDropDown.propTypes = {
  menuItems: PropTypes.array,
  id: PropTypes.number,
  disabled: PropTypes.bool
};

export default CustomSideDropDown;
