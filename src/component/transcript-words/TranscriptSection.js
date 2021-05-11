import React from "react";
import { getUrlPath } from "../../util/util";
import "../../style.scss";
import Transcripts from "../transcript-words/Transcripts";

const TranscriptSection = () => {
  return (
    <div>
      <div className="search">
        <form
          style={{ position: "relative" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input className="search-input" placeholder={"Search Call Transcript"} />
          <img
            className="icon"
            src={getUrlPath("/img/icon-search.png")}
            alt={"search icon"}
          />
        </form>
      </div>
      <Transcripts />
    </div>
  );
};

export default TranscriptSection;
