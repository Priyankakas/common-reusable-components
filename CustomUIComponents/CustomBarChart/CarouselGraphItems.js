import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import previous from "ASSETS/images/ic_previous_enabled.svg";
import next from "ASSETS/images/ic_next_enabled.svg";
import previous_disabled from "ASSETS/images/ic_previous_disabled.svg";
import next_disabled from "ASSETS/images/ic_next_disabled.svg";
import { splitArrayIntoChunks } from "UTILS/Utils";

export const CarouselGraphItems = (props) => {
    const [index, setIndex] = useState(0);
    let totalChunks = splitArrayIntoChunks(props?.totalItems, 9);
    const arrowLeft = () => (
        <div
            className="pe-2 left-icon"
            onClick={onClickPrevious}
            disabled={index == 0}
        >
            <img src={index == 0 ? previous_disabled : previous} />
        </div>
    );
    const arrowRight = () => (
        <div
            className="right-icon"
            onClick={onClickNext}
            disabled={index == totalChunks.length - 1}
        >
            <img src={index == totalChunks.length - 1 ? next_disabled : next} />
        </div>
    );

    console.log("index", index);
    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 500,
        rows: 3,
        slidesPerRow: 1,
    };
    let sliderRef = useRef();

    const { getFill, handleClick } = props;

    const changeColour = (index) => {
        console.log(index);
        handleClick(index);
    };

    const onClickNext = () => {
        setIndex(index + 1);
        sliderRef.current.slickNext();
        props.handleBarGraphNext();
    };
    const onClickPrevious = () => {
        setIndex(index - 1);
        sliderRef.current.slickPrev();
        props.handleBarGraphPrev();
    };

    const handleOnClick = (event, item) => {
        props.handleOffCanvasScreen(item);
    };

    return (
        <div className="chip-item-list">
            <Slider ref={sliderRef} {...settings}>
                {props?.barGraphSlicedData?.map((data, index) => (
                    <div key={index}>
                        <div
                            className="chip-item"
                            onMouseOver={() => changeColour(data?.uniqueKey)}
                            style={{
                                borderColor: getFill(data?.uniqueKey),
                            }}
                            onClick={(event) => handleOnClick(event, data)}
                        >
                            <span className="name">{data.name}</span>
                            <span className="value">{data.pv}</span>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="d-flex justify-content-end px-2">
                {arrowLeft()}
                {arrowRight()}
            </div>
        </div>
    );
};

CarouselGraphItems.propTypes = {
    getFill: PropTypes.any,
    handleClick: PropTypes.any,
    totalItems: PropTypes.array, // total array items data
    handleBarGraphNext: PropTypes.any,
    handleBarGraphPrev: PropTypes.any,
    barGraphSlicedData: PropTypes.array, // sliced Data
    handleOffCanvasScreen: PropTypes.func,
};

export const ChipItems = (props) => {
    const handleOnClick = (event, item) => {
        props.handleOffCanvasScreen(item);
    };
    return (
        <div className="chip-item-list">
            {props?.carouselItemsData?.map((data, index) => (
                <div
                    key={index}
                    className="chip-item"
                    onClick={(event) => handleOnClick(event, data)}
                >
                    <span className="name">{data.statusName}</span>
                    <span className="value">{data.count}</span>
                </div>
            ))}
        </div>
    );
};

ChipItems.propTypes = {
    carouselItemsData: PropTypes.array,
    handleOffCanvasScreen: PropTypes.func,
};
