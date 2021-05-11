import React, { useMemo, useState } from "react";

export const ContextValues = React.createContext({});

const ContextProvider = ({ children }) => {
  const [timerId, setTimerId] = useState(0);
  const [milliSecond, setMilliSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [seekBarWidth, setSeekBarWidth] = useState(1060);
  const [duration, setDuration] = useState(0);

  const memoidValue = useMemo(
    () => ({
      duration,
      setDuration,
      timerId,
      setTimerId,
      milliSecond,
      setMilliSecond,
      second,
      setSecond,
      seekBarWidth,
      setSeekBarWidth,
    }),
    [
      duration,
      setDuration,
      timerId,
      setTimerId,
      milliSecond,
      setMilliSecond,
      second,
      setSecond,
      seekBarWidth,
      setSeekBarWidth,
    ]
  );

  return (
    <ContextValues.Provider value={memoidValue}>
      {children}
    </ContextValues.Provider>
  );
};

export default ContextProvider;
