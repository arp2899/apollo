import React, { useContext, useEffect, useRef, useState } from "react";
import { getTimeInFormat, getUrlPath } from "../../util/util";
import "react-h5-audio-player/lib/styles.css";
import "../../style.scss";
import ReactAudioPlayer from "react-h5-audio-player";
import { ContextValues } from "../../context/ContextProvider";

const AudioPlayer = () => {
  const audioRef = useRef(null);

  const {
    timerId,
    setTimerId,
    second,
    setSecond,
    decaSecond,
    setDecaSecond,
    duration,
    setDuration,
  } = useContext(ContextValues);

  useEffect(() => {
    const time = second + decaSecond / 1000;
    audioRef.current.audio.current.currentTime = time;
  }, [decaSecond]);

  useEffect(() => {
    let audio = audioRef.current.audio.current;
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      setDuration(Math.round(audio.duration));
    };
  }, []);

  useEffect(() => {
    if (decaSecond >= 999) {
      setSecond((second) => second + 1);
      setDecaSecond(0);
    }
  }, [decaSecond]);

  const onPlay = () => {
    const timerId = setInterval(
      () => setDecaSecond((decaSecond) => decaSecond + 100),
      100
    );
    setTimerId(timerId);
  };

  const onPause = () => {
    clearInterval(timerId);
  };

  const onEnded = () => {
    clearInterval(timerId);
    setSecond(0);
    setDecaSecond(0);
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(0);
      setDecaSecond(0);
    }
  }, [second]);

  return (
    <div className="player">
      <ReactAudioPlayer
        ref={audioRef}
        src={"audio/audio.wav"}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />
      <div className="controls">
        <div
          className="forward-button"
          onClick={() => setSecond((second) => second + 10)}
        >
          <img
            src={getUrlPath("/img/rotate-right.svg")}
            className="forward-image"
            alt={"forward"}
          />
          <span className="forward-time">10</span>
        </div>
        <div
          className="rewind-button"
          onClick={() => setSecond((second) => second - 10)}
        >
          <img
            src={getUrlPath("/img/rotate-left.svg")}
            className="rewind-image"
            alt={"rewind"}
          />
          <span className="rewind-time">10</span>
        </div>
        <div>
          <select className="speed-input">
            <option value="1">1.00x</option>
            <option value="0.5">0.50x</option>
            <option value="0.75">0.75x</option>
            <option value="1.5">1.50x</option>
            <option value="2.0">2.00x</option>
          </select>
        </div>
        <div className="share-image">
          <img src={getUrlPath("/img/share.png")} alt={"share"} />
        </div>
      </div>

      <span className="duration">
        <span>{getTimeInFormat(0, second)}</span> /{" "}
        <span style={{ color: "#a8acad" }}>
          {getTimeInFormat(Math.floor(duration / 60), duration % 60)}
        </span>
      </span>
    </div>
  );
};

export default AudioPlayer;
