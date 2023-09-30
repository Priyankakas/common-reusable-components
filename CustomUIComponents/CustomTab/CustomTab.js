/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Tab, Tabs, Row, Col, Nav } from 'react-bootstrap';

//style
import "./CustomTab.scss";

import ArrowIcon from "ASSETS/images/ic_skillwise_arrow.svg";

export const CustomTab = props => {
    const [selectedTab, setSelectedTab] = useState(1);

    const handleSelect = (key) => {
        setSelectedTab(Number(key));
    };

    return (
        <div className={`custom-tab tab-container ${props.wrapperClassName}`}>
            <Tab.Container onSelect={handleSelect} defaultActiveKey={selectedTab}>
                <Nav variant={props.variant} className={props?.className}>
                    {props.tabItems.map((tabItem, index) => {
                        return <Nav.Item key={index}>
                            {tabItem?.isListItem ?
                                <Nav.Link eventKey={tabItem.eventKey}>
                                    <div className="tab-text position-relative">
                                        <span>{tabItem?.text}</span>
                                        <span className='sub-text px-2'>{tabItem?.subText}</span>
                                        <span className='icon'>{props?.isIcon && <img src={ArrowIcon} />}</span>
                                    </div>
                                    <div>{tabItem?.extraContent}</div>
                                </Nav.Link> : <div className='py-2 skill-search' key={index}>{tabItem?.extraContent}</div>
                            }
                        </Nav.Item>
                    })}
                </Nav>
                <Tab.Content className='w-100'>
                    {props.tabItems.map((tabItem, index) => {
                        return <Tab.Pane className={tabItem?.isNoData ? "no-data-tab-pane" : ""} key={index} eventKey={tabItem.eventKey}>
                            {tabItem.component}
                        </Tab.Pane>
                    })}
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}

CustomTab.propTypes = {
    tabItems: PropTypes.array,
    className: PropTypes.string,
    isFill: PropTypes.bool,
    isIcon: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    variant: PropTypes.string
}

