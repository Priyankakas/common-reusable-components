import React, { useCallback } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import { Trans } from "react-i18next";
import filterFactory from "react-bootstrap-table2-filter";

//Assets
import Ic_sorting_ascending from "ASSETS/images/Ic_sorting_ascending.svg";
import Ic_sorting_descending from "ASSETS/images/Ic_sorting_descending.svg";
import Icnodocs from "ASSETS/images/Ic_no_docs.svg";

//translation
import { translate } from "SERVICES/i18n";

//constants
import { API_SORT_DIRECTION } from "UTILS/constants/AppConstants";

//Custom Component
import CustomPaginate from "../CustomPagination/CustomPaginate";
import CustomCheckbox from "COMPONENTS/CustomUIComponents/CustomCheckbox/CustomCheckbox";

//Styles
import "./CustomTableComponent.scss";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const CustomTableComponent = (props) => {
    const tableData = props?.tableData?.data;
    const keyField = props?.tableData?.keyField;
    const nonSelectableRows = props.getNonSelectableRows
        ? props.getNonSelectableRows(tableData)
        : [];
    console.log("nonSelectableRows", nonSelectableRows, props.selectedIds)
    /**
     * header formatter for rendering custom header cell
     * @param column colum data
     * @returns header rendered cell
     */
    const headerFormatterWithSort = useCallback(
        (column, colIndex, { sortElement, filterElement }) => {
            return (
                <div
                    className={`header-label-container ` + column.headerClasses}
                >
                    <div className="sort-label d-flex align-items-center">
                        <Trans
                            i18nKey={column.text}
                            components={{ newLine: "\n" }}
                        />
                        <div> {sortElement}</div>
                        <span
                            onClick={(e) => e.stopPropagation()}
                            className="ps-1"
                        >
                            {filterElement}
                        </span>
                    </div>
                </div>
            );
        },
        []
    );

    const headerFormatter = (column, colIndex, { filterElement }) => {
        return (
            <div className={`header-label-container`}>
                <div className="header-label d-flex align-items-center">
                    <span>
                        <Trans
                            i18nKey={column.text}
                            components={{
                                newLine: "\n",
                                smallText: <div className="small-text" />,
                            }}
                        />
                    </span>
                    <span className="ps-1">{filterElement}</span>
                </div>
            </div>
        );
    };

    /**
     * This function returns the columns array.
     * @returns array of object
     */
    const generateColumns = () => {
        let columnsArr = [];
        props.tableData &&
            props.tableData.columns?.map((columnData) => {
                columnsArr.push({
                    id: columnData.id ? columnData.id : undefined,
                    attrs: columnData.attrs ? columnData.attrs : undefined,
                    headerAttrs: columnData.headerAttrs
                        ? columnData.headerAttrs
                        : undefined,
                    dataField: columnData.dataField,
                    text: columnData.text,
                    sort: !props.tableData.isError && columnData.sort,
                    sortBy: columnData?.sortBy,
                    sortCaret:
                        (!props.tableData.isError && columnData.sortCaret) ||
                        sortCaret,
                    onSort: (column, direction) => {
                        resetOnSorting(column, direction);
                    },
                    classes: columnData.classes ? columnData.classes : "",
                    headerClasses: columnData.headerClasses
                        ? columnData.headerClasses
                        : "",
                    hidden: columnData.hidden ? columnData.hidden : false,
                    formatter: columnData.formatter
                        ? columnData.formatter
                        : (value) => {
                              if (columnData.ifValueEmpty && !value) {
                                  return columnData.emptyValue || "-";
                              }
                              return value;
                          },
                    formatExtraData: columnData.formatExtraData
                        ? columnData.formatExtraData
                        : undefined,
                    filter: columnData?.filter,
                    filterRenderer: columnData?.filterRenderer,
                    headerFormatter: columnData.sort
                        ? headerFormatterWithSort
                        : columnData.headerFormatter
                        ? columnData.headerFormatter
                        : headerFormatter,
                    headerSortingClasses: () => sortingClasses(),
                    events: columnData.events ? columnData.events : {},
                    footer: columnData.footer ? columnData.footer : "",
                    style: columnData.style ? columnData.style : {},
                    footerClasses: columnData.footerClasses
                        ? columnData.footerClasses
                        : "",
                });
            });
        return columnsArr;
    };

    /**
     * This function returns the sorting icons based on the direction.
     * @returns HTML element
     */
    const sortCaret = (order, column) => {
        // order is used for local sort
        // sortby and column comparision for api sorting
        let orderVal = order?.toUpperCase();

        if (props.sortBy === column.sortBy || props?.isLocalSort) {
            if (
                props.sortOrder === API_SORT_DIRECTION.DESC ||
                orderVal === API_SORT_DIRECTION.DESC
            ) {
                return (
                    <img
                        src={Ic_sorting_descending}
                        className="ms-2"
                        alt="desc"
                    />
                );
            } else {
                return (
                    <img
                        src={Ic_sorting_ascending}
                        className="ms-2"
                        alt="asc"
                    />
                );
            }
        }
        return <img src={Ic_sorting_ascending} className="ms-2" alt="asc" />;
    };

    /**
     * This function returns the HTML element if there is error or string if there is no data.
     * @returns HTML element or string
     */
    const NoDataIndication = () => {
        return (
            <div className="no-data-container">
                <img src={props?.noDataImage ? props.noDataImage : Icnodocs} alt="" className="mb-2 no-data-image" />
                <div className="no-data-text">{translate(props.noDataText)}</div>
                <div className="my-2">{props.noDataButton}</div>
            </div>
        );
    };

    /**
     * This function will return the current sorted column's classes
     * @param {object} column
     * @param {string} sortOrder
     * @param {number} colIndex
     * @returns class name
     */
    const sortingClasses = (column, sortOrder) => {
        return sortOrder === API_SORT_DIRECTION.ASC
            ? "current-sort-column sorting-asc"
            : "current-sort-column sorting-desc";
    };

    /**
     * This function will call the function on basis of which selection it is, either rowClick or rowSelection.
     * @param {object} row - selected row
     * @param {boolean} isSelect - select value, true/false
     * @param {integer} rowIndex - selected row's index
     * @param {object} e - event
     */
    const onRowSelect = (row, isSelect, rowIndex, e) => {
        if (e.currentTarget.getAttribute("class") === "selection-cell") {
            props.selectedRowData(row, isSelect, rowIndex, e);
        }
    };

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${rowIndex}`);
            props.rowClick(row);
        },
    };

    /**
     * This function returns the select/unselect all the rows of current page on the basis of isSelect value .
     * @param {string} column - column to be sorted
     * @param {string} direction - ASC/DESC
     */
    const resetOnSorting = (column, direction) => {
        props.setSortOrder(column, direction);
    };

    const selectRowOptions = {
        mode: "checkbox",
        clickToSelect: true,
        style: { backgroundColor: "#D6E6F7" },
        nonSelectable: props.getNonSelectableRows
            ? props.getNonSelectableRows(tableData)
            : [],
        // nonSelectableClasses: "disabled-checkbox-row",
        selected: props.selectedIds,
        onSelect: (row, isSelect, rowIndex, e) => {
            onRowSelect(row, isSelect, rowIndex, e);
        },
        onSelectAll: props.handleOnSelectAll,
        hideSelectColumn: props.hideSelectAll,
        selectionHeaderRenderer: ({ indeterminate, ...rest }) => {
            return (
                <input
                    type="checkbox"
                    className={
                        (props.selectedIds == [])
                            ? "hidden-checkbox-row"
                            : "checkboxAll"
                    }
                    ref={(input) => {
                        if (input) input.indeterminate = indeterminate;
                    }}
                    checked={props.selectedIds !== [] ? false : true}
                    onChange={() => {}}
                    {...rest}
                />
            );
        },
        selectionRenderer: ({ mode, checked, ...rest }) => (
            <CustomCheckbox
                type={mode}
                className={
                    nonSelectableRows?.includes(rest.rowKey)
                        ? "hidden-checkbox-row"
                        : "d-grid"
                }
                onChange={() => {}}
                checked={checked}
            />
        ),
    };
    const defaultSortedOptions = [
        {
            dataField: props.tableData?.defaultSortField,
            order: props.tableData?.defaultSortOrder,
        },
    ];

    const rowStyle = (row, rowIndex) => {
        const style = {};
        if (rowIndex % 2) {
            style.backgroundColor = "#FAFAFC";
        }
        return style;
    };

    const columns = generateColumns();
    return (
        <div className={`custom-table pt-2`}>
            <div
                className={`tableWithCheckbox ${props?.tableOuterClass} ${
                    !props?.bottomButtons
                        ? "tableWithCheckboxWithoutBottomButtons"
                        : ""
                } `}
                onScroll={props.onScroll}
            >
                <BootstrapTable
                    responsive
                    id={props.id}
                    keyField={keyField}
                    data={tableData ? tableData : []}
                    classes={props.classes}
                    columns={columns}
                    bordered={props?.bordered}
                    rowClasses={props?.rowClasses}
                    bodyClasses={props?.bodyClasses}
                    headerWrapperClasses={props?.headerWrapperClasses}
                    noDataIndication={NoDataIndication}
                    striped={props?.striped}
                    selectRow={props.selectedRowData && selectRowOptions}
                    rowEvents={props.rowClick && rowEvents}
                    defaultSorted={
                        props?.isLocalSort ? defaultSortedOptions : []
                    }
                    defaultSortDirection={props?.defaultSortDirection}
                    expandRow={props.isExpand && props.expandRowOptions}
                    wrapperClasses="table-responsive"
                    rowStyle={props.rowStyle ? props.rowStyle : rowStyle}
                    footerClasses="footer-class"
                    filter={filterFactory()}
                />
            </div>
            {props.showPagination && (
                <CustomPaginate
                    tableData={tableData}
                    numberOfPages={props.numberOfPages}
                    onPageChange={props.onPageChange}
                    alignment="ms-auto"
                    pageSize={props.pageSize}
                    showPageSizeDropDown={props.showPageSizeDropDown}
                    currentPage={props?.currentPage}
                />
            )}
        </div>
    );
};

CustomTableComponent.propTypes = {
    id: PropTypes.string,
    tableData: PropTypes.object.isRequired,
    pagination: PropTypes.bool,
    onPageChange: PropTypes.func,
    onSorting: PropTypes.func,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    rowClasses: PropTypes.string,
    bodyClasses: PropTypes.string,
    headerWrapperClasses: PropTypes.string,
    tableError: PropTypes.string,
    rowClick: PropTypes.func,
    numberOfPages: PropTypes.number,
    setSortOrder: PropTypes.func,
    sortOrder: PropTypes.string,
    isExpand: PropTypes.bool,
    expandRowOptions: PropTypes.any,
    selectedRowData: PropTypes.func,
    sortBy: PropTypes.string,
    noDataText: PropTypes.string,
    noDataButton: PropTypes.any,
    classes: PropTypes.string,
    selectedIds: PropTypes.array,
    tableOuterClass: PropTypes.string,
    getNonSelectableRows: PropTypes.func,
    showPagination: PropTypes.bool,
    handleOnSelectAll: PropTypes.func,
    hideSelectAll: PropTypes.bool,
    pageSize: PropTypes.number,
    showPageSizeDropDown: PropTypes.bool,
    columnClick: PropTypes.func,
    defaultSortDirection: PropTypes.string,
    onScroll: PropTypes.func,
    rowStyle: PropTypes.func,
    bottomButtons: PropTypes.bool,
    isLocalSort: PropTypes.bool,
    currentPage: PropTypes.any,
    noDataImage :PropTypes.any
};

CustomTableComponent.defaultProps = {
    pagination: false,
    onPageChange: () => null,
    onSorting: () => null,
    bordered: false,
    striped: false,
    rowClasses: "",
    bodyClasses: "custom-table-body",
    headerWrapperClasses: "custom-table-header",
    setSortOrder: () => null,
    sortOrder: "asc",
    noDataText: "",
    classes: "",
    selectedIds: [],
    showPagination: true,
    hideSelectAll: true,
    expandRow: {},
    showPageSizeDropDown: true,
    columnClick: () => null,
    onScroll: () => null,
    bottomButtons: true,
    isLocalSort: false,
};

export default CustomTableComponent;
