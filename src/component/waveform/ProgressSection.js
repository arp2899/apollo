import React, {useContext, useEffect, useState} from "react";
import "../../style.scss"
import {ContextValues} from "../../context/ContextProvider";

const ProgressSection = () => {
    const { duration } = useContext(ContextValues);
    const {waveWidth} = useContext(ContextValues)
    const {second, setSecond} = useContext(ContextValues);
    const {decaSecond, setDecaSecond} = useContext(ContextValues);
    const [widthPercent, setWidthPercent] = useState("0");
    const time = second + decaSecond / 1000;

    useEffect(() => {
        const percent = (time / duration) * 100;
        setWidthPercent(percent + "%");
    }, [time]);

    const getTime = (e) => {
        const waveTime = e.nativeEvent.offsetX / waveWidth;
        const audioTime = waveTime * duration;
        setSecond(Math.floor(audioTime));
        setDecaSecond(Math.round((audioTime - Math.floor(audioTime)) * 10) * 100);
    };

    return (
        <div className="traversing-line" onClick={getTime} style={{width:waveWidth}}>
            <div
                className="moving-line"
                style={{
                    width: widthPercent,
                }}
            />
        </div>
    );
};

export default ProgressSection;
