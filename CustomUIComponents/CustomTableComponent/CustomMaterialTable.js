import React from "react";
import PropTypes from "prop-types";
import MaterialReactTable from "material-react-table";
import { Trans } from "react-i18next";

import "./CustomMaterialTable.scss";

const CustomMaterialTable = (props) => {
    const headerFormatter = ({ column }) => {
        return (
            <div className={`header-label-container`}>
                <Trans
                    i18nKey={column.columnDef.header}
                    components={{
                        newLine: "\n",
                        smallText: <div className="small-text" />,
                    }}
                />
            </div>
        );
    };

    const generateColumns = () => {
        let columnsArr = [];
        props.columnsList &&
            props.columnsList?.map((columnData) => {
                columnsArr.push({
                    accessorKey: columnData.accessorKey,
                    header: columnData.header,
                    size: columnData?.size,
                    accessorFn: columnData?.accessorFn,
                    enableEditing: columnData?.enableEditing,
                    id: columnData?.id,
                    Footer: columnData?.Footer,
                    Header: headerFormatter,
                    muiTableHeadCellProps: columnData?.muiTableHeadCellProps,
                    muiTableBodyCellProps: columnData?.muiTableBodyCellProps,
                    muiTableFooterCellProps:
                        columnData?.muiTableFooterCellProps,
                    Edit: columnData?.Edit,
                });
            });
        return columnsArr;
    };

    const columns = generateColumns();

    return (
        <div className="custom-material-table">
            <MaterialReactTable
                columns={columns}
                data={props.data}
                enablePinning
                enableColumnActions={false}
                enableFullScreenToggle={false}
                enableEditing
                enableDensityToggle={false}
                initialState={{
                    showColumnFilters: false,
                    columnPinning: { left: props.leftColumnPinned },
                    columnVisibility: props.columnVisibilityName,
                }}
                enableColumnFilters={false}
                enableGlobalFilter={false} //turn off a feature
                manualSorting
                enableStickyHeader
                enableStickyFooter={false}
                enableSorting={false}
                id={"tab"}
                muiTableContainerProps={{ sx: { maxHeight: '200px' } }}
                editingMode="table"
                enableTopToolbar={false}
                renderEmptyRowsFallback={() => <>{"No Data"}</>}
                tableInstanceRef={props.tableRef}
                enableBottomToolbar={false} // pagination
                enableRowActions={props.enableRowActions}
                enableGrouping={
                    props?.enableGrouping ? props?.enableGrouping : false
                }
                // renderRowActionMenuItems={() => [
                //     <MenuItem key="edit" onClick={() => console.info('Edit')}>
                //       Editff
                //     </MenuItem>,
                //     <MenuItem key="delete" onClick={() => console.info('Delete')}>
                //       Delete
                //     </MenuItem>,
                //   ]}
                positionActionsColumn="last"
                enablePagination={false}
            />
        </div>
    );
};

CustomMaterialTable.propTypes = {
    columnsList: PropTypes.array,
    data: PropTypes.array,
    leftColumnPinned: PropTypes.array,
    columnVisibility: PropTypes.object,
    tableRef: PropTypes.any,
    rowActionMenuItems: PropTypes.any,
    enableRowActions: PropTypes.bool,
    enableGrouping: PropTypes.bool,
    columnVisibilityName: PropTypes.object,
};

export default CustomMaterialTable;
