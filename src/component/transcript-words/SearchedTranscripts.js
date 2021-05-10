import React from "react";
import transcripts from "../../util/transcript.json";
import {getFormatDateTime, getNumericalTime} from "../../util/util";
import "../../style.scss"

const SearchedTranscripts = ({searchValue}) => {

  return (
    <div className="searched-words">
      {transcripts.word_timings.map((sentence, index) => (
        <div key={index}>
          {transcripts.transcript_text[index]
            .toLowerCase()
            .includes(searchValue.toLowerCase()) && (
            <div
              className="searched"
              style={{
                marginLeft: index % 2 && "20px",
              }}
              key={index}
            >
              <span className={index % 2 ? "second-person" : "first-person"}>
                {getFormatDateTime(
                  0,
                  Math.round(getNumericalTime(sentence[0].startTime))
                )}
              </span>
              <span className="gray-box" />
              <span
                className={`muted-text-span ${index % 2 ? "text-muted" : ""}`}
              >
                {sentence.map((word, i) => (
                  <span key={i}>
                    <a>
                      {word.word
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ? (
                        <span style={{ backgroundColor: "orange" }}>
                          {word.word}
                        </span>
                      ) : (
                        <span>{word.word}</span>
                      )}{" "}
                    </a>
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchedTranscripts;
