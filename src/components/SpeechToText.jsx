import { useContext, useEffect, useState } from "react";
import { MicRecorderContext } from "../provider/MicRecorderProvider";
import { OpenAIContext } from "../OpenAIContext";

function SpeechToText({ setAnswer }) {
	const { isRecording, recordedBlob, mediaURL, beginRecording, stopRecording } =
		useContext(MicRecorderContext);
	const openai = useContext(OpenAIContext);
  const [transcription, setTranscription] = useState("");

	useEffect(() => {
		if (recordedBlob?.stream) {
			getAiTranscription();
		}
	}, [recordedBlob]);

	const getAiTranscription = async () => {
		const transcription = await openai.audio.transcriptions.create({
			file: new File([recordedBlob], "recording.mp3", { type: "audio/mp3" }),
			model: "whisper-1",
		});

    setTranscription(transcription.text);
	};

  const onSubmit = () => {
    setAnswer(transcription);
  };

	return (
		<div>
			{!isRecording ? (
				<button onClick={beginRecording}>Begin Recording</button>
			) : (
				<button onClick={stopRecording}>Stop Recording</button>
			)}
			{mediaURL && <audio controls src={mediaURL}></audio>}
			{recordedBlob?.stream && <button onClick={onSubmit}>Submit</button>}
		</div>
	);
}

export default SpeechToText;
