import { useContext } from "react";
import { MicRecorderContext } from "../provider/MicRecorderProvider";

function SpeechToText() {
  const { isRecording, beginRecording, stopRecording } = useContext(MicRecorderContext);

  return (
    <div>
      {!isRecording ?
        <button onClick={beginRecording}>Begin Recording</button> : 
        <button onClick={stopRecording}>Stop Recording</button>
      }
      {/* {mediaURL && <audio controls src={mediaURL}></audio>} */}
    </div>
  );
}

export default SpeechToText;
