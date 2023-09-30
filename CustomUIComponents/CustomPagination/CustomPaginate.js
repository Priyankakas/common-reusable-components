/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Dropdown, DropdownButton, Row } from "react-bootstrap";

//Assets
import ArrowRight from "ASSETS/images/Ic_right arrow_selected.svg";
import ArrowLeft from "ASSETS/images/Ic_Left arrow_selcted.svg";

//Constants
import {
    PAGINATION_LIST,
    DEFAULT_PAGE_LENGTH,
    DEFAULT_PAGE_START,
} from "UTILS/constants/AppConstants";
import { allowOnlyNumber } from "UTILS/Utils";

//Strings
import { translate } from "SERVICES/i18n";

//Styles
import "./CustomPagination.scss";

const CustomPaginate = (props) => {
    const [currentPage, setPage] = useState(props.currentPage ? props.currentPage : DEFAULT_PAGE_START);
    const [pageCount, setPageCount] = useState(props.pageSize ? props.pageSize : DEFAULT_PAGE_LENGTH);

    useEffect(() => {
        setPage(props.currentPage ? props.currentPage : DEFAULT_PAGE_START);
    }, [props.currentPage])

    // console.log("pageCount", pageCount);
    const handlePageChange = (event) => {
        if (event.target.value <= props.numberOfPages) {
            if (event.target.value > 0) {
                if (event.key === "Enter") {
                    props.onPageChange(Number(event.target.value), pageCount);
                }
            }
        }
    };

    const handleSetPage = (event) => {
        if (event.target.value <= props.numberOfPages) {
            setPage(Number(event.target.value));
        }
    };

    const handlePageLengthChange = (event) => {
        console.log("event", event);
        setPageCount(event);
        setPage(1);
        props.onPageChange(1, event);
    };

    const onNext = () => {
        console.log("pageCount", pageCount)
        setPage(Number(currentPage + 1));
        props.onPageChange(Number(currentPage) + 1, pageCount);
    };

    const onPrevious = () => {
        setPage(Number(currentPage - 1));
        props.onPageChange(Number(currentPage) - 1, pageCount);
    };

    return (
        <Row className={"custom-pagination " + props?.alignment}>
            {console.log("pageCount", pageCount)}
            {props.tableData && props.tableData.length > 0 && (
                <div className="paginate">
                    {props.showPageSizeDropDown &&
                        <>
                            <span className="mx-1">
                                <DropdownButton
                                    id="paginate-dropdown"
                                    onSelect={handlePageLengthChange}
                                    title={
                                        <span>
                                            {translate("SHOW") +
                                                " " +
                                                pageCount +
                                                " " +
                                                translate("ENTRIES")}
                                        </span>
                                    }
                                >
                                    {PAGINATION_LIST.map((item, index) => {
                                        return (
                                            <Dropdown.Item
                                                eventKey={item}
                                                key={index}
                                                className={
                                                    item == pageCount
                                                        ? "selected-item"
                                                        : ""
                                                }
                                            >
                                                {item}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>
                            </span>
                            <span className="vl"></span>
                        </>
                    }


                    <span className="page-size-wrapper">
                        <span className="px-2">
                            <Form.Control
                                className="page-input"
                                onChange={handleSetPage}
                                onKeyUp={handlePageChange}
                                onKeyDown={allowOnlyNumber}
                                value={currentPage == 0 ? "" : currentPage}
                                type="text"
                            />
                        </span>
                        <span>
                            {"/"}{" "}
                            <span className="px-2">{props?.numberOfPages}</span>
                        </span>
                    </span>

                    <span
                        className={`arrow-wrapper left ${currentPage == 1 ? "disabled" : ""
                            }`}
                        onClick={onPrevious}
                    >
                        <img src={ArrowLeft} alt="" className="btn100" />
                    </span>
                    <span
                        className={`arrow-wrapper right ${currentPage == props.numberOfPages ? "disabled" : ""
                            }`}
                        onClick={onNext}
                    >
                        <img src={ArrowRight} alt="" className="btn100" />
                    </span>
                </div>
            )}
        </Row>
    );
};

CustomPaginate.propTypes = {
    tableData: PropTypes.any,
    onPageChange: PropTypes.func,
    numberOfPages: PropTypes.number,
    alignment: PropTypes.string,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    showPageSizeDropDown: PropTypes.bool
};

CustomPaginate.defaultProps = {
    showPageSizeDropDown: true
}

export default CustomPaginate;
