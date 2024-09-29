import { useContext, useEffect } from "react";
import { MicRecorderContext } from "../provider/MicRecorderProvider";
import { OpenAIContext } from "../OpenAIContext";

function SpeechToText({ setAnswer }) {
	const { isRecording, recordedBlob, mediaURL, beginRecording, stopRecording } =
		useContext(MicRecorderContext);
	const openai = useContext(OpenAIContext);

	useEffect(() => {
		if (recordedBlob?.stream) {
			getAiTranscription();
		}
	}, [recordedBlob]);

	const getAiTranscription = async () => {
		console.log("File", await recordedBlob.stream());
		const transcription = await openai.audio.transcriptions.create({
			file: new File([recordedBlob], "recording.mp3", { type: "audio/mp3" }),
			model: "whisper-1",
		});

		console.log("transcription", transcription);
		setAnswer(transcription.text);
	};

	return (
		<div>
			{!isRecording ? (
				<button onClick={beginRecording}>Begin Recording</button>
			) : (
				<button onClick={stopRecording}>Stop Recording</button>
			)}
			{mediaURL && <audio controls src={mediaURL}></audio>}
			{recordedBlob?.stream && <button>Submit</button>}
		</div>
	);
}

export default SpeechToText;
