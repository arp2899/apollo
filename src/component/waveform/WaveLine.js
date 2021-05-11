import React, {useContext} from "react";
import {getApproxTimeInNumber} from "../../util/utils";
import "../../style.scss";
import {ContextValues} from "../../context/ContextProvider";

// let arrayForLineMaking = [];
// const avgWaveLineWidth = 2;
const WaveLine = ({ startTime, endTime, color }) => {
  const { duration, seekBarWidth, milliSecond, second } = useContext(
    ContextValues
  );

  // const getWidthForWord = (startTime, EndTime) => {
  //   const time =
  //     getApproxTimeInNumber(EndTime) - getApproxTimeInNumber(startTime);
  //   if (duration === null || duration === undefined || duration === 0)
  //     return "0";
  //   const width = (time / duration) * seekBarWidth;
  //   const numberOfLines = Math.ceil(width / avgWaveLineWidth);
  //   arrayForLineMaking = new Array(numberOfLines).fill(0);
  //   return width + "px";
  // };

  const time = second + milliSecond / 1000;

  return (
    <div
      className="strip"
      // style={{ width: getWidthForWord(startTime, endTime) }}
    >
        {/*<span >*/}
        {/*  /!*{time >=*!/*/}
        {/*  /!*getApproxTimeInNumber(startTime) +*!/*/}
        {/*  /!*  (index / arrayForLineMaking.length) **!/*/}
        {/*  /!*    (getApproxTimeInNumber(endTime) -*!/*/}
        {/*  /!*      getApproxTimeInNumber(startTime)) ? (*!/*/}
        {/*    <div className="wave-line" />*/}
        {/*  /!*) : (*!/*/}
        {/*  /!*  <div className="wave-line" style={{ borderColor: color }} />*!/*/}
        {/*  /!*)}*!/*/}
        {/*</span>*/}
    </div>
  );
};

export default WaveLine;
