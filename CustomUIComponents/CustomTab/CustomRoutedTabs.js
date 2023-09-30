import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation, Outlet } from "react-router-dom";

import { translate } from "SERVICES/i18n";

//style
import "./CustomTab.scss";

const CustomRoutedTabs = (props) => {
    let location = useLocation();
    const selectedMenu = useMemo(() => {
        let projectTabMenu = "";
        props.tabItems?.some(
            (item) =>
                location.pathname?.includes(item.href) &&
                (projectTabMenu = item.displayText)
        );
        return projectTabMenu;
    }, [location.pathname]);

    const renderTabsItem = useCallback(
        (itemList) => {
            return (
                <div className="d-flex nav-tabs">
                    {itemList.map((menuItem) => {
                        return (
                            <div
                                key={menuItem.displayText}
                                className={`nav-item ${
                                    menuItem.showTab ? "" : "d-none"
                                }`}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""} `
                                    }
                                    to={menuItem.href}
                                >
                                    <div className="tab-icon-container">
                                        <span className="tabIcon me-2">
                                            <img
                                                src={
                                                    selectedMenu ===
                                                    menuItem.displayText
                                                        ? menuItem.selectedIcon
                                                        : menuItem.deselectedIcon
                                                }
                                            />
                                        </span>
                                        <span className="tabText">
                                            {translate(menuItem.displayText)}
                                        </span>
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            );
        },
        [selectedMenu]
    );

    return (
        <div className="custom-routed-tabs tab-container-with-bottom-buttons">
            {renderTabsItem(props.tabItems)}
            <div className="tab-content">
                <Outlet />
            </div>
        </div>
    );
};

CustomRoutedTabs.propTypes = {
    tabItems: PropTypes.array,
};

export default CustomRoutedTabs;
