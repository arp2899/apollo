import React, {useContext, useEffect, useRef} from "react";
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
    audioRef.current.audio.current.currentTime = second + milliSecond / 1000;
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
    if (second < 0 || second > duration) {
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
            src={"/img/rotate-right.svg"}
            className="forward-image"
            alt={"forward"}
          />
        </div>
        <div
          className="rewind-button"
          onClick={() => setSecond((second) => second - 10)}
        >
          <img
            src={"/img/rotate-left.svg"}
            className="rewind-image"
            alt={"rewind"}
          />
        </div>
        <div>
          <select className="speed-input" disabled={true}>
            <option value="1">1.0 x</option>
          </select>
        </div>
        <div className="share-image">
          <img src={"/img/share.png"} alt={"share"} />
        </div>
      </div>

      <span className="duration">
        <span>00</span>:<span>{("00" + second).slice(-2)}</span> /{" "}
        <span style={{ color: "#919394" }}>
          {("00" + Math.floor(duration / 60)).slice(-2)}:
        </span>
        <span style={{ color: "#919394" }}>
          {("00" + Math.floor(duration % 60)).slice(-2)}
        </span>
      </span>
    </div>
  );
};

export default AudioPlayer;
