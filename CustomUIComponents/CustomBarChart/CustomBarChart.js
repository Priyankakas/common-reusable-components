import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import "./CustomBarChart.scss";
import { CarouselGraphItems } from "./CarouselGraphItems.js";

export const CustomBarChart = (props) => {
    const [focusBar, setFocusBar] = useState(null);
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);
    const [originalData, setOriginalData] = useState(props?.barGraphData);
    const [barGraphSlicedData, setBarGraphSlicedData] = useState([]);

    const getFill = (uniqueKey) => {
        return focusBar == uniqueKey ? "#095CD9" : "#ACBED1";
    };

    const handleClick = (uniqueKey) => {
        setFocusBar(uniqueKey);
    };

    const handleOnClick = (event, item) => {
        props.handleOffCanvasScreen(item);
    };

    useEffect(() => {
        let slicedData = props?.barGraphData?.slice(offset, limit);
        setOriginalData(props?.barGraphData);
        setBarGraphSlicedData([...slicedData]);
    }, [props?.barGraphData]);

    const handleBarGraphNext = () => {
        let slicedData = originalData?.slice(offset + 9, limit + 9);
        setOffset(offset + 9);
        setLimit(limit + 9);
        console.log("slicedData", slicedData);
        setBarGraphSlicedData([...slicedData]);
    };
    const handleBarGraphPrev = () => {
        let slicedData = originalData?.slice(offset - 9, limit - 9);
        setOffset(offset - 9);
        setLimit(limit - 9);
        console.log("slicedData", slicedData);
        setBarGraphSlicedData([...slicedData]);
    };

    return (
        <>
            <ResponsiveContainer aspect={3} width={"88%"} height={250} className={"custom-bar-chart"}>
                <BarChart
                    width={400}
                    height={200}
                    data={barGraphSlicedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="none" axisLine={true} tickLine={false} />
                    <YAxis type="number" domain={[0, 80]} axisLine={true} />

                    <Bar dataKey="pv" barSize={30}>
                        {barGraphSlicedData?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getFill(entry.uniqueKey)}
                                onMouseOver={() => handleClick(entry.uniqueKey)}
                                onClick={(event) => handleOnClick(event, entry)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <CarouselGraphItems
                totalItems={props?.barGraphData}
                barGraphSlicedData={barGraphSlicedData}
                getFill={getFill}
                handleBarGraphPrev={handleBarGraphPrev}
                handleBarGraphNext={handleBarGraphNext}
                handleClick={handleClick}
                handleOffCanvasScreen={props.handleOffCanvasScreen}
            />
        </>
    );
};

CustomBarChart.propTypes = {
    barGraphData: PropTypes.array,
    handleOffCanvasScreen: PropTypes.func,
};
