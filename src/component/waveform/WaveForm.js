import React, { useContext, useEffect, useState } from "react";
import { getNumericalTime } from "../../util/util";
import transcripts from "../../util/transcript.json";
import LineWave from "./LineWave";
import "../../style.scss";
import {ContextValues} from "../../context/ContextProvider";

const WaveForm = () => {
  const { duration } = useContext(ContextValues);
  const { waveWidth } = useContext(ContextValues);
  const [totalWords, setTotalWords] = useState(0);
  const [totalWordsFirstPerson, setTotalWordsFirstPerson] = useState(0);

  let prevMarginFirstPerson = 0;
  let prevMarginSecondPerson = 0;

  const getWaveLineMargin = (startTime, endTime, person) => {
    let margin;
    const prevMargin = (getNumericalTime(endTime) * waveWidth) / duration;
    if (person === "first") {
      margin =
        (getNumericalTime(startTime) * waveWidth) / duration -
        prevMarginFirstPerson;
      prevMarginFirstPerson = prevMargin;
    } else {
      margin =
        (getNumericalTime(startTime) * waveWidth) / duration -
        prevMarginSecondPerson;
      prevMarginSecondPerson = prevMargin;
    }
    return margin + "px";
  };

  useEffect(() => {
    let total = 0,
      wordsFirstPerson = 0;
    const transcriptLength = transcripts.word_timings.length;
    for (let i = 0; i < transcriptLength; i++) {
      total += transcripts.word_timings[i].length;
    }
    setTotalWords(total);
    for (let j = 0; j < transcriptLength; j++) {
      if (j % 2 == 0) {
        wordsFirstPerson += transcripts.word_timings[j].length;
      }
    }
    setTotalWordsFirstPerson(wordsFirstPerson);
  }, []);

  const firstPercent = Math.round((totalWordsFirstPerson / totalWords) * 100);
  const secondPercent = 100 - firstPercent;

  return (
    <div className="wave-form">
      <div className="transcript-percent">
        <div className="first-percent">{firstPercent} % You</div>
        <div className="second-percent">{secondPercent} % Other</div>
      </div>
      <div className="wave">
        {transcripts.word_timings.map((transcript, index) => (
          <div key={index}>
            {index % 2 == 0 ? (
              <div className="first-person">
                {transcript.map((word, index) => {
                  const marginLeft = getWaveLineMargin(
                    word.startTime,
                    word.endTime,
                    "first"
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
              <div className="second-person">
                {transcript.map((word, index) => {
                  const marginLeft = getWaveLineMargin(
                    word.startTime,
                    word.endTime,
                    "second"
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
      className="wave-strip"
      style={{
        marginLeft,
      }}
    >
      <LineWave startTime={startTime} endTime={endTime} color={color} />
    </div>
  );
};

export default WaveForm;
