import React, { useContext, useState } from "react";
import { getApproxTimeInNumber } from "../../util/util";
import "../../style.scss";
import { ContextValues } from "../../context/ContextProvider";

let arr = [];
const LineWave = ({ startTime, endTime, color }) => {
  const { duration, seekBarWidth, decaSecond, second } = useContext(ContextValues);

  const getWidth = (startTime, EndTime) => {
    const time = getApproxTimeInNumber(EndTime) - getApproxTimeInNumber(startTime);
    if (duration === null || duration === undefined || duration === 0) return "0";
    const width = (time / duration) * seekBarWidth;

    const numberOfLines = Math.ceil(width / 3);
    arr = new Array(numberOfLines).fill(0);
    console.log({numberOfLines, arr, width})
    return width + "px";
  };

  const time = second + decaSecond / 1000;

  return (
    <div className="strip" style={{ width: getWidth(startTime, endTime) }}>
      {arr.map((_, index) => (
        <span key={index}>
          {time >= getApproxTimeInNumber(startTime) + (index / arr.length)*(getApproxTimeInNumber(endTime)-getApproxTimeInNumber(startTime)) ? (
            <div className="wave-line" />
          ) : (
            <div className="wave-line" style={{ borderColor: color }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default LineWave;
