import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Col } from 'react-bootstrap';

//Strings
import { translate } from "SERVICES/i18n";

//Assets
import Ic_close from "ASSETS/images/Ic_close.svg";

// style
import "./CustomPopup.scss";


const  CustomPopup =(props) => {

    const closeBtn = (
            <img className='cursorPointer' src={Ic_close} onClick={props.close}/>
    );

    return (
        <Modal
            // change visibility of modal based on props.
            isOpen={props.open}
            // Modal opens with specified messages in props
            className={`custom-modal ${props.className}`}
            trapFocus={false}
            centered
            size={props.size}
        >
            <ModalHeader close={closeBtn}>
                {translate(props.modalHeader)}
            </ModalHeader>
            <ModalBody className="mx-0">
                <React.Fragment>
                    <div className="modal-panel">{props.children}</div>
                    {props.showSeparator && <hr />}
                </React.Fragment>
            </ModalBody>
            <div className={`custom-modal-footer ${props.modalFooterClass}`}>
                <Col md={6}>
                    {props?.showLeftContent}
                </Col>
               <Col md={props?.showLeftContent ? 6 : 12}  className={`d-flex justify-content-end`}>
                {props.showButtons && (
                        <div>
                            {props.cancelButton}
                            {props.saveButton}
                        </div>
                    )}
               </Col>
            </div>
        </Modal>
    );
}

CustomPopup.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    showButtons: PropTypes.bool,
    showSeparator: PropTypes.bool,
    modalHeader: PropTypes.string,
    className: PropTypes.string,
    cancelButton: PropTypes.object,
    saveButton: PropTypes.object,
    children: PropTypes.node,
    modalFooterClass: PropTypes.string,
    size: PropTypes.string,
    showLeftContent : PropTypes.any
};

CustomPopup.defaultProps = {
    open: false,
    modalHeader: '',
    className: '',
    showButtons: false,
    showSeparator: false,
    close: () => { /* empty function */ },
    cancelButton: {},
    saveButton: {},
    modalFooterClass: "",
    size: "sm"
};

export default CustomPopup;
