import { createContext, useState, useEffect } from "react";

export const MicRecorderContext = createContext({
  hasMicAccess: false,
  isRecording: false,
  mediaURL: null,
  recordedBlob: null,
  beginRecording: () => {},
  stopRecording: () => {},
  clearObjects: () => {},
});

function MicRecorderProvider({ children }) {
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaChunks, setMediaChunks] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaURL, setMediaURL] = useState(null);

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
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setHasMicAccess(true);
        setIsRecording(true);
        clearObjects();

        const mediaRecorder = setupMediaRecorder(stream);
        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
      })
      .catch(() => setHasMicAccess(false));
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  const clearObjects = () => {
    setMediaRecorder(null);
    setMediaChunks([]);
    setRecordedBlob(null);
    setMediaURL(null);
  }

  return (
    <MicRecorderContext.Provider
      value={{
        hasMicAccess,
        isRecording,
        mediaURL,
        recordedBlob,
        beginRecording,
        stopRecording,
        clearObjects,
      }}
    >
      {children}
    </MicRecorderContext.Provider>
  );
}

export default MicRecorderProvider;
