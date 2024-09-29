import { createContext, useState, useEffect } from "react";

export const MicRecorderContext = createContext({
  hasMicAccess: false,
  isRecording: false,
  mediaURL: null,
  recordedBlob: null,
  transcription: null,
  beginRecording: () => {},
  stopRecording: () => {},
  clearObjects: () => {},
  setTranscription: () => {},
});

function MicRecorderProvider({ children }) {
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaChunks, setMediaChunks] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaURL, setMediaURL] = useState(null);
  const [stream, setStream] = useState(null);
  const [hasCleared, setHasCleared] = useState(false);
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    if (isRecording && stream && hasCleared) {
      const mediaRecorder = setupMediaRecorder(stream);
      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
      setHasCleared(false);
    }
  }, [stream, isRecording, hasCleared]);

  useEffect(() => {
    if (mediaChunks.length && !isRecording) {
      const blob = new Blob(mediaChunks, { type: "audio/mp3" });
      setRecordedBlob(blob);
      setMediaURL(window.URL.createObjectURL(blob));
    }
  }, [mediaChunks, isRecording]);

  const setupMediaRecorder = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      setMediaChunks([...mediaChunks, e.data]);
    };

    mediaRecorder.onstop = () => {
      setIsRecording(false);
      stream.getAudioTracks().forEach((track) => track.stop());
    }
    return mediaRecorder;
  }

  const beginRecording = () => {
    clearObjects();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setHasMicAccess(true);
        setIsRecording(true);
        setStream(stream);
      })
      .catch(() => setHasMicAccess(false));
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  const clearObjects = () => {
    setTranscription("");
    setMediaRecorder(null);
    setMediaChunks([]);
    setRecordedBlob(null);
    setMediaURL(null);
    setStream(null);
    setHasCleared(true);
  }

  return (
    <MicRecorderContext.Provider
      value={{
        hasMicAccess,
        isRecording,
        mediaURL,
        recordedBlob,
        transcription,
        beginRecording,
        stopRecording,
        clearObjects,
        setTranscription,
      }}
    >
      {children}
    </MicRecorderContext.Provider>
  );
}

export default MicRecorderProvider;
