import React, { useContext, useEffect, useState } from "react";
import { getApproxTimeInNumber } from "../../util/utils";
import transcripts from "../../data/transcript.json";
import WaveLine from "./WaveLine";
import "../../style.scss";
import { ContextValues } from "../../context/ContextProvider";

const WaveForm = () => {
  const { duration, seekBarWidth } = useContext(ContextValues);
  const [firstPersonWordPercent, setFirstPersonWordPercent] = useState(0);
  const [secondPersonWordPercent, setSecondPersonWordPercent] = useState(0);

  let previousMargin = 0;
  const getMarginForWord = (startTime, endTime) => {
    const margin =
      (getApproxTimeInNumber(startTime) * seekBarWidth) / duration -
      previousMargin;
    previousMargin = (getApproxTimeInNumber(endTime) * seekBarWidth) / duration;

    return margin + "px";
  };

  const getWidth = (startTime, endTime) =>{
    return (parseFloat(endTime) - parseFloat(startTime)) * seekBarWidth/duration

  }

  useEffect(() => {
    let total = 0,
      wordsFirstPerson = 0;
    const transcriptLength = transcripts.word_timings.length;
    for (let i = 0; i < transcriptLength; i++) {
      total += transcripts.word_timings[i].length;
    }
    for (let j = 0; j < transcriptLength; j++) {
      if (j % 2 === 0) {
        wordsFirstPerson += transcripts.word_timings[j].length;
      }
    }
    const percent = Math.round((wordsFirstPerson / total) * 100);
    setFirstPersonWordPercent(percent);
    setSecondPersonWordPercent(100 - percent);
  }, []);

  return (
    <div className="wave-section">
      <div className="person-word-percent">
        <div className="first-person">{firstPersonWordPercent} % You</div>
        <div className="second-person">{secondPersonWordPercent} % Other</div>
      </div>
      <div className="axis">
        {transcripts.word_timings.map((transcript, index) => {
          const marginLeft = getMarginForWord(
            transcript[0].startTime,
            transcript[transcript.length-1].endTime
          );
          const width = getWidth(transcript[0].startTime,
              transcript[transcript.length-1].endTime)
          return (
            <div key={index} style={{ marginLeft:  marginLeft , width: width }}>
              {index % 2 === 0 ? (
                <div className="upper-wave">
                  {transcript.map((word, index) => {
                    return (
                        <div className="strip" />
                    );
                  })}
                </div>
              ) : (
                <div className="lower-wave">
                  {transcript.map((word, index) => {
                    return (
                        <div className="strip" />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// const WordWaveStrip = ({ startTime, endTime, color }) => {
//   return (
//     // <div
//     // >
//     //   <WaveLine startTime={startTime} endTime={endTime} color={color} />
//     // </div>
//   );
// };

export default WaveForm;
