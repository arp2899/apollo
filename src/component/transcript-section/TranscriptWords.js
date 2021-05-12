import React, {useContext} from "react";
import "../../style.scss";
import {ContextValues} from "../../context/ContextProvider";
import {transcriptData} from "../../data";

const TranscriptWords = () => {
  const { second, setSecond } = useContext(ContextValues);
  const { milliSecond, setMilliSecond } = useContext(ContextValues);

  const time = second + milliSecond / 1000;

  const setTimeAtWordClick = (time) => {
    setSecond(Math.floor(parseFloat(time)));
    setMilliSecond(
      Math.ceil((parseFloat(time) - Math.floor(parseFloat(time))) * 10) * 100
    );
  };

  return (
    <div className="transcripts">
      {transcriptData.word_timings.map((sentence, index) => {
        const bg =
          time >= parseFloat(sentence[0].startTime) &&
          time <= parseFloat(sentence[sentence.length - 1].endTime)
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
            <span
              className="transcript-time"
              style={{ color: index % 2 ? "#339ed4" : "#a135d4" }}
            >
              <span>00</span>:
              <span>
                {("00" + Math.round(parseFloat(sentence[0].startTime))).slice(
                  -2
                )}
              </span>
            </span>

            <span className="divider" />

            <span className="transcript-words">
              {sentence.map((word, i) => (
                <span
                  onClick={() => setTimeAtWordClick(word.startTime)}
                  key={i}
                >
                  {time >= parseFloat(word.startTime) &&
                  time < parseFloat(word.endTime) ? (
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

export default TranscriptWords;
