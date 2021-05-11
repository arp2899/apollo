import React, { useContext, useEffect } from "react";
import AudioPlayer from "./component/audio-player/AudioPlayer";
import WaveForm from "./component/waveform/WaveForm";
import ProgressSection from "./component/waveform/ProgressSection";
import TranscriptSection from "./component/transcript-words/TranscriptSection";
import { ContextValues } from "./context/ContextProvider";
import useDimension from "./useDimension";

function App() {
  const { setSeekBarWidth } = useContext(ContextValues);
  const { width } = useDimension();

  useEffect(() => {
    setSeekBarWidth(width - 180);
  }, [width]);
  return (
    <div className="App">
      <AudioPlayer />
      <WaveForm />
      <ProgressSection />
      <TranscriptSection />
    </div>
  );
}

export default App;
