import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';


// Styles
import "./Loader.scss";

export const Loader = (props) => {
	return (
		<div>
			<Modal
				className="loadingSpinner"
				show={props.showLoader}
				// onHide={this.handleClose}
				animation={false}
				backdropClassName="loadingBackdrop"
			>
				<Modal.Body className="modalBody noPadding">
					<div className="verticalMiddle">
						<i className="fa fa-spinner fa-spin iconStyle" aria-hidden="true" />{" "}
						{/* <img src={Ic_loading} aria-hidden='true'/> */}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};
Loader.propTypes = { showLoader: PropTypes.bool };


export const CardSpinner =(props) =>{
        return (
            props.showLoader && (
                <div className="d-flex justify-content-center spinner-container">
                    <Spinner animation="border" />
                </div>
            )
        );
}
CardSpinner.propTypes = { showLoader: PropTypes.bool };
