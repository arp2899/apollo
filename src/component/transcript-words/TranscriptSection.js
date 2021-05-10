import React, {useEffect, useState} from "react";
import transcripts from "../../util/transcript.json";
import {publicUrl} from "../../util/util";
import "../../style.scss";
import SearchedTranscripts from "../transcript-words/SearchedTranscripts";
import Transcripts from "../transcript-words/Transcripts";

const TranscriptSection = () => {
  const [ haveSearched, setHaveSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    let resultNumber = 0;
    for (let i = 0; i < transcripts.word_timings.length; i++) {
      for (let j = 0; j < transcripts.word_timings[i].length; j++) {
        if (
          transcripts.word_timings[i][j].word
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          resultNumber = resultNumber + 1;
        }
      }
    }
    setResult(resultNumber);
  }, [searchValue, transcripts.transcript_text, transcripts.word_timings]);

  return (
    <div>
      <div className="search-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
                searchValue &&
                searchValue.trim() &&
                searchValue.trim().length > 1
            ) {
              setHaveSearched(true);
            }
          }}
        >
          <input
            className="input"
            placeholder={"Search Call Transcript"}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <img
            className="search-icon"
            src={publicUrl("/img/icon-search.png")}
          />
          {haveSearched && (
            <span className="result">
              {result} results
              <span
                onClick={() => {
                  setSearchValue("");
                  setHaveSearched(false);
                }}
                className="clear-search"
              >
                Clear Search
              </span>
            </span>
          )}
        </form>
      </div>
      {haveSearched ? <SearchedTranscripts searchValue={searchValue}/> : <Transcripts />}{" "}
    </div>
  );
};

export default TranscriptSection;
