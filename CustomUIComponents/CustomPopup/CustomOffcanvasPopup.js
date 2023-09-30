import React from "react";
import PropTypes from "prop-types";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

//Strings
import { translate } from "SERVICES/i18n";

//Assets
import Ic_close from "ASSETS/images/Ic_close.svg";

//styles
import "./CustomOffcanvasPopup.scss";
import { getTextWithEnclosedBrackets } from "UTILS/Utils";

const CustomOffcanvasPopup = (props) => {
    const closeBtn = (
        <img className="cursorPointer" src={Ic_close} onClick={props.close} />
    );

    return (
        <Offcanvas
            isOpen={props.open}
            className={`custom-offcanvas ${props.className}`}
            autoFocus={props.autoFocus}
            trapFocus={props.trapFocus}
            backdrop
            direction={props.direction}
            style={{
                width: props.offcanvasWidth,
                height: props.offcanvasHeight,
            }}
            fade
        >
            <OffcanvasHeader close={closeBtn}>
                <span>{translate(props?.offcanvasHeader)}</span> &nbsp;
                <span>{getTextWithEnclosedBrackets(props?.count)}</span>
            </OffcanvasHeader>
            <OffcanvasBody className="mx-0 h-100">
                <React.Fragment>
                    <div className="offcanvas-panel">{props.children}</div>
                    {props.showSeparator && <hr />}
                </React.Fragment>
                <React.Fragment>
                    {props?.showButtons && (
                        <div
                            className={`d-flex justify-content-end offcanvas-btn ${props?.offcanvasFooterClass}`}
                        >
                            {props?.cancelButton}
                            {props?.saveButton}
                        </div>
                    )}
                </React.Fragment>
            </OffcanvasBody>
        </Offcanvas>
    );
};

CustomOffcanvasPopup.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    offcanvasHeader: PropTypes.string,
    offcanvasWidth: PropTypes.string,
    offcanvasHeight: PropTypes.string,
    className: PropTypes.string,
    direction: PropTypes.string,
    showButtons: PropTypes.bool,
    showSeparator: PropTypes.bool,
    cancelButton: PropTypes.object,
    saveButton: PropTypes.object,
    trapFocus: PropTypes.bool,
    autoFocus: PropTypes.bool,
    offcanvasFooterClass: PropTypes.string,
    children: PropTypes.node,
    count: PropTypes.any,
};

CustomOffcanvasPopup.defaultProps = {
    open: false,
    close: () => {
        /* empty function */
    },
    offcanvasHeader: "",
    offcanvasWidth: "",
    offcanvasHeight: "",
    className: "",
    direction: "end",
    showButtons: false,
    showSeparator: false,
    cancelButton: "",
    saveButton: "",
    trapFocus: false,
    autoFocus: true,
    offcanvasFooterClass: "",
};

export default CustomOffcanvasPopup;
