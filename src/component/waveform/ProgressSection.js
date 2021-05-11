import React, {useContext, useEffect, useState} from "react";
import "../../style.scss"
import {ContextValues} from "../../context/ContextProvider";

const ProgressSection = () => {
    const { duration, seekBarWidth, second, setSecond, decaSecond, setDecaSecond } = useContext(ContextValues);
    const [widthPercent, setWidthPercent] = useState("0");

    useEffect(() => {
        const time = second + decaSecond / 1000;
        const percent = (time / duration) * 100;
        setWidthPercent(percent + "%");
    }, [decaSecond, second, setSecond, setDecaSecond]);

    const getTime = (e) => {
        const waveTime = e.nativeEvent.offsetX / seekBarWidth;
        const audioTime = waveTime * duration;
        setSecond(Math.floor(audioTime));
        setDecaSecond(Math.round((audioTime - Math.floor(audioTime)) * 10) * 100);
    };

    return (
      <div className="seek-bar" onClick={getTime} style={{ width: seekBarWidth }}>
        <div
          className="seek-line"
          style={{
            width: widthPercent,
          }}
        />
      </div>
    );
};

export default ProgressSection;
