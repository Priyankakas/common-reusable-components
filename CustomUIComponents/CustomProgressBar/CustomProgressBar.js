import React from 'react'
import PropTypes from 'prop-types'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProgressBar } from 'react-bootstrap';

import "./CustomProgressBar.scss";

export const CustomCircularProgressBar = props => {
    return (
        <div>
            <CircularProgressbar
                style={{ backgroundColor: "white", color: "black" }}
                values={[0, 20, 40, 60, 80, 100]}
                value={props?.value}
                text={`${props?.value}%`}
                strokeWidth={12}
                styles={buildStyles({
                    pathColor: props.pathColor,
                    trailColor: props.trailColor,
                    textSize: "20px",
                    textColor: "#43425D",
                    pathTransitionDuration: 0.15,
                })}
            />
        </div>
    )
}

CustomCircularProgressBar.propTypes = {
    value: PropTypes.any,
    text: PropTypes.any,
    pathColor: PropTypes.any,
    trailColor: PropTypes.any
}

export const LinearProgressBar = (props) => {
    return (
        <div className="linear-bar-container">
            <ProgressBar className="linear-bar" variant={props?.variant1} now={props?.now1}/>
            <div className={`mx-1 w-8 ${props?.isExtraData ? "small-bar" : ""}`}></div>
            <span className="ps-1">{props?.text} %</span>
        </div>
    )
}
LinearProgressBar.propTypes = {
    now1: PropTypes.any,
    variant1: PropTypes.any,
    text: PropTypes.any,
    isExtraData: PropTypes.bool
}
