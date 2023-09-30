/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { PieChart, Pie, Cell, Label, Sector } from "recharts";

import PropTypes from "prop-types";
import { translate } from "SERVICES/i18n";
import "./CustomPieChart.scss";

export const CustomPieChart = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    const values = props?.pieChartData?.map((item) => item.count);
    const sum = values?.reduce((acc, value) => {
        return acc + value;
    });

    const renderFallBackPieChart = () => {
        console.log("piehart values", values, props?.pieChartData);
        {
            /* render 100% fallback Pie */
        }
        return (
            sum === 0 && (
                <Pie
                    innerRadius={40}
                    outerRadius={60}
                    data={[{ name: "No Data", value: 1 }]}
                    fill="#eeeeee"
                />
            )
        );
    };

    const handleOnClick = (event, item) => {
        console.log("item_______: ", item);
        // id =10 (OTHER items) (except other allow click of items)
        if (item.id !== 10) {
            props.handleOffCanvasScreen(item);
        }
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            count,
            cellName,
            onClick,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g onClick={onClick}>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    // fill={fill}
                    className="legend-text"
                >
                    {cellName}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    // fill={fill}
                >
                    {count}
                </text>
            </g>
        );
    };

    return (
        <>
            <PieChart
                width={props?.width}
                height={props?.height}
                className="pie-chart-container"
            >
                {props?.pieChartData?.length > 0 ? (
                    <>
                        <text
                            x={props?.textLeft}
                            y={props?.textTop}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="total"
                        >
                            {translate("TOTAL")}
                        </text>
                        <text
                            className="count"
                            x={props.textLeft}
                            y={props?.textTop + 23}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {sum}
                        </text>
                    </>
                ) : (
                    ""
                )}
                <Pie
                    dataKey="count"
                    paddingAngle={3}
                    data={props?.pieChartData}
                    innerRadius={40}
                    outerRadius={60}
                    // label={renderLabel}
                    activeIndex={activeIndex}
                    cx="50%"
                    cy="50%"
                    onMouseEnter={onPieEnter}
                    activeShape={renderActiveShape}
                >
                    {props?.pieChartData?.map((entry, index) => (
                        <Cell
                            style={{ outline: "none", cursor: "pointer" }}
                            onClick={() =>
                                entry.isActionable &&
                                handleOnClick(event, entry)
                            }
                            key={`cell-${index}`}
                            fill={entry.color}
                            count={entry.count}
                            cellName={entry.statusName}
                        />
                    ))}
                </Pie>
                {renderFallBackPieChart()}
            </PieChart>
        </>
    );
};

CustomPieChart.propTypes = {
    pieChartData: PropTypes.array,
    handleOffCanvasScreen: PropTypes.func,
    label: PropTypes.bool,
    width: PropTypes.any,
    height: PropTypes.any,
    textLeft: PropTypes.any,
    textTop: PropTypes.any,
    filterName: PropTypes.any,
};
