import React from "react";
import {getUrlPath} from "../../util/utils";
import "../../style.scss";
import TranscriptWords from "./TranscriptWords";

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
      <TranscriptWords />
    </div>
  );
};

export default TranscriptSection;
