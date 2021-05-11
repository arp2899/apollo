import React, {useContext, useEffect} from "react";
import AudioPlayer from "./component/audio-player/AudioPlayer";
import WaveForm from "./component/waveform/WaveForm";
import SeekBar from "./component/waveform/SeekBar";
import TranscriptSection from "./component/transcript-section/TranscriptSection";
import {ContextValues} from "./context/ContextProvider";
import useWindowWidthHook from "./hooks/useWindowWidthHook";

function App() {
  const { setSeekBarWidth } = useContext(ContextValues);
  const { width } = useWindowWidthHook();

  useEffect(() => {
    setSeekBarWidth(width - 220);
  }, [width]);

  return (
    <div className="App">
      <AudioPlayer />
      <WaveForm />
      <SeekBar />
      <TranscriptSection />
    </div>
  );
}

export default App;
