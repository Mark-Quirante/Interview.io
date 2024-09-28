import { useContext, useEffect } from "react";
import { MicRecorderContext } from "../provider/MicRecorderProvider";

function SpeechToText() {
  const { isRecording, recordedBlob, mediaURL, beginRecording, stopRecording } = useContext(MicRecorderContext);
  
  useEffect(() => {
    if (recordedBlob?.stream) {
      console.log('Pls work', recordedBlob.stream());
    }
  }, [recordedBlob]);


  return (
    <div>
      {!isRecording ?
        <button onClick={beginRecording}>Begin Recording</button> : 
        <button onClick={stopRecording}>Stop Recording</button>
      }
      {mediaURL && <audio controls src={mediaURL}></audio>}
      {recordedBlob?.stream && <button>Submit</button>}
    </div>
  );
}

export default SpeechToText;
