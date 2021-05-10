import React from "react";
import AudioPlayer from "./component/audio-player/AudioPlayer";
import WaveForm from "./component/waveform/WaveForm";
import ProgressSection from "./component/waveform/ProgressSection";
import TranscriptSection from "./component/transcript-words/TranscriptSection";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <AudioPlayer />
        <WaveForm />
        <ProgressSection />
        <TranscriptSection />
      </div>
    </ContextProvider>
  );
}

export default App;
