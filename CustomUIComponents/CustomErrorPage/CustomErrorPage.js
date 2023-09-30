import React from "react";
import PropTypes from "prop-types";

//Style
import "./CustomErrorPage.scss";

const CustomErrorPage = (props) => {
    return (
        <div className="error-page-container mainContainer">
            {props.icon && <div className="mx-auto">
                <img className="icon" src={props?.icon} />
            </div>
            }
            <div className="title">{props?.title}</div>
            <div className="desc">{props?.desc}</div>
            <div>{props?.showButton}</div>
        </div>
    );
};

CustomErrorPage.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    desc: PropTypes.string,
    showButton: PropTypes.object
}

export default CustomErrorPage;