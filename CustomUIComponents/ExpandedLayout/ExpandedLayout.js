import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import scrollIntoView from "scroll-into-view-if-needed";

//Strings
import { translate } from "SERVICES/i18n";

//Styles
import "./ExpandedLayout.scss";

const ExpandedLayout = (props) => {
    useEffect(() => {
        const node = document.getElementById(props.id);
        scrollIntoView(node, {
            scrollMode: "if-needed",
            behavior: "smooth",
            block: "center",
            inline: "nearest",
        });
    }, []);

    return (
        <div className="expanded-layout" id={props.id}>
            <Row className="mx-0">
                {props.expandedArr &&
                    Object.entries(props.expandedArr).map(([key, value]) => {
                        return (
                            <Col className={`py-1 ${key}`} md={2} key={key}>
                                <div className="label">{translate(key)}</div>
                                <div className="value">{value}</div>
                            </Col>
                        );
                    })}
            </Row>
        </div>
    );
};

ExpandedLayout.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    expandedArr: PropTypes.object,
    id: PropTypes.any,
    colClassName: PropTypes.string,
};

export default ExpandedLayout;
