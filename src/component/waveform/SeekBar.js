import React, {useContext, useEffect, useState} from "react";
import "../../style.scss"
import {ContextValues} from "../../context/ContextProvider";

const SeekBar = () => {
    const { duration, seekBarWidth, second, setSecond, milliSecond, setMilliSecond } = useContext(ContextValues);
    const [widthPercent, setWidthPercent] = useState("0");

    useEffect(() => {
        const time = second + milliSecond / 1000;
        const percent = (time / duration) * 100;
        setWidthPercent(percent + "%");
    }, [milliSecond, second, setSecond, setMilliSecond]);

    const setTime = (e) => {
        const waveTime = e.nativeEvent.offsetX / seekBarWidth;
        const audioTime = waveTime * duration;
        setSecond(Math.floor(audioTime));
        setMilliSecond(Math.round((audioTime - Math.floor(audioTime)) * 10) * 100);
    };

    return (
      <div className="seek-bar" onClick={setTime} style={{ width: seekBarWidth }}>
        <div
          className="seek-line"
          style={{
            width: widthPercent,
          }}
        />
      </div>
    );
};

export default SeekBar;
