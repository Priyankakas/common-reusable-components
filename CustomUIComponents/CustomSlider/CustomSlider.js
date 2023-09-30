/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

//styles
import { Row } from "react-bootstrap";
import Rating from "react-rating";
import filledCircle from "ASSETS/images/ic_green.svg";
import hollowCircle from "ASSETS/images/ic_outline.svg";
import grey_circle from "ASSETS/images/ic_gray_circle.svg";

const CustomSlider = (props) => {
    return (
        <Row className="custom-slider" id={props.id}>
            <Rating
                stop={4}
                initialRating={props?.skillLevel}
                emptySymbol={
                    <span className={props.isOutsideOption ? "pe-2" : "pe-3"}>
                        {props.isOutsideOption ? (
                            <img src={grey_circle} className="icon" />
                        ) : (
                            <img src={hollowCircle} className="icon" />
                        )}
                    </span>
                }
                fullSymbol={
                    <span className={props.isOutsideOption ? "pe-2" : "pe-3"}>
                        <img src={filledCircle} className="icon" />
                    </span>
                }
                onClick={props.handleOnClickSkillLevel}
                readonly={props.isOutsideOption}
            />
        </Row>
    );
};

CustomSlider.propTypes = {
    handleOnClickSkillLevel: PropTypes.func,
    skillLevel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    isOutsideOption: PropTypes.bool,
    id: PropTypes.any,
};

export default CustomSlider;
