import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

//Styles
import "./CustomToast.scss";
import "react-toastify/dist/ReactToastify.css";

//Assets
import Ic_check_toast from "ASSETS/images/Ic_check_toast.png";
import Ic_close from "ASSETS/images/Ic_close.svg";

const CustomToast = (props) => {
    const dismiss = () => toast.dismiss(props.toastId.current);
    const CloseButton = () => {
        return (
            <div className="close-button" onClick={dismiss}>
                <img src={Ic_close} className="ms-5 cursorPointer" />
            </div>
        );
    };

    return (
        <>
            <div className="custom-toast-container">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    closeButton={CloseButton}
                    icon={<img src={Ic_check_toast} className="me-2" />}
                />
            </div>
        </>
    );
};
CustomToast.propTypes = {
    toastId: PropTypes.string,
};
export default CustomToast;
