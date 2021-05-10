import React, {useContext, useState} from "react";
import transcripts from "../../util/transcript.json";
import {getFormatDateTime, getNumericalTime} from "../../util/util";
import "../../style.scss"
import {ContextValues} from "../../context/ContextProvider";

const Transcripts = () => {
  const { second, setSecond } = useContext(ContextValues);
  const { decaSecond, setDecaSecond } = useContext(ContextValues);
  const [showShare, setShowShare] = useState(false);

  const time = second + decaSecond / 1000;

  const onWordClick = (time) => {
    setSecond(Math.floor(getNumericalTime(time)));
    setDecaSecond(
      Math.ceil(
        (getNumericalTime(time) - Math.floor(getNumericalTime(time))) * 10
      ) * 100
    );
    setShowShare(true);
    setTimeout(() => setShowShare(false), 3000);
  };

  return (
    <div className="transcript-words">
      {transcripts.word_timings.map((sentence, index) => {
        const bg =
          time >= getNumericalTime(sentence[0].startTime) &&
          time <= getNumericalTime(sentence[sentence.length - 1].endTime)
            ? "#f0fcff"
            : "";
        return (
          <div
            className="transcript-container"
            style={{
              marginLeft: index % 2 && "20px",
              backgroundColor: bg,
            }}
            key={index}
          >
            <span className={index % 2 ? "second-person" : "first-person"}>
              {getFormatDateTime(
                0,
                Math.round(getNumericalTime(sentence[0].startTime))
              )}
            </span>

            <span className="line-divider" />

            <span className="word-container">
              {sentence.map((word, i) => (
                <span onClick={() => onWordClick(word.startTime)} key={i}>
                  {time >= getNumericalTime(word.startTime) &&
                  time < getNumericalTime(word.endTime) ? (
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

              {showShare && <div className="share">share</div>}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Transcripts;
