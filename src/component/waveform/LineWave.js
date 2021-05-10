import React, {useContext} from "react";
import {getNumericalTime} from "../../util/util";
import "../../style.scss";
import {ContextValues} from "../../context/ContextProvider";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LineWave = ({ startTime, endTime, color }) => {
    const { duration } = useContext(ContextValues);
    const {waveWidth} = useContext(ContextValues);
    const {decaSecond} = useContext(ContextValues);
    const {second} = useContext(ContextValues);

    const getWidth = (startTime, EndTime) => {
        const time =
            getNumericalTime(EndTime) - getNumericalTime(startTime);
        const width = (time / duration) * waveWidth;
        return width + "px";
    };

    const time = second + decaSecond / 1000;

    return (
        <div
            className="line-wave"
            style={{ width: getWidth(startTime, endTime) }}
        >
            {arr.map((_, index) => (
                <span key={index}>
          {time > getNumericalTime(startTime) + index / 10 ? (
              <div className="line" />
          ) : (
              <div className="line" style={{ borderColor: color }} />
          )}
        </span>
            ))}
        </div>
    );
};

export default LineWave;
