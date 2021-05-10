import React, { useContext, useEffect, useRef, useState } from "react";
import { getFormatDateTime, publicUrl } from "../../util/util";
import "react-h5-audio-player/lib/styles.css";
import "../../style.scss";
import ReactAudioPlayer from 'react-h5-audio-player';
import {ContextValues} from "../../context/ContextProvider";

const AudioPlayer = () => {
  const audioRef = useRef(null);

  const { timerId, setTimerId } = useContext(ContextValues);
  const { second, setSecond } = useContext(ContextValues);
  const { decaSecond, setDecaSecond } = useContext(ContextValues);
  const { duration, setDuration } = useContext(ContextValues);
  const { speed, setSpeed } = useContext(ContextValues);
  const [startTimer, setStartTimer] = useState(0);

  const time = second + decaSecond / 1000;


  useEffect(() => {
      audioRef.current.audio.current.currentTime = time;
  }, [time]);

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
    setDecaSecond((decaSecond) => decaSecond + speed);
  }, [startTimer]);

  const onPlay = () => {
    const timerId = window.setInterval(
      () => setStartTimer((startTimer) => startTimer + 1),
      100
    );
    setTimerId(timerId);
  };

  const onPause = () => {
    window.clearInterval(timerId);
    setStartTimer(0);
  };

  const onEnded = () => {
    window.clearInterval(timerId);
    setSecond(0);
    setDecaSecond(0);
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(0);
      setDecaSecond(0);
    }
  }, [second]);

  const onRewind = () => {
    setSecond((second) => second - 10);
  };

  const durationMinute = Math.floor(duration / 60);
  const durationSecond = duration % 60;

  return (
    <div className="audio-player">

      <ReactAudioPlayer
          src={"audio/audio.wav"}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          ref={audioRef}
      />
      <div className="audio-controls">
        <div
          className="forward"
          onClick={() => setSecond((second) => second + 10)}
        >
          <img
            src={publicUrl("/img/rotate-right.svg")}
            className="forward-button"
            alt={"forward"}
          />
          <span className="forward-by">10</span>
        </div>
        <div className="rewind" onClick={onRewind}>
          <img
            src={publicUrl("/img/rotate-left.svg")}
            className="rewind-button"
            alt={"rewind"}
          />
          <span className="rewind-by">10</span>
        </div>
        <div>
          <select
            className="speed"
            onInput={(e) => setSpeed(100 * parseFloat(e.currentTarget.value))}
          >
            <option value="1">1.00x</option>
            <option value="0.5">0.50x</option>
            <option value="0.75">0.75x</option>
            <option value="1.5">1.50x</option>
            <option value="2.0">2.00x</option>
          </select>
        </div>
        <div className="share">
          <img src={publicUrl("/img/share.png")} alt={"share"} />
        </div>
      </div>

      <span className="time-span">
        <span style={{ fontWeight: 600 }}>{getFormatDateTime(0, second)}</span>{" "}
        /{" "}
        <span style={{ fontWeight: 600, color: "#a8acad" }}>
          {getFormatDateTime(durationMinute, durationSecond)}
        </span>
      </span>
    </div>
  );
};

export default AudioPlayer;
