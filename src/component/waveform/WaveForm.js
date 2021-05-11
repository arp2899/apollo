import React, { useContext, useEffect, useState } from "react";
import "../../style.scss";
import { ContextValues } from "../../context/ContextProvider";
import { transcriptData } from "../../util/utils";

const WaveForm = () => {
  const { duration, seekBarWidth, milliSecond, second } = useContext(
    ContextValues
  );
  const [firstPersonWordPercent, setFirstPersonWordPercent] = useState(0);
  const [secondPersonWordPercent, setSecondPersonWordPercent] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(second + milliSecond / 1000);
  }, [milliSecond, second]);

  useEffect(() => {
    let total = 0,
      wordsFirstPerson = 0;
    const transcriptLength = transcriptData.word_timings.length;
    for (let i = 0; i < transcriptLength; i++) {
      total += transcriptData.word_timings[i].length;
    }
    for (let j = 0; j < transcriptLength; j++) {
      if (j % 2 === 0) {
        wordsFirstPerson += transcriptData.word_timings[j].length;
      }
    }
    const percent = Math.round((wordsFirstPerson / total) * 100);
    setFirstPersonWordPercent(percent);
    setSecondPersonWordPercent(100 - percent);
  }, []);

  let previousMargin = 0;
  const getMargin = (startTime, endTime) => {
    const margin =
      (parseFloat(startTime) * seekBarWidth) / duration - previousMargin;
    previousMargin = (parseFloat(endTime) * seekBarWidth) / duration;
    return margin;
  };

  const getWidth = (startTime, endTime) => {
    return (
      ((parseFloat(endTime) - parseFloat(startTime)) * seekBarWidth) / duration
    );
  };

  const getGrayOutWidth = (startTime, endTime) => {
    const seekBarPosition = (time / duration) * seekBarWidth;
    let grayOutWidth;
    grayOutWidth =
      time >= parseFloat(startTime)
        ? seekBarPosition - (parseFloat(startTime) * seekBarWidth) / duration
        : 0;
    if (time > parseFloat(endTime)) {
      grayOutWidth =
        grayOutWidth -
        (seekBarPosition - (parseFloat(endTime) * seekBarWidth) / duration);
    }
    return grayOutWidth;
  };

  return (
    <div className="wave-section">
      <div className="person-word-percent">
        <div className="first-person">{firstPersonWordPercent} % YOU</div>
        <div className="second-person">
          {secondPersonWordPercent} % MICHEAL B.
        </div>
      </div>
      <div className="axis">
        {transcriptData.word_timings.map((transcript, index) => {
          const marginLeft = getMargin(
            transcript[0].startTime,
            transcript[transcript.length - 1].endTime
          );
          const width = getWidth(
            transcript[0].startTime,
            transcript[transcript.length - 1].endTime
          );
          const grayOutWidth = getGrayOutWidth(
            transcript[0].startTime,
            transcript[transcript.length - 1].endTime
          );

          return (
            <div
              key={index}
              style={{ marginLeft: `${marginLeft}px`, width: `${width}px` }}
            >
              <div className={index % 2 === 0 ? "upper-wave" : "lower-wave"} />
              <div style={{ width: `${grayOutWidth}px` }}>
                <div
                  className={
                    index % 2 === 0
                      ? "upper-wave-overlay"
                      : "lower-wave-overlay"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaveForm;
