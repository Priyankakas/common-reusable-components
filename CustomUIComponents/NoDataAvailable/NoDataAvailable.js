import React from "react";
import PropTypes from "prop-types";

//Style
import "./NoDataAvailable.scss";
import smiley from "ASSETS/images/smiley.jpg";

import { translate } from "SERVICES/i18n";

const NoDataAvailable = (props) => {
	return (
	!props.showLoader &&
		<div className="no-data-available">
			<div className="text-center"><img className="icon" src={props.icon} /></div>
			<div className="title">{props.title}</div>
			<div className="desc">{props.desc ? props.desc : <b>{translate("NO_DATA_AVAILABLE_MSG")}</b>}</div>
		</div>
	);
};

NoDataAvailable.defaultProps ={
	icon : smiley
}

NoDataAvailable.propTypes = {
	icon: PropTypes.any,
	title: PropTypes.string,
	desc: PropTypes.any,
	showLoader: PropTypes.bool
}

export default NoDataAvailable;