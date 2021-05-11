import React, {useContext, useState} from "react";
import transcripts from "../../util/transcript.json";
import {getTimeInFormat, getApproxTimeInNumber} from "../../util/util";
import "../../style.scss"
import {ContextValues} from "../../context/ContextProvider";

const Transcripts = () => {
  const { second, setSecond } = useContext(ContextValues);
  const { decaSecond, setDecaSecond } = useContext(ContextValues);

  const time = second + decaSecond / 1000;

  const onWordClick = (time) => {
    setSecond(Math.floor(getApproxTimeInNumber(time)));
    setDecaSecond(
      Math.ceil(
        (getApproxTimeInNumber(time) - Math.floor(getApproxTimeInNumber(time))) * 10
      ) * 100
    );
  };

  return (
    <div className="transcripts">
      {transcripts.word_timings.map((sentence, index) => {
        const bg =
          time >= getApproxTimeInNumber(sentence[0].startTime) &&
          time <= getApproxTimeInNumber(sentence[sentence.length - 1].endTime)
            ? "#f0fcff"
            : "";
        return (
          <div
            className="section"
            style={{
              marginLeft: index % 2 && "20px",
              backgroundColor: bg,
            }}
            key={index}
          >
            <span className="transcript-time" style={{color: index%2 ? "cornflowerblue": "mediumpurple"}}>
              {getTimeInFormat(
                0,
                Math.round(getApproxTimeInNumber(sentence[0].startTime))
              )}
            </span>

            <span className="divider" />

            <span className="transcript-words">
              {sentence.map((word, i) => (
                <span onClick={() => onWordClick(word.startTime)} key={i}>
                  {time >= getApproxTimeInNumber(word.startTime) &&
                  time < getApproxTimeInNumber(word.endTime) ? (
                    <a className="word">
                      <span style={{ backgroundColor: "lightblue" }}>
                        {word.word}
                      </span>{" "}
                    </a>
                  ) : (
                    <a className="word">
                      <span>{word.word}</span>{" "}
                    </a>
                  )}
                </span>
              ))}

            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Transcripts;
