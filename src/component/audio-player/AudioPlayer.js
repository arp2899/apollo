import React, {useContext, useEffect, useRef} from "react";
import {getTimeInFormat, getUrlPath} from "../../util/utils";
import "react-h5-audio-player/lib/styles.css";
import "../../style.scss";
import ReactAudioPlayer from "react-h5-audio-player";
import {ContextValues} from "../../context/ContextProvider";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    timerId,
    setTimerId,
    second,
    setSecond,
    milliSecond,
    setMilliSecond,
    duration,
    setDuration,
  } = useContext(ContextValues);

  useEffect(() => {
    let audio = audioRef.current.audio.current;
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      setDuration(Math.round(audio.duration));
    };
  }, []);

  useEffect(() => {
    const time = second + milliSecond / 1000;
    audioRef.current.audio.current.currentTime = time;
  }, [milliSecond]);

  const onPlay = () => {
    const timerId = setInterval(
      () => setMilliSecond((milliSecond) => milliSecond + 100),
      100
    );
    setTimerId(timerId);
  };

  useEffect(() => {
    if (milliSecond >= 999) {
      setSecond((second) => second + 1);
      setMilliSecond(0);
    }
  }, [milliSecond]);

  const onEnded = () => {
    clearInterval(timerId);
    setSecond(0);
    setMilliSecond(0);
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(0);
      setMilliSecond(0);
    }
  }, [second]);

  return (
    <div className="player">
      <ReactAudioPlayer
        ref={audioRef}
        src={"audio/audio.wav"}
        onPlay={onPlay}
        onPause={() => clearInterval(timerId)}
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
          <div className="forward-time">10</div>
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
          <div className="rewind-time">10</div>
        </div>
        <div>
          <select className="speed-input" disabled={true}>
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
