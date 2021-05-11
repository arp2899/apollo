import React, { useContext, useEffect, useState } from "react";
import { getApproxTimeInNumber } from "../../util/util";
import transcripts from "../../util/transcript.json";
import LineWave from "./LineWave";
import "../../style.scss";
import { ContextValues } from "../../context/ContextProvider";

const WaveForm = () => {
  const { duration } = useContext(ContextValues);
  const { seekBarWidth } = useContext(ContextValues);
  const [firstPerson, setFirstPerson] = useState(0);
  const [secondPerson, setSecondPerson] = useState(0);

  let prevMarginFirstPerson = 0;
  const getWaveLineMargin = (startTime, endTime) => {
    const prevMargin = (getApproxTimeInNumber(endTime) * seekBarWidth) / duration;
    const margin =
      (getApproxTimeInNumber(startTime) * seekBarWidth) / duration -
      prevMarginFirstPerson;
    prevMarginFirstPerson = prevMargin;
    return margin + "px";
  };

  useEffect(() => {
    let total = 0,
      wordsFirstPerson = 0;
    const transcriptLength = transcripts.word_timings.length;
    for (let i = 0; i < transcriptLength; i++) {
      total += transcripts.word_timings[i].length;
    }
    for (let j = 0; j < transcriptLength; j++) {
      if (j % 2 == 0) {
        wordsFirstPerson += transcripts.word_timings[j].length;
      }
    }
    const percent = Math.round((wordsFirstPerson / total) * 100);
    setFirstPerson(percent);
    setSecondPerson(100 - percent);
  }, []);

  return (
    <div className="wave-section">
      <div className="person-word-percent">
        <div className="first-person">{firstPerson} % You</div>
        <div className="second-person">{secondPerson} % Other</div>
      </div>
      <div className="axis">
        {transcripts.word_timings.map((transcript, index) => (
          <div key={index}>
            {index % 2 == 0 ? (
              <div className="upper-wave">
                {transcript.map((word, index) => {
                  const marginLeft = getWaveLineMargin(
                    word.startTime,
                    word.endTime
                  );
                  return (
                    <WaveStripComps
                      marginLeft={marginLeft}
                      color={"#967ee4"}
                      startTime={word.startTime}
                      endTime={word.endTime}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="lower-wave">
                {transcript.map((word, index) => {
                  const marginLeft = getWaveLineMargin(
                    word.startTime,
                    word.endTime
                  );
                  return (
                    <WaveStripComps
                      marginLeft={marginLeft}
                      color={"#64afe9"}
                      startTime={word.startTime}
                      endTime={word.endTime}
                      key={index}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const WaveStripComps = ({ marginLeft, startTime, endTime, color }) => {
  return (
    <div
      style={{
        marginLeft,
      }}
    >
      <LineWave startTime={startTime} endTime={endTime} color={color} />
    </div>
  );
};

export default WaveForm;
