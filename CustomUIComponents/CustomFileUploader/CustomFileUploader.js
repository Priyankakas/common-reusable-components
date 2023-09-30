import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Row, Col } from "react-bootstrap";
import { Button } from "reactstrap";

// styles
import "./CustomFileUploader.scss";
import { translate } from "SERVICES/i18n";
import Ic_close from "ASSETS/images/Ic_close.svg";

const CustomFileUploader = (props) => {
    const fileFormats = {
        "image/*": [],
        "application/pdf": [],
        "application/msword": [],
        "application/vnd.ms-excel": [],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    };
    return (
        <div className="custom-file-uploader">
            <Dropzone
                maxSize={props?.maxSize}
                accept={props?.fileFormats ? props?.fileFormats : fileFormats}
                onDrop={(files) => props.setFile(files)}
            >
                {({ getRootProps, getInputProps }) => (
                    <Row className="container">
                        <Col {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <div>
                                {translate("DRAG_DROP")}{" "}
                                {props.isMandatory && (
                                    <sup className="mandatory">*</sup>
                                )}
                            </div>
                            <Button color="link" className="choose outline-btn">
                                {translate("CHOOSE_FILE")}
                            </Button>
                        </Col>
                        <Col
                            className={"file-list " + props?.fileListClassName}
                        >
                            <ul>
                                {props.files &&
                                    props.files.map((file) => (
                                        <li key={file.path}>
                                            {file?.path} {file?.documentName} -{" "}
                                            {file?.size} bytes
                                            <span className="ps-2 cursorPointer">
                                                <img
                                                    className="remove"
                                                    onClick={() =>
                                                        props.removeFile(file)
                                                    }
                                                    src={Ic_close}
                                                />
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </Col>
                    </Row>
                )}
            </Dropzone>
        </div>
    );
};

CustomFileUploader.propTypes = {
    setFile: PropTypes.func,
    files: PropTypes.array,
    removeFile: PropTypes.func,
    fileListClassName: PropTypes.string,
    isMandatory: PropTypes.bool,
    maxSize: PropTypes.any,
    fileFormats: PropTypes.any,
};
export default CustomFileUploader;
